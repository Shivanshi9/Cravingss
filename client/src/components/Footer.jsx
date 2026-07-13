const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold mb-3"> Cravings</h2>

        <p className="text-gray-300 mb-4">
          Delicious food delivered to your doorstep.
        </p>

        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-orange-400">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-orange-400">
            Terms & Conditions
          </a>

          <a href="#" className="hover:text-orange-400">
            Support
          </a>
          <p> this need to delete in footer </p>
        </div>

        <p className="text-gray-400 text-sm">
          © 2026 Cravings. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
