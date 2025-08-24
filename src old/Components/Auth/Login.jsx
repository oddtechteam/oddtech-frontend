import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Mail, Lock } from '@mui/icons-material';
import axios from 'axios';
import FaceLogin from '../FaceRecognition/FaceLogin'; // Adjust the import path as necessary

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      if (user.role === 'ADMIN') {
        navigate('/admindashboard', { replace: true });
      } else if (user.role === 'EMPLOYEE') {
        navigate('/employeedashboard', { replace: true });
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error setting up request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      if (response.userId) {
        const userObj = {
          id: response.userId,
          role: response.userRole,
          jwt: response.jwt,
          email: data.email
        };

        if (response.userRole === 'ADMIN') {
          localStorage.setItem('user', JSON.stringify({ id: userObj.id, role: userObj.role }));
          localStorage.setItem('token', userObj.jwt);
          navigate('/admindashboard');
        } else if (response.userRole === 'EMPLOYEE') {
          setLoggedUser(userObj);
          setShowFaceLogin(true);
        }
      } else {
        setIsError(true);
        setSnackbarMessage('Invalid Credentials');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setIsError(true);
      setSnackbarMessage(error.message || 'Login Failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-20">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Login to access your dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              placeholder='Email'
              size="small"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '40px',
                }
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              placeholder='Password'
              size="small"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                sx: {
                  borderRadius: '12px',
                  height: '40px',
                  marginTop: '8px'
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...register('password', {
                required: 'Password is required'
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button
                type="button"
                className="hover:underline"
                style={{ color: '#00A3E1' }}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#00A3E1',
                '&:hover': { backgroundColor: '#0081B4' }
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Verify with Face'}
            </Button>

            <div className="text-center text-gray-400">or continue with</div>

            <button
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center py-2 rounded-md"
            >
              <span className="mr-2 text-xl" style={{ color: '#00A3E1' }}>G</span>
              Continue with Google
            </button>
          </form>

          <CardActions>
            <Button
              fullWidth
              onClick={() => navigate('/contactus')}
              disabled={isLoading}
              sx={{
                fontSize: 'small',
                color: '#00A3E1',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0081B4',
                  textDecoration: 'underline'
                }
              }}
            >
              Don't have an account? Contact Admin
            </Button>
          </CardActions>
        </div>

        {/* Right side - Branding */}
        <div
          className="md:flex w-full md:w-1/2 text-white items-center justify-center p-10 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400"
        // style={{ 
        //   background: 'linear-gradient(135deg, #0066A6 0%, #00A3E1 50%, #00BFFF 100%)'
        // }}
        >
          {showFaceLogin && loggedUser?.role === 'EMPLOYEE' ? (
            <FaceLogin
              user={loggedUser}
              loggedUser={loggedUser}
              onSuccess={() => {
                localStorage.setItem('user', JSON.stringify({ id: loggedUser.id, role: loggedUser.role }));
                localStorage.setItem('token', loggedUser.jwt);
                navigate('/employeedashboard');
              }}
              onFailure={() => {
                setIsError(true);
                setSnackbarMessage('Face not recognized');
                setOpenSnackbar(true);
                setShowFaceLogin(false);
              }}
            />
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-2">OddTech</h2>
              <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
              <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
              <p className="text-sm">Empowering your work with speed and clarity.</p>
            </div>
          )}
        </div>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;






