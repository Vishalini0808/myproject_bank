import { useState } from "react";
import api from "../../api";

const AdminDashboard = () => {
  const [employeeForm, setEmployeeForm] = useState({
    fullName: "",
    email: "",
    password: "",
    employeeRole: "",
    branch: "",
  });

  const [branchName, setBranchName] = useState("");

  const handleAddEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/add-employee", employeeForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee added successfully");
      setEmployeeForm({ fullName: "", email: "", password: "", employeeRole: "", branch: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add employee");
    }
  };

  const handleAddBranch = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/add-branch", { name: branchName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Branch added successfully");
      setBranchName("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add branch");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Admin Dashboard</h2>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Add Employee</h3>
        <div className="space-y-3">
          <input placeholder="Full Name" className="w-full px-4 py-3 border rounded-md" value={employeeForm.fullName} onChange={(e) => setEmployeeForm({...employeeForm, fullName: e.target.value})}/>
          <input placeholder="Email" className="w-full px-4 py-3 border rounded-md" value={employeeForm.email} onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}/>
          <input placeholder="Password" type="password" className="w-full px-4 py-3 border rounded-md" value={employeeForm.password} onChange={(e) => setEmployeeForm({...employeeForm, password: e.target.value})}/>
          <input placeholder="Employee Role" className="w-full px-4 py-3 border rounded-md" value={employeeForm.employeeRole} onChange={(e) => setEmployeeForm({...employeeForm, employeeRole: e.target.value})}/>
          <input placeholder="Branch ID" className="w-full px-4 py-3 border rounded-md" value={employeeForm.branch} onChange={(e) => setEmployeeForm({...employeeForm, branch: e.target.value})}/>
          <button onClick={handleAddEmployee} className="w-full bg-linear-to-r from-teal-600 to-blue-600 text-white py-3 rounded-md shadow-md hover:shadow-lg">Add Employee</button>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Add Branch</h3>
        <div className="space-y-3">
          <input placeholder="Branch Name" className="w-full px-4 py-3 border rounded-md" value={branchName} onChange={(e) => setBranchName(e.target.value)}/>
          <button onClick={handleAddBranch} className="w-full bg-linear-to-r from-teal-600 to-blue-600 text-white py-3 rounded-md shadow-md hover:shadow-lg">Add Branch</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
