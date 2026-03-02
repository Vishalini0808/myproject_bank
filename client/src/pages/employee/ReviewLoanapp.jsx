import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api.js";

function LoanView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);

  const [loanData, setLoanData] = useState({
    SanctionedAmount: "",
    InterestRate: "",
    duration: "",
  });


  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/loanapp/app/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLoan(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoan();
  }, [id]);



  const updateStatus = async (status) => {
    if (status === "APPROVED") {
      if (
        !loanData.SanctionedAmount || !loanData.InterestRate || !loanData.duration
      ) {
        alert("Fill sanction details before approval");
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/loanapp/${id}`,
        {
          status,
          ...loanData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Loan ${status}`);
      navigate("/employee/dashboard");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white w-full max-w-5xl p-8 rounded-2xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Loan Application Review
        </h2>

        <h3 className="text-lg font-semibold mb-3">Applicant Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input value={loan.user?.fullName || ""} readOnly />
          <input value={loan.user?.email || ""} readOnly />
          <input value={loan.user?.phone || ""} readOnly />
          <input value={loan.account_number || ""} readOnly />
          <input value={loan.user?.address || ""} readOnly/>
        </div>

        <h3 className="text-lg font-semibold mb-3">Branch Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input value={loan.branch?.branchName || ""} readOnly />
          <input value={loan.branch?.city || ""} readOnly />
          <input value={loan.branch?.ifscCode || ""} readOnly />
        </div>

        <h3 className="text-lg font-semibold mb-3">Loan Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input value={loan.loanType?.name || ""} readOnly />
          <input value={`₹ ${loan.requestedAmount}`} readOnly />
          <input
            value={`${loan.loanType?.tenureYears} Years`}
            readOnly
          />
          {/* <input value={loan.status || "PENDING"} readOnly /> */}
        </div>

        <h3 className="text-lg font-semibold mb-3">Financial Evaluation</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            value={`CIBIL Score: ${loan?.user?.cibilScore || "N/A"}`}
            readOnly
          />
          <input
            value={`Credit History: ${loan?.user?.creditHistory || "N/A"}`}
            readOnly
          />
          <input
            value={`Monthly Income: ₹${loan?.monthlyIncome || 0}`}
            readOnly
          />
          
        </div>

        {loan.status === "PENDING" && (
          <>
            <h3 className="text-lg font-semibold mb-3">
              Sanction Details
            </h3>

            <div className="space-y-3 mb-6">
              <input
                type="number"
                placeholder="Sanctioned Amount"
                className="w-full border p-2 rounded"
                value={loanData.SanctionedAmount}
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    SanctionedAmount: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Interest Rate (%)"
                className="w-full border p-2 rounded"
                value={loanData.InterestRate}
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    InterestRate: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Duration (Months)"
                className="w-full border p-2 rounded"
                value={loanData.duration}
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    duration: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => updateStatus("APPROVED")}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus("REJECTED")}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoanView;