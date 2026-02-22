import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 text-gray-700">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* Two-column desktop / single centered column mobile */}
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:gap-6 md:text-left">
          {/* Left side — Brand & About */}
          <div className="max-w-sm">
            <h2 className="font-cavo text-shad-s text-2xl text-brown md:text-3xl">
              VEGAN'S CORNER
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
              Your one-stop destination for pure, fresh, plant-based products and
              organic vegan products.
            </p>
            <p className="mt-2 text-base font-semibold font-cav leading-relaxed text-gray-500 md:text-base">Eat clean, live green.</p>
            <p className="mt-2 text-xs text-gray-400 md:text-sm">
              A Non-ISO certified company.
            </p>

            {/* Social placeholder icons */}
            <div className="mt-5 flex justify-center gap-4 md:justify-start">
              <Link
                to="https://princekb.me/contact"
                target="_blank"
                aria-label="Website"
                className="rounded-full border border-gray-300 p-2 transition-colors hover:border-brown hover:text-brown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"
                  />
                </svg>
              </Link>
              <Link
                to="https://github.com/prince-kb"
                target="_blank"
                aria-label="GitHub"
                className="rounded-full border border-gray-300 p-2 transition-colors hover:border-brown hover:text-brown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.04 11.04 0 015.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.42-5.27 5.7.42.36.79 1.07.79 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right side — Links & Contact */}
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-14 md:items-start">
            {/* Quick Links */}
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-brown">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="transition-colors hover:text-brown">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="transition-colors hover:text-brown"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="transition-colors hover:text-brown"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="transition-colors hover:text-brown"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-brown">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link
                    to="https://princekb.me/contact"
                    target="_blank"
                    className="transition-colors hover:text-brown"
                  >
                    Contact Me
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://princekb.me"
                    target="_blank"
                    className="transition-colors hover:text-brown"
                  >
                    About the Developer
                  </Link>
                </li>
                <li className="leading-relaxed">
                  <span className="block text-gray-400">Email</span>
                  princeja67@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 text-xs text-gray-700 md:flex-row md:justify-between">
          <p>
            © 2024 Vegan's Corner. All Rights Reserved.
          </p>
          <p>
            Crafted with 💚 by{" "}
            <Link
              to="https://princekb.me"
              target="_blank"
              className="underline transition-colors hover:text-brown"
            >
              prince-kb
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
