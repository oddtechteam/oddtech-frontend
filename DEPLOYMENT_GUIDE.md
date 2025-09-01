# Deployment Guide - Environment Configuration

## Issues Fixed

Your application was using hardcoded localhost URLs which caused deployment issues in production. The following changes have been made:

### 1. Environment Variables Setup

The application now uses environment variables for API endpoints:

- `VITE_API_BASE_URL` - Main Java API server (default: http://localhost:8080)
- `VITE_PYTHON_API_BASE_URL` - Python API server (default: http://localhost:8080)  
- `VITE_FACE_RECOGNITION_API_BASE_URL` - Face recognition API server (default: http://localhost:5005)

### 2. Files Modified

#### Core Configuration
- `src/Components/axiosInstance.jsx` - Updated to use environment variables and added face recognition API support
- `vite.config.js` - Fixed proxy configuration

#### Components with Hardcoded URLs Fixed
- `src/Components/Admin/AdminDashboard.jsx` - API_BASE_URL now uses environment variable
- `src/Components/HRMS/SocialMediaEmployee.jsx` - All fetch calls updated
- `src/Components/HRMS/SocialMedia.jsx` - Image URLs updated
- `src/Components/FaceRecognition/FaceLogin.jsx` - Face recognition API calls updated
- `src/Components/AutoAttendanceSystem/AutoAttendance.jsx` - Face recognition API calls updated
- `src/Components/Admin/ShowComplaints.jsx` - Fixed incorrect environment variable usage
- `src/Components/Employee/DashboardEmp.jsx` - Fixed incorrect environment variable usage
- `src/Components/Inventory/InventoryManagement/UpdateStatusAsset.jsx` - Fixed axios base URL
- `src/Components/Inventory/InventoryManagement/HandleAssestReturn.jsx` - Fixed axios base URL
- `src/Components/Inventory/InventoryManagement/TrackAssignmentAssest.jsx` - Fixed axios base URL

## Deployment Instructions

### For Development
Create a `.env` file in your project root:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_PYTHON_API_BASE_URL=http://localhost:8000
VITE_FACE_RECOGNITION_API_BASE_URL=http://localhost:5005
```

### For Production
Create a `.env.production` file or set environment variables in your deployment platform:

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_PYTHON_API_BASE_URL=https://your-python-api-domain.com
VITE_FACE_RECOGNITION_API_BASE_URL=https://your-face-recognition-api-domain.com
```

### Platform-Specific Instructions

#### Vercel
1. Go to your project settings
2. Add environment variables in the "Environment Variables" section
3. Set the values for production URLs

#### Netlify
1. Go to Site settings > Environment variables
2. Add the environment variables with your production URLs

#### Heroku
```bash
heroku config:set VITE_API_BASE_URL=https://your-api-domain.com
heroku config:set VITE_PYTHON_API_BASE_URL=https://your-python-api-domain.com
heroku config:set VITE_FACE_RECOGNITION_API_BASE_URL=https://your-face-recognition-api-domain.com
```

#### Docker
Add to your Dockerfile or docker-compose.yml:
```yaml
environment:
  - VITE_API_BASE_URL=https://your-api-domain.com
  - VITE_PYTHON_API_BASE_URL=https://your-python-api-domain.com
  - VITE_FACE_RECOGNITION_API_BASE_URL=https://your-face-recognition-api-domain.com
```

## Important Notes

1. **CORS Configuration**: Ensure your production APIs have proper CORS configuration to allow requests from your frontend domain.

2. **HTTPS**: Use HTTPS URLs in production for security.

3. **API Endpoints**: Make sure your production APIs are running and accessible at the URLs you specify.

4. **Build Process**: The environment variables are embedded at build time, so you need to rebuild your application after changing environment variables.

## Testing

After deployment, test the following functionality:
- User authentication
- API data fetching
- Face recognition features
- File uploads
- All CRUD operations

## Troubleshooting

If you encounter issues:

1. Check browser console for network errors
2. Verify environment variables are set correctly
3. Ensure API servers are running and accessible
4. Check CORS configuration on your API servers
5. Verify the API endpoints match your backend implementation

## Example Production URLs

Replace these with your actual production URLs:
- `VITE_API_BASE_URL=https://api.yourcompany.com`
- `VITE_PYTHON_API_BASE_URL=https://python-api.yourcompany.com`
- `VITE_FACE_RECOGNITION_API_BASE_URL=https://face-api.yourcompany.com`
