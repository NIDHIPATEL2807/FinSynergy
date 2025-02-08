import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-teal-950 text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-teal-400">About</a></li>
            <li><a href="#" className="hover:text-teal-400">Contact</a></li>
            <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-0">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-blue-400"><Github className="w-6 h-6" /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
