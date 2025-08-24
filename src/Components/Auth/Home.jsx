

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHandshake, FaChartLine, FaShieldAlt, FaComments, 
  FaArrowRight, FaStar, FaUsers, FaAward, 
  FaTasks, FaUserCheck, FaChartBar, FaSearch, FaCheckCircle,
  FaLightbulb
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Make THREE available globally if something expects window.THREE (prevents "THREE is not defined")
if (typeof window !== 'undefined' && !window.THREE) {
  window.THREE = THREE;
}

if (typeof window !== 'undefined' && !gsap.core?.globals()?.ScrollTrigger) {
   gsap.registerPlugin(ScrollTrigger);
 }


// gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const navigate = useNavigate();
    const howItWorksRef = useRef(null);
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const humanCanvasRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Function to scroll to How It Works section
    const scrollToHowItWorks = () => {
        howItWorksRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // Features data with neon blue accent colors
    const features = [
        {
            icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
            title: "Fair Resolution",
            description: "Ensuring impartial and just solutions to all concerns"
        },
        {
            icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
            title: "Real-time Tracking",
            description: "Monitor your complaint status anytime, anywhere"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
            title: "Confidentiality",
            description: "Your identity and concerns are kept completely private"
        },
        {
            icon: <FaComments className="text-3xl text-[#00f2fe]" />,
            title: "24/7 Support",
            description: "Our team is always ready to assist you"
        }
    ];

    // Testimonials data
    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Project Manager",
            content: "This system transformed how we handle complaints. Resolution time improved by 70%!",
            rating: 5
        },
        {
            name: "Sarah Williams",
            role: "HR Director",
            content: "The confidentiality features are outstanding. Our employees feel truly heard.",
            rating: 4.5
        },
        {
            name: "Michael Chen",
            role: "Operations Lead",
            content: "Real-time tracking saved us countless hours of follow-up communications.",
            rating: 5
        }
    ];

    // Stats data
    const stats = [
        { value: "98%", label: "Satisfaction Rate", icon: <FaStar className="text-3xl text-yellow-400" /> },
        { value: "24h", label: "Avg. Resolution Time", icon: <FaChartLine className="text-3xl text-green-400" /> },
        { value: "10K+", label: "Active Users", icon: <FaUsers className="text-3xl text-blue-400" /> },
        { value: "15+", label: "Industry Awards", icon: <FaAward className="text-3xl text-purple-400" /> }
    ];

    // Initialize Three.js scene for particles
    useEffect(() => {
        if (!canvasRef.current) return;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current, 
            alpha: true,
            antialias: true 
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Materials
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Position camera
        camera.position.z = 5;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    // Initialize Three.js scene for 3D human task management
    useEffect(() => {
        if (!humanCanvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a192f);
        scene.fog = new THREE.Fog(0x0a192f, 10, 20);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({
            canvas: humanCanvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x0062ff, 2, 10);
        pointLight.position.set(0, 3, 0);
        scene.add(pointLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.minPolarAngle = Math.PI / 2 - 0.3;

        // Office environment
        const createOfficeEnvironment = () => {
            // Floor
            const floorGeometry = new THREE.PlaneGeometry(20, 20);
            const floorMaterial = new THREE.MeshStandardMaterial({
                color: 0x172a45,
                metalness: 0.1,
                roughness: 0.5
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            scene.add(floor);

            // Desks
            const deskPositions = [
                { x: -3, y: 0, z: -1 },
                { x: -1, y: 0, z: -1 },
                { x: 1, y: 0, z: -1 },
                { x: 3, y: 0, z: -1 }
            ];

            deskPositions.forEach(pos => {
                const deskGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.8);
                const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
                const desk = new THREE.Mesh(deskGeometry, deskMaterial);
                desk.position.set(pos.x, pos.y + 0.25, pos.z);
                desk.castShadow = true;
                desk.receiveShadow = true;
                scene.add(desk);

                // Computers
                const computerGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
                const computerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
                const computer = new THREE.Mesh(computerGeometry, computerMaterial);
                computer.position.set(pos.x, pos.y + 0.8, pos.z);
                computer.rotation.x = -0.2;
                scene.add(computer);
            });

            // Task board
            const boardGeometry = new THREE.BoxGeometry(3, 2, 0.1);
            const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            board.position.set(0, 1.5, -3);
            scene.add(board);

            // Task cards
            const tasks = [
                { status: 'completed', color: 0x00ff00, position: { x: -1, y: 1.5, z: -2.9 } },
                { status: 'in-progress', color: 0xffff00, position: { x: -0.3, y: 1.5, z: -2.9 } },
                { status: 'pending', color: 0xff0000, position: { x: 0.4, y: 1.5, z: -2.9 } },
                { status: 'pending', color: 0xff0000, position: { x: 1.1, y: 1.5, z: -2.9 } }
            ];

            tasks.forEach(task => {
                const cardGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05);
                const cardMaterial = new THREE.MeshStandardMaterial({ color: task.color });
                const card = new THREE.Mesh(cardGeometry, cardMaterial);
                card.position.set(task.position.x, task.position.y, task.position.z);
                scene.add(card);
            });
        };

        // Human models (simplified placeholder)
        const createHumanPlaceholders = () => {
            const humanPositions = [
                { x: -3, y: 0, z: -1 },
                { x: -1, y: 0, z: -1 },
                { x: 1, y: 0, z: -1 },
                { x: 3, y: 0, z: -1 }
            ];

            humanPositions.forEach(pos => {
                // Simple human placeholder (cylinder for body, sphere for head)
                const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8);
                const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
                const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                body.position.set(pos.x, pos.y + 0.4, pos.z);
                scene.add(body);

                const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
                const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffddbb });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.set(pos.x, pos.y + 0.9, pos.z);
                scene.add(head);
            });
        };

        createOfficeEnvironment();
        createHumanPlaceholders();

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
        // Hero section animations
        gsap.fromTo(heroRef.current.querySelector('h1'), 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        
        gsap.fromTo(heroRef.current.querySelector('p'), 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
        );
        
        gsap.fromTo(heroRef.current.querySelectorAll('button'), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2, ease: 'power3.out' }
        );
        
        // Features section animation
        gsap.utils.toArray('.feature-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // How it works timeline animation
        const timelineItems = gsap.utils.toArray('.timeline-item');
        timelineItems.forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, 
                {
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Testimonials animation
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, scale: 0.9 }, 
                {
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Stats counter animation
        gsap.utils.toArray('.stat-value').forEach(stat => {
            const finalValue = stat.innerText;
            const isPercentage = finalValue.includes('%');
            const isK = finalValue.includes('K');
            const isH = finalValue.includes('h');
            const isPlus = finalValue.includes('+');
            
            let numericValue = parseFloat(finalValue);
            if (isK) numericValue *= 1000;
            
            gsap.to(stat, {
                innerText: numericValue,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                onUpdate: function() {
                    if (isPercentage) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + '%';
                    } else if (isK) {
                        stat.innerText = (this.targets()[0].innerText / 1000).toFixed(1) + 'K+';
                    } else if (isH) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + 'h';
                    } else if (isPlus) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + '+';
                    } else {
                        stat.innerText = Math.ceil(this.targets()[0].innerText);
                    }
                }
            });
        });
        
        // Rating animation
        gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.rating-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                setRating(4.8 * this.progress());
            }
        });
        
        // Task completion animation
        gsap.to({}, {
            duration: 3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.human-scene-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                setTasksCompleted(Math.floor(125 * this.progress()));
            }
        });
        
        // Floating elements animation
        gsap.to('.floating-element', {
            y: '+=20',
            duration: 3,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.5
        });
        
        // Cleanup ScrollTrigger
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section with Three.js Background */}
            <div ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
                {/* Three.js Canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                
                {/* Animated Gradient Overlay - Neon Blue */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />
                
                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Hero Content */}
                <motion.div
                    className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                        variants={itemVariants}
                    >
                        Welcome to <span className="text-[#00f2fe]">Smart Management</span> System
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Your trusted platform for efficient complaint management and resolution
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={itemVariants}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-16 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
                            onClick={() => navigate('/contactus')}
                        >
                            Get Started <FaArrowRight />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
                            onClick={scrollToHowItWorks}
                        >
                            Track Complaint Status
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            We provide everything you need for effective smart management.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-[#e6f1ff]">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3D Human Task Management Section */}
            <div className="py-20 px-6 bg-[#0a192f]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Real-time Task Management</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Visualize how tasks flow through your team in our interactive 3D environment
                        </p>
                    </motion.div>

                    <div className="human-scene-container relative h-[500px] rounded-xl overflow-hidden border border-[#172a45] shadow-2xl">
                        <canvas ref={humanCanvasRef} className="absolute inset-0 w-full h-full" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Team Task Dashboard</h3>
                                    <p className="text-[#e6f1ff]">Each team member working on assigned tasks</p>
                                </div>
                          
                            </div>
                        </div>
                    </div>

                    {/* Task Flow Explanation */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaTasks className="text-3xl text-[#00d4ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Task Creation</h3>
                            <p className="text-[#e6f1ff]">Easily create and assign tasks with priorities and deadlines</p>
                        </motion.div>
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaUserCheck className="text-3xl text-[#0088ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Team Assignment</h3>
                            <p className="text-[#e6f1ff]">Assign tasks to team members with automatic notifications</p>
                        </motion.div>
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaChartBar className="text-3xl text-[#0062ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
                            <p className="text-[#e6f1ff]">Monitor real-time progress and completion status</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div
                className="py-20 px-6 bg-[#13294B]"
                ref={howItWorksRef}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Simple steps to get your concerns addressed
                        </p>
                    </motion.div>
                    <div className="relative">
                        {/* Timeline - Neon Blue Gradient */}
                        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0062ff] -ml-0.5"></div>

                        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                            {[
                                {
                                    step: "01",
                                    title: "Create Tasks",
                                    description: "Quickly add tasks with priorities, deadlines, and descriptions"
                                },
                                {
                                    step: "02",
                                    title: "Assign to Team",
                                    description: "Delegate tasks to members with automatic notifications"
                                },
                                {
                                    step: "03",
                                    title: "Track Progress",
                                    description: "Monitor real-time updates and completion status"
                                },
                                {
                                    step: "04",
                                    title: "Review & Analyze",
                                    description: "Generate performance reports and optimize workflows"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`timeline-item relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="mb-4">
                                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0062ff] text-white font-bold text-lg">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-[#e6f1ff]">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-[#13294B] to-[#0a192f]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-center mb-4">{stat.icon}</div>
                                <h3 className="stat-value text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-[#e6f1ff]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section - Neon Blue Gradient */}
            <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to address your concerns?
                        </h2>
                        <p className="text-xl text-[#e6f1ff] mb-8">
                            Join thousands who have found fair resolutions through our system
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
                            onClick={() => navigate('/signup')}>
                            Get Started Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
