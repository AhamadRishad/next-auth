
import Image from "next/image";
import Link from "next/link";
import LOGO from "../app/public/images/logo.jpg";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-start space-y-8 sm:space-y-0">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/3">
            <Image
              src={LOGO} // Update with your logo path
              alt="Company Logo"
              width={120}
              height={60}
              className="mb-4"
            />
            <p className="text-gray-400">
              Dayjour - Elevating your beauty routine with premium cosmetic products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.892-4.785 4.655-4.785 1.321 0 2.462.098 2.794.142v3.24h-1.915c-1.504 0-1.795.714-1.795 1.761v2.313h3.589l-.467 3.621h-3.122v9.294h6.126c.733 0 1.324-.592 1.324-1.325v-21.351c0-.733-.591-1.325-1.324-1.325z" />
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.316.975.975 1.254 2.242 1.316 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.341 2.633-1.316 3.608-.975.975-2.242 1.254-3.608 1.316-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.341-3.608-1.316-.975-.975-1.254-2.242-1.316-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.341-2.633 1.316-3.608.975-.975 2.242-1.254 3.608-1.316 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-1.348.062-2.678.336-3.735 1.393-1.057 1.057-1.331 2.387-1.393 3.735-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.062 1.348.336 2.678 1.393 3.735 1.057 1.057 2.387 1.331 3.735 1.393 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.348-.062 2.678-.336 3.735-1.393 1.057-1.057 1.331-2.387 1.393-3.735.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.062-1.348-.336-2.678-1.393-3.735-1.057-1.057-2.387-1.331-3.735-1.393-1.28-.058-1.688-.072-4.947-.072z" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M18.406 5.594c.94 0 1.7-.76 1.7-1.7 0-.94-.76-1.7-1.7-1.7-.94 0-1.7.76-1.7 1.7 0 .94.76 1.7 1.7 1.7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Dayjour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
