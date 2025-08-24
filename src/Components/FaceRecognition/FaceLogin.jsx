import React, { useEffect, useState, useRef, useCallback } from "react";
import WebcamCapture from "./Webcam";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PYTHON_API_BASE_URL = import.meta.env.VITE_PYTHON_API_BASE_URL;

const FaceLogin = ({
  loggedUser,
  onSuccess = () => {},
  onFailure = () => {}
}) => {
  const navigate = useNavigate();
  const [welcomeUser, setWelcomeUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cachedEmbeddings, setCachedEmbeddings] = useState(null);
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [similarityThreshold] = useState(1); // Adjust if needed

  // 🔹 Fetch cached embeddings from backend
  const fetchCache = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/cache`);
      if (!response.ok) throw new Error("Failed to fetch embeddings");
      return await response.json();
    } catch (err) {
      console.error("❌ Error loading embeddings:", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCache = async () => {
      const start = performance.now();
      try {
        const data = await fetchCache();
        if (isMounted) {
          setCachedEmbeddings(data);
          const end = performance.now();
          console.log(`✅ Cache loaded in ${(end - start).toFixed(2)} ms`);
        }
      } catch (err) {
        onFailure();
      }
    };

    loadCache();
    return () => { isMounted = false; };
  }, [fetchCache, onFailure]);

  // 🔹 Send captured image for recognition
  const sendToRecognitionServer = useCallback(async (base64Image) => {
    if (!loggedUser?.email || !cachedEmbeddings) return;

    setIsLoading(true);
    try {
      // Step 1: Generate embedding from Python API
      const embeddingResponse = await fetch(`${PYTHON_API_BASE_URL}/generate-embedding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image })
      });
      if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
      const embeddingResult = await embeddingResponse.json();
      const currentEmbedding = embeddingResult.embedding;

      // Step 2: Find cached embedding for logged user
      const cachedUser = cachedEmbeddings.find(u => u.email === loggedUser.email);
      if (!cachedUser) throw new Error("User not in cache");
      const cachedEmbedding = cachedUser.embedding;
      const userName = cachedUser.name || loggedUser.name || "User";

      // Step 3: Compare embeddings using Python API
      const compareResponse = await fetch(`${PYTHON_API_BASE_URL}/compare-embeddings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embedding1: currentEmbedding,
          embedding2: cachedEmbedding
        })
      });

      if (!compareResponse.ok) throw new Error("Comparison failed");
      const compareResult = await compareResponse.json();
      console.log("🔎 Compare Result:", compareResult);

      // Step 4: Get geolocation
      const position = await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          () => resolve({ coords: { latitude: 0, longitude: 0 } }),
          { timeout: 5000, enableHighAccuracy: true }
        );
      });

      // Step 5: Send login request to backend
      const payload = {
        name: userName,
        email: loggedUser.email,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        photo: base64Image,
        embedding: currentEmbedding
      };

      const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login-by-face`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!loginResponse.ok) throw new Error("Login failed");

      const loginData = await loginResponse.json();
      console.log("✅ Login response:", loginData);

      if (!loginData.name) throw new Error("Invalid response");

      // Success → Save user session
      localStorage.setItem("username", loginData.name);
      localStorage.setItem("role", loginData.role);
      setWelcomeUser(userName);
      setShowModal(true);
    } catch (err) {
      console.error("FaceLogin Error:", err);
      alert(`Error: ${err.message}`);
      onFailure();
    } finally {
      setIsLoading(false);
    }
  }, [loggedUser, cachedEmbeddings, onFailure, similarityThreshold]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    onSuccess();
    navigate("/");
  }, [onSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-white mb-4">Face Recognition</h2>

      {!showModal && (
        <WebcamCapture ref={webcamRef} onCapture={sendToRecognitionServer} />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              🎉 Welcome {welcomeUser}!
            </h3>
            <p className="text-gray-700 mb-4">You have successfully logged in.</p>
            <button
              onClick={handleModalClose}
              className="mt-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceLogin;
