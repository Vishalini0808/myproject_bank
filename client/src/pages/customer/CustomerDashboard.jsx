import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Navbar from "../components/Navbar";

const CustomerDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token) return setError("Please login 1st");
                                                            // http://localhost:3000/api/customer/my/accounts
        const res = await api.get("/customer/my/accounts", {
          headers : { Authorization : `Bearer ${token}`}
        }) ;
            

        setAccounts(res.data.accounts || res.data); 
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };


    fetchAccounts();
  }, []);

  const bannerImageUrl =
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        
        <div className="relative h-48 mt-15 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bannerImageUrl}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-blue-600/80"></div>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">Captital Trust Banks</h1>
              <p className="text-teal-100">
                Manage and monitor your financial assets
              </p>
            </div>
          </div>
        </div>

        
        <div className="max-w-6xl mx-auto px-4 py-8 grow">

          
          <div className="max-w-6xl mx-auto px-4 py-8 grow">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    
    <Link 
      to="/customer/add-account" 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Add Account</h3>
        <p className="text-gray-600 text-sm">Create a new bank account</p>
      </div>
    </Link>

    <Link 
      to="/customer/loan-form" 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Apply Loan</h3>
        <p className="text-gray-600 text-sm">Submit loan application</p>
      </div>
    </Link>

    <Link 
      to="/customer/loan-status" 
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Loan Status</h3>
        <p className="text-gray-600 text-sm">Track applications</p>
      </div>
    </Link>

  </div>




  {loading && (
    <div className="text-center py-10">
      <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500">Loading accounts...</p>
    </div>
  )}

  {error && (
    <div className="text-center py-10">
      <p className="text-red-500">{error}</p>
    </div>
  )}

  {!loading && accounts.length === 0 && !error && (
    <div className="text-center py-10 bg-white rounded-lg shadow border border-gray-200">
      <p className="text-gray-600 mb-4">No accounts found</p>
      <Link
        to="/customer/add-account"
        className="px-5 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg"
      >
        Add Your First Account
      </Link>
    </div>
  )}

  {!loading && accounts.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((acc) => (
        <div
          key={acc._id}
          className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
        >
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-4 border border-teal-100">
            <p className="text-sm text-gray-600">Available Balance</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{acc.balance}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">Account Type:</span> {acc.accountType}</p>
            <p><span className="font-semibold">Account Number:</span> {acc.accountNumber}</p>
            {acc.branch && (
              <p><span className="font-semibold">Branch:</span> {acc.branch.branchName}</p>
            )}
          </div>

          <div className="mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Active
            </span>
          </div>
        </div>
      ))}
    </div>
  )}

  

</div>

        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalTrust Bank. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default CustomerDashboard;
