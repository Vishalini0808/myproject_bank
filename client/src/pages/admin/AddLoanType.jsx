import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../components/Navbar";

const AddLoanType = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    maxAmount: "",
    baseInterestRate: "",
    tenureYears: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/addloantype", formData, {          //  /api/admin/addloantype
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Loan type created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create loan type");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="max-w-2xl mx-auto px-4 py-8 grow w-full">
          {/* Back Button */}
          <Link to="/admin/dashboard" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Loan Type</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., Home Loan, Car Loan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Amount (₹)</label>
                <input
                  type="number"
                  name="maxAmount"
                  value={formData.maxAmount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter maximum amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="baseInterestRate"
                  value={formData.baseInterestRate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter interest rate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
                <input
                  type="number"
                  name="tenureYears"
                  value={formData.tenureYears}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter tenure in years"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:shadow-md"
              >
                Create Loan Type
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

export default AddLoanType;