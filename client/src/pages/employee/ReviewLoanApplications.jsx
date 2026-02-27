import { useEffect, useState } from "react";
import api from "../../api";
import Navbar from "../components/Navbar";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/loanapp/allapplication", {      //  /api/loanapp/allapplication
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data.applications || []);
    } catch (err) {
      console.log("Failed to fetch applications");
    }
  };

  const handleAction = async (id, action) => {
    try {
      setProcessingId(id);
      const token = localStorage.getItem("token");
      await api.put(`/employee/loan/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Loan ${action}ed successfully`);
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} loan`);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-700",
      APPROVED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700"
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="max-w-6xl mx-auto px-4 py-8 grow w-full">
          

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Applications</h1>

          {applications.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-gray-600">No applications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg mr-3">
                          {app.user?.fullName || "Unknown"}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                          {app.status?.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-medium text-gray-800">₹{app.requestedAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tenure</p>
                          <p className="font-medium text-gray-800">{app.loanType?.tenureYears} years</p>
                        </div>
                       
                        <div>
                          <p className="text-gray-600">Applied On</p>
                          <p className="font-medium text-gray-800">
                            {new Date(app.applicationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {app.status === "PENDING" && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAction(app._id, "approve")}
                          disabled={processingId === app._id}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                        >
                          {processingId === app._id ? "Processing..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleAction(app._id, "reject")}
                          disabled={processingId === app._id}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllApplications;