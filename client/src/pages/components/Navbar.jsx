import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-linear-to-r from-teal-600 to-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            💳
          </div>
          <span className="text-lg font-semibold">CapitalTrust Bank</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-white font-medium">
          
          {!token && (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}

          {token && role === "customer" && (
            <>
              <Link to="/customer/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
              <Link to="/customer/add-account" className="hover:text-gray-200">
                Add Account
              </Link>
            </>
          )}

          {token && role === "employee" && (
            <>
              <Link to="/employee/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
              <Link to="/employee/customers" className="hover:text-gray-200">
                Customers
              </Link>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
              <Link to="/admin/add-branch" className="hover:text-gray-200">
                Add Branch
              </Link>
              <Link to="/admin/add-employee" className="hover:text-gray-200">
                Add Employee
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-white text-teal-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
