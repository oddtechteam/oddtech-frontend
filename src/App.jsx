import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

/* Public pages */
import HomePage from './Pages/AuthPages/HomePage'
import LoginPages from './Pages/AuthPages/LoginPages'
import AboutUsPage from './Pages/AuthPages/AboutUsPage'
import ContactUsPage from './Pages/AuthPages/ContactUsPage'
import OAuthRedirectPage from './Pages/AuthPages/OAuthRedirectPage'
import FaceLoginPage from './Pages/FaceRecognitionPages/FaceLoginPage'
import AttendenceCapturePage from './Pages/FaceRecognitionPages/AttendenceCapturePage'
import AutoAttendancePage from './Pages/AutoAttendanceSystemPage/AutoAttendancePage'
import TaskStatusChart from './Components/Admin/TaskStatusChart'

/* Admin pages */
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage'
import SignupPage from './Pages/AuthPages/SignupPage'
import PostTaskPage from './Pages/AdminPages/PostTaskPage'
import ShowComplaintsPage from './Pages/AdminPages/ShowComplaintsPage'
import UpdateTaskPage from './Pages/AdminPages/UpdateTaskPage'
import ViewTaskDetailsPage from './Pages/AdminPages/ViewTaskDetailsPage'
import AttendancePages from './Pages/AdminPages/AttendancePages'
import HRMSAdminPage from './Pages/HRMSPages/HRMSAdminPage'
import SocialMedia from './Components/HRMS/SocialMedia'
import InventoryAdminPage from './Pages/InventoryManagementPages/InventoryAdminPage'
import AppPage from './Pages/AppFolderPage/AppPage'
import DashboardAdmPage from './Pages/AdminPages/DashboardAdmPage'
import DocumentManagementApp from './Components/AppFolder/Document'
import PlanningApp from './Components/AppFolder/Planning'
import EntryGate from './Components/AppFolder/EntryGate'

/* Employee pages */
import EmployeeDashboardPage from './Pages/EmployeePages/EmployeeDashboardPage'
import ViewEmployeeTaskDetailsPage from './Pages/EmployeePages/ViewEmployeeTaskDetailsPage'
import HRMSEmployeePage from './Pages/HRMSPages/HRMSEmployeePage'
import SocialMediaEmployee from './Components/HRMS/SocialMediaEmployee'
import InventoryEmployeePage from './Pages/InventoryManagementPages/InventoryEmployeePage'
import EmployeeDiaryPage from './Pages/Diary/EmployeeDiaryPage'
import EmployeeAppsPage from './Pages/EmployeePages/EmployeeAppPage/EmployeeAppsPage'
import DashboardEmpPage from './Pages/EmployeePages/DashboardEmpPage'

/* Guards */
import ProtectedRoute from './Components/ProtectedRout'

function App() {
  return (
    <>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPages />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
        <Route path="/facelogin" element={<FaceLoginPage />} />
        <Route path="/attendance" element={<AttendenceCapturePage />} />
        <Route path="/autoattendance" element={<AutoAttendancePage />} />
        <Route path="/taskstatus" element={<TaskStatusChart />} />

        {/* ---------- Admin Protected Routes ---------- */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admindashboard" element={<AdminDashboardPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/posttask" element={<PostTaskPage />} />
          <Route path="/showcomplaints" element={<ShowComplaintsPage />} />
          <Route path="/updatetask/:id" element={<UpdateTaskPage />} />
          <Route path="/viewtaskdetails/:id" element={<ViewTaskDetailsPage />} />
          <Route path="/inventorymanagement" element={<InventoryAdminPage />} />
          <Route path="/hrmsadmin" element={<HRMSAdminPage />} />
          <Route path="/socialmedia" element={<SocialMedia />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/dashboardadm" element={<DashboardAdmPage />} />
          <Route path="/documentmanagement" element={<DocumentManagementApp />} />
          <Route path="/planning" element={<PlanningApp />} />
          <Route path="/entrygate" element={<EntryGate />} />
          {/* If you meant to use this page: */}
          <Route path="/attendance-admin" element={<AttendancePages />} />
        </Route>

        {/* ---------- Employee Protected Routes ---------- */}
        <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
          <Route path="/employeedashboard" element={<EmployeeDashboardPage />} />
          <Route path="/viewemployeetaskdetails/:id" element={<ViewEmployeeTaskDetailsPage />} />
          <Route path="/face" element={<AttendenceCapturePage />} />
          <Route path="/hrmsemployee" element={<HRMSEmployeePage />} />
          <Route path="/socialmediaemployee" element={<SocialMediaEmployee />} />
          <Route path="/inventoryemployee" element={<InventoryEmployeePage />} />
          <Route path="/empdiary" element={<EmployeeDiaryPage />} />
          <Route path="/employeeapps" element={<EmployeeAppsPage />} />
          <Route path="/dashboardemp" element={<DashboardEmpPage />} />
        </Route>

        {/* ---------- 404 (optional) ---------- */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
