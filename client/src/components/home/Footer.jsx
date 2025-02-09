import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-teal-950 text-white py-10 font-satoshi">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: FinSynergy and Social Media Links */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">FinSynergy</h1>
          <p className="text-lg">Innovating finance, empowering the future</p>
        
        </div>

        {/* Features Section */}
        <div>
          <h4 className="font-bold text-lg mb-4 ">Our Features</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-teal-400">Gamify</a></li>
            <li><a href="#features" className="hover:text-teal-400">Dashboard</a></li>
            <li><a href="#features" className="hover:text-teal-400">Virtual Stock Market</a></li>
          </ul>
        </div>

        {/* Right Section: LinkedIn Profiles and Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Team LinkedIn</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <a href="https://www.linkedin.com/in/nidhi-patel-424674252/" className="hover:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </a>
              <span className="text-lg font-medium">Nidhi Patel</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.linkedin.com/in/swaraj-panmand-734629248/" className="hover:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </a>
              <span className="text-lg font-medium">Swaraj Panmand</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.linkedin.com/in/arsa-k/" className="hover:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </a>
              <span className="text-lg font-medium">Arsalaan Khan</span>
            </div>
          </div>

          
          
        </div>
      </div>

      {/* Made By Section */}
      <div className="mt-10 text-center">
        <p>Made with ❤️ by Nidhi, Swaraj, and Arsalan</p>
      </div>
    </div>
  </footer>
);

export default Footer;
