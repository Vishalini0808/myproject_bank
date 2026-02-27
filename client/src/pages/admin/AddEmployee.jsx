import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const AddEmployee = () => {

  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    employeeRole: "relationship manager",
    branchId: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    const fetchBranches = async ()=> {
        const res = await api.get("/branch/");      // /api/branch/
        setBranches(res.data.branches);

    };
    fetchBranches();
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/addemployee", formData, {         // /api/admin/addemployee
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Employee created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="max-w-2xl mx-auto px-4 py-8 grow w-full">

          <Link to="/admin/dashboard" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Employee</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Role</label>
                <select
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="relationship manager">Relationship Manager</option>
                  <option value="loan officer">Loan Officer</option>
                  <option value="teller">Teller</option>
                </select>
              </div>

              <div>
                <select
                name = "branchId"
                value={formData.branchId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="">Select Branch</option>
                    {branches.map(e => (
                        <option key={e._id} value={e._id}>
                            {e.branchName}-{e.city}
                            </option>
                    ))}
                </select>
                
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:shadow-md"
              >
                Create Employee
              </button>
            </form>
          </div>
        </div>

        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalTrust Bank. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default AddEmployee;