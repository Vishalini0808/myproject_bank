import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {

  const bannerImageUrl =
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  const managementCards = [
    {
      title: "Manage Employees",
      description: "Add and view bank employees",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      link: "/admin/employees",
      color: "from-teal-500 to-teal-600",
      
    },
    {
      title: "Manage Branches",
      description: "Add new branches and view branch details",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: "/admin/branches",
      color: "from-blue-500 to-blue-600",
     
    },
    {
      title: "Loan Types",
      description: "Loan types and interest rates",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m4 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: "/admin/loan-types",
      color: "from-purple-500 to-purple-600",
      
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
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-teal-100">Manage branches, employees, and loan types</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 grow">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                    {card.icon}
                  </div>
                  <span className="text-3xl font-bold text-gray-300">{card.count}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
                <div className="mt-4 flex items-center text-teal-600 text-sm font-medium">
                  Manage Now 
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

export default AdminDashboard;