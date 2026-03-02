import { useEffect, useState } from "react";
import api from "../../api";

function LoanStatus() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/loanapp/application", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications(res.data.application);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">My Loan Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 mb-4 rounded-lg shadow"
          >
            <p><strong>Loan Type:</strong> {app.loanType?.name}</p>
            <p><strong>Branch:</strong> {app.branch?.branchName}</p>
            <p><strong>Requested Amount:</strong> ₹{app.requestedAmount}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  app.status === "APPROVED"
                    ? "text-green-600"
                    : app.status === "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {app.status || "PENDING"}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default LoanStatus;