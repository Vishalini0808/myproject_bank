 
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
 
function BankLoanHome() {
const navigate = useNavigate();

const handleClick = () => {
    const token = localStorage.getItem("token");
     if(token){
        navigate ("/customer/dashboard");
     }else {
        navigate ("/login");
     }
};

  const slides = [
    {
      title: "Home Loans Made Simple",
      quote: "Turn your dream house into your real address.",
      desc: "Flexible home loan options with low interest rates and quick approval. Start your journey to owning a beautiful home today.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Drive Your Dream Car",
      quote: "Your journey begins with the right drive.",
      desc: "Affordable car loans with fast processing and easy EMI plans. Get behind the wheel without financial stress.",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Invest in Land",
      quote: "Secure land today, build tomorrow.",
      desc: "Smart land financing solutions for residential or investment purposes. Grow your future with confidence.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Personal Loans Anytime",
      quote: "Funds when life needs them most.",
      desc: "Instant personal loans for emergencies, education, travel, or lifestyle needs. Simple, fast, reliable support.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    },
  ];
 
  const loanTypes = [
    {
      name: "House Loan",
    //   img: "https://img.icons8.com/color/96/home--v1.png",
    },
    {
      name: "Car Loan",
    //   img: "https://img.icons8.com/color/96/car--v1.png",
    },
    {
      name: "Land Loan",
    //   img: "https://img.icons8.com/color/96/land-sale.png",
    },
    {
      name: "Personal Loan",
    //   img: "https://img.icons8.com/color/96/money.png",
    },
  ];
 
  const [current, setCurrent] = useState(0);
 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
 
    return () => clearInterval(timer);
  }, []);
 
  const slide = slides[current];
 
  return (
    <> <Navbar/>
    <div className="w-full min-h-screen bg-gray-50 mt-4">
       
      
      <div className=" pt-5 relative h-[85vh] w-full overflow-hidden">
        <img
          src={slide.image}
          alt="loan banner"
          className="w-full h-full object-cover transition-all duration-700"
        />
 
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-4xl px-6 md:px-16 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h1>
 
            <p className="text-lg md:text-xl italic text-teal-400 mb-4">
              "{slide.quote}"
            </p>
 
            <p className="text-sm md:text-base text-gray-200 mb-6 max-w-xl">
              {slide.desc}
            </p>
 
            <button 
            onClick={handleClick}
            className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition">
              Apply Now
            </button>
          </div>
        </div>
      </div>
 
        
       <section className="py-16 px-6 text-center max-w-5xl mx-auto">
         <h2 className="text-3xl font-bold mb-4 text-gray-800">
           Simple Loans. Faster Approvals. Brighter Future.
         </h2>
         <p className="text-gray-600 leading-relaxed">
           Whether you dream of owning a home, buying a new car, investing in land,
           or managing personal expenses — we make financing simple and stress-free.
           Our flexible loan solutions are designed to support your goals with
           competitive interest rates and quick approvals.
        </p>
     </section>
 
     
      <div className="py-10 px-6 md:px-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Loan Options Designed For You
        </h2>
 
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loanTypes.map((loan, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              {/* <img
                src={loan.img}
                alt={loan.name}
                className="w-16 h-16 mx-auto mb-3"
              /> */}
              <p className="font-semibold text-gray-700">{loan.name}</p>
            </div>
          ))}
        </div>
      </div>
 
      
      <div className="bg-linear-to-r from-teal-600 to-blue-600 shadow-md text-white py-14 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Fast Approval • Low Interest • Trusted Service
        </h3>
        <p className="text-gray-200 mb-5">
          Apply online in minutes and get funds quickly with flexible repayment
          options tailored for your needs.
        </p>
        <button 
        onClick={handleClick}
        className="bg-teal-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-teal-500 transition">
          Start Your Loan Application
        </button>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-2">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CapitalTrust Bank. All rights reserved.
          </div>
        </footer>
    </div>
    </>
  );
  
}

export default BankLoanHome;