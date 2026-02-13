import { useEffect, useState } from "react";
import api from "../../api";
import Navbar from "../components/Navbar";

const CustomerAddAccount = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [form, setForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    accountType: "",
    branchId: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await api.get("/branch/"); //http://localhost:3000/api/branch/
      setBranches(res.data.branches);
    } catch (err) {
      alert("Failed to load branches");
    }
  };


  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setForm({ ...form, branchId });

    const branch = branches.find((b) => b._id === branchId);
    setSelectedBranch(branch);
  };

  const handleAddAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first");

      await api.post("customer/add/bankaccount", form, {          // http://localhost:3000/api/customer/add/bankaccount
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Bank account added successfully");

      setForm({
        accountHolderName: "",
        accountNumber: "",
        accountType: "",
        branchId: "",
      });

      setSelectedBranch(null);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add account");
    }
  };

  return (
    <> 
    <Navbar/>
    
    <div className="min-h-screen bg-gray-50 p-6">
      
      <h2 className="text-2xl font-bold text-center mb-6">
        Add New Bank Account
      </h2>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">

        
        <input
          placeholder="Account Holder Name"
          className="w-full px-4 py-3 border rounded-md"
          value={form.accountHolderName}
          onChange={(e) =>
            setForm({ ...form, accountHolderName: e.target.value })
          }
        />

        
        <input
          placeholder="Account Number"
          className="w-full px-4 py-3 border rounded-md"
          value={form.accountNumber}
          onChange={(e) =>
            setForm({ ...form, accountNumber: e.target.value })
          }
        />

        
        <select
          className="w-full px-4 py-3 border rounded-md"
          value={form.accountType}
          onChange={(e) =>
            setForm({ ...form, accountType: e.target.value })
          }
        >
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>

        
        <select
          className="w-full px-4 py-3 border rounded-md"
          value={form.branchId}
          onChange={handleBranchChange}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.branchName} - {branch.city}
            </option>
          ))}
        </select>

    
        {selectedBranch && (
          <input
            value={selectedBranch.ifscCode}
            disabled
            className="w-full px-4 py-3 border rounded-md bg-gray-100"
          />
        )}


        <button
          onClick={handleAddAccount}
          className="w-full bg-teal-600 text-white py-3 rounded-md"
        >
          Add Account
        </button>
      </div>
    </div>
    </>
  );
};

export default CustomerAddAccount;
