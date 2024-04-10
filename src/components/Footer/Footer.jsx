import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="py-8" style={{ background: "#E0E0E0" }}>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {/* <div className="w-full md:w-1/2 lg:w-3/12 p-6">
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" />
            </div>
          </div> */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <h3 className="mb-4 text-l font-semibold uppercase text-gray-500">Company</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <h3 className="mb-4 text-l font-semibold uppercase text-gray-500">Support</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/12 p-6">
            <h3 className="mb-4 text-l font-semibold uppercase text-gray-500">Legals</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Terms &amp; Conditions</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
          <div className="w-full p-8 flex justify-center">
            <p className="text-sm text-gray-600"> &copy; Copyright 2024. All Rights Reserved by Puzzles.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
