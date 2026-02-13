const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">
            CapitalTrust Bank
          </h3>
          <p className="text-sm">
            Secure. Reliable. Modern banking solutions for individuals and businesses.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Accounts</li>
            <li>Loans</li>
            <li>Branches</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">support@capitaltrust.com</p>
          <p className="text-sm">+1 234 567 890</p>
          <p className="text-sm">New York, USA</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} CapitalTrust Bank. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
