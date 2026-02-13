// CustomerApplyLoan.jsx
import { useEffect, useState } from "react";
import api from "../../api";
import Navbar from "../components/Navbar";

const CustomerApplyLoan = () => {
  const [loanTypes, setLoanTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    accountnumber: "",
    loanType: "",
    branch: "",
    requestedAmount: "",
    address: "",
    proof: null,
  });

  useEffect(() => {
    fetchLoanTypes();
    fetchBranches();
  }, []);

  const fetchLoanTypes = async () => {
    try {
      const res = await api.get("/loanapp/loantypes");    // /api/loanapp/loantypes
      setLoanTypes(res.data.loanTypes);
    } catch {
      alert("Failed to load loan types");
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/branch/");              // /api/branch/
      setBranches(res.data.branches);
    } catch {
      alert("Failed to load branches");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first");

      const data = new FormData();
      data.append("account_number", form.accountnumber);
      data.append("loanType", form.loanType);
      data.append("branch", form.branch);
      data.append("requestedAmount", form.requestedAmount);
      data.append("address", form.address);
      if (form.proof) data.append("proof", form.proof);

      await api.post("/loanapp/applyloan", data, {                    //  /api/loanapp/applyloan
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Loan application submitted!");
      setForm({
        accountnumber: "",
        loanType: "",
        branch: "",
        requestedAmount: "",
        address: "",
        proof: null,
        
      });
    } catch (err) {
      alert( "Failed to apply for loan");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200">

          
            <h2 className="text-2xl font-bold text-gray-800 text-center m-4">
              Apply for a Loan
            </h2>

          {/* Form */}
          <div className="p-6 space-y-5">

            <input
              placeholder="Account Number"
              className="w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.accountnumber}
              onChange={(e) =>
                setForm({ ...form, accountnumber: e.target.value })
              }
            />

            <select
              className="w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.loanType}
              onChange={(e) =>
                setForm({ ...form, loanType: e.target.value })
              }
            >
              <option value="">Select Loan Type</option>
              {loanTypes.map((lt) => (
                <option key={lt._id} value={lt._id}>
                  {lt.name} - Max ₹{lt.maxAmount}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.branch}
              onChange={(e) =>
                setForm({ ...form, branch: e.target.value })
              }
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchName} - {b.city}
                </option>
              ))}
            </select>

            <input
              placeholder="Requested Amount"
              type="number"
              className="w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.requestedAmount}
              onChange={(e) =>
                setForm({ ...form, requestedAmount: e.target.value })
              }
            />

            <input
              placeholder="Address"
              className="w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Upload Proof (Optional)
              </label>
              <input
                type="file"
                className="w-full text-sm"
                onChange={(e) =>
                  setForm({ ...form, proof: e.target.files[0] })
                }
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-3 rounded-md transition"
              onClick={handleSubmit}
            >
              Apply Loan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerApplyLoan;
