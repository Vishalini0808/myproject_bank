import { useEffect, useState } from "react";
import api from "../../api";

const EmployeeDashboard = () => {
  const [branch, setBranch] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch branch info
        const branchRes = await api.get("/employee/mybranch", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranch(branchRes.data);

        // Fetch branch customers
        const custRes = await api.get("/employee/branch/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(custRes.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Employee Dashboard
      </h2>

      {branch && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">My Branch</h3>
          <p className="text-gray-600">Branch Name: {branch.name}</p>
          <p className="text-gray-600">Branch ID: {branch._id}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Customers in Branch</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.length === 0 && <p className="text-gray-500">No customers found</p>}
        {customers.map((cust) => (
          <div key={cust._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-800">{cust.fullName}</h4>
            <p className="text-gray-600">Email: {cust.email}</p>
            <p className="text-gray-600">Phone: {cust.phone}</p>
            <p className="text-gray-600">KYC Status: {cust.kycStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
