import { useEffect, useState } from "react";
import api from "../../api.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/loanapp/allapplication", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data.applications)) {
        setApplications(res.data.applications);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.log("Error fetching applications");
      setApplications([]);
    }
  };

  const getCibilLabel = (score) => {
    if (!score) return "N/A";
    if (score >= 750) return "Good";
    if (score >= 650) return "Better";
    return "Poor";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Applications</h1>

        {applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          applications.map((app) => {
            const status = app.status || "PENDING";

            const getStatusStyle = () => {
              if (status === "APPROVED")
                return "bg-green-100 text-green-700";
              if (status === "REJECTED")
                return "bg-red-100 text-red-700";
              return "bg-yellow-100 text-yellow-700";
            };

            return (
              <div
                key={app._id}
                className="bg-white p-6 mb-4 rounded-xl shadow flex justify-between items-start"
              >
                {/* Left Section */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">
                    {app.user?.fullName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Application ID: {app._id}
                  </p>

                  <p>Requested Amount: ₹{app.requestedAmount}</p>

                  <p>
                    Tenure: {app.loanType?.tenureYears
                      ? app.loanType.tenureYears * 12
                      : 0}{" "}
                    months
                  </p>

                  <p>
                    Applied On:{" "}
                    {app.applicationDate
                      ? new Date(app.applicationDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    CIBIL Score: {app.user?.cibilScore || "N/A"} (
                    {getCibilLabel(app.user?.cibilScore)})
                  </p>

                  {/* Status Badge */}
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle()}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      navigate(`/employee/loan-view/${app._id}`)
                    }
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Application
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllApplications;