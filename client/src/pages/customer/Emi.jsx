import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
 
export default function Emi() {
  const { id } = useParams();
  const [emis, setEmis] = useState([]);
  const [emiCount, setEmiCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const fetchEmis = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/loan/${id}`);    
      setEmis(res.data.data || res.data);
      setEmiCount(res.data.count || res.data.length);
    } catch (err) {
      setError("Failed to fetch EMI details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmis();
  }, []);
 
 
 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">EMI Details</h2>
 
      <div className="p-4 text-green-800 bg-green-100 w-72 h-16 mb-4 border border-green-200 rounded-2xl flex justify-between items-center">
        <h3 className="text-xl font-bold">Total EMIs</h3>
        <span className="text-2xl font-bold">{emiCount}</span>
      </div>
 
      {loading ? (
        <p>Loading EMI details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : emis.length === 0 ? (
        <p>No EMI records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">EMI Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Penalty</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
 
            <tbody className="divide-y divide-gray-200">
              {emis.map((emi) => (
                <tr key={emi._id}>
                  <td className="px-6 py-4 font-semibold">
                    ₹{emi.totalAmout.toFixed(2)}
                  </td>
 
                  <td className="px-6 py-4">
                    {new Date(emi.dueDate).toLocaleDateString()}
                  </td>
 
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs
                        ${emi.EMIStatus === "Paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                        }`}
                    >
                      {emi.status}
                    </span>
                  </td>
 
                  <td className="px-6 py-4 text-gray-700">
                    {emi.penalty}
                  </td>
 
                  <td className="px-6 py-4">
                    <a
                      href={`/customer/pay/${emi._id}`}
                      className={`px-4 py-2 rounded-lg text-white text-sm
                        ${
                          emi.status === "PAID"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      Pay
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}