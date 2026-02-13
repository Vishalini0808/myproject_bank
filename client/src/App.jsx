import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
// import Navbar from "./pages/components/Navbar"
// import Footer from "./pages/components/Footer"
import EmployeeDashboard from "./pages/employee/EmployeeDashboard"
import AdminDashboard from "./pages/admin/adminDashboard"
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import CustomerAddAccount from "./pages/customer/AddBankAccount"
import LoanApplicationForm from "./pages/customer/LoanApplicationForm"

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
    <Route path="/admin/dashboard" element = {<AdminDashboard/>}/>
    <Route path="/customer/add-account" element = {<CustomerAddAccount/>}/>
    <Route path="/customer/loan-form" element = {<LoanApplicationForm/>}/>

   </Routes>
   {/* <Footer/> */}
   </BrowserRouter>
  )
}

export default App
