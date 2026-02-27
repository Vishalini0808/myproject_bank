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
import AllApplications from "./pages/employee/ReviewLoanApplications"

function App() {

  return (
   <BrowserRouter>
   {/* <Navbar/> */}
   <Routes>
    
    <Route path="/" element= {<Login/>}/>
    <Route path="/login" element= {<Login/>}/>
    <Route path="/register" element= {<Register/>}/>
    <Route path="/customer/dashboard" element = {<CustomerDashboard/>}/>
    <Route path="/employee/dashboard" element = {<EmployeeDashboard/>}/>
    <Route path="/employee/applications" element = {<AllApplications/>}/>
    <Route path="/admin/dashboard" element = {<AdminDashboard/>}/>
    <Route path="/admin/employees" element = {<AddEmployee/>}/>
    <Route path="/admin/branches" element = {<AddBranch/>}/>
    <Route path="/admin/loan-types" element = {<AddLoanType/>}/>    
    <Route path="/customer/add-account" element = {<CustomerAddAccount/>}/>
    <Route path="/customer/loan-form" element = {<LoanApplicationForm/>}/>

   </Routes>
   {/* <Footer/> */}
   </BrowserRouter>
  )
}

export default App
