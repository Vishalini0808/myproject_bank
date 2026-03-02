import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
// import Navbar from "./pages/components/Navbar"
// import Footer from "./pages/components/Footer"
import EmployeeDashboard from "./pages/employee/EmployeeDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import CustomerAddAccount from "./pages/customer/AddBankAccount"
import LoanApplicationForm from "./pages/customer/LoanApplicationForm"
import AddEmployee from "./pages/admin/AddEmployee"
import AddBranch from "./pages/admin/AddBranch"
import AddLoanType from "./pages/admin/AddLoanType"
import ProtectedRoute from "./pages/components/ProtectedRoutes"
import BankLoanHome from "./pages/components/Home"
import LoanView from "./pages/employee/ReviewLoanapp"
import LoanStatus from "./pages/customer/Loanstatus"
import AllApplications from "./pages/employee/ReviewAllApplications"


function App() {

  return (
   <BrowserRouter>
   {/* <Navbar/> */}
   <Routes>
    <Route path ="/" element={<BankLoanHome/>}/>
    <Route path="/login" element= {<Login/>}/>
    <Route path="/register" element= {<Register/>}/>
    <Route path="/customer/dashboard" element = {<ProtectedRoute allowedRole={["customer"]}><CustomerDashboard/></ProtectedRoute>}/>
    <Route path="/employee/dashboard" element = {<ProtectedRoute allowedRole={["employee"]}><EmployeeDashboard/></ProtectedRoute>}/>
    <Route path="/employee/applications" element = {<AllApplications/>}/>
    <Route path="/admin/dashboard" element = {<ProtectedRoute allowedRole={["admin"]}><AdminDashboard/></ProtectedRoute>}/>
    <Route path="/admin/employees" element = {<AddEmployee/>}/>
    <Route path="/employee/loan-view/:id" element={<LoanView/>}/>
    <Route path="/admin/branches" element = {<AddBranch/>}/>
    <Route path="/admin/loan-types" element = {<AddLoanType/>}/>    
    <Route path="/customer/add-account" element = {<CustomerAddAccount/>}/>
    <Route path="/customer/loan-form" element = {<LoanApplicationForm/>}/>
    <Route path="/customer/loan-status" element = {<LoanStatus/>}/>

   </Routes>
   {/* <Footer/> */}
   </BrowserRouter>
  )
}

export default App
