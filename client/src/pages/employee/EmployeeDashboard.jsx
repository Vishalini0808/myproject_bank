import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const bannerImageUrl =
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  const loanCards = [
    {
      title: "All Applications",
      description: "View and process pending loan applications",
      link: "/employee/applications",
    },
    {
      title: "Approved Loans",
      description: "View all approved loan applications",
      link: "/employee/approved",
    },
    {
      title: "Rejected Loans",
      description: "View rejected loan applications",
      link: "/employee/rejected",
    },
    {
      title: "Active Loans",
      description: "Currently active loans",
      link: "/employee/active",
    },
    {
      title: "Closed Loans",
      description: "Completed and closed loans",
      link: "/employee/closed",
     }
  ];

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
              <h1 className="text-4xl font-bold">Employee Dashboard</h1>
              <p className="text-teal-100">Manage loan applications</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
              >
                {/* <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                    {card.icon}
                  </div>
                </div> */}
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
                <div className="mt-4 flex items-center text-teal-600 text-sm font-medium">
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalTrust Bank. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default EmployeeDashboard;