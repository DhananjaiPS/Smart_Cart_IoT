import React from 'react';
import Link from 'next/link';
/// BEFORE (Erroring)
// import { ShoppingBag, Globe, Zap, Users, Star, BrandLinkedin, BrandX, GitHub, Mail } from 'lucide-react'; 

// AFTER (Working)
import { ShoppingBag, Globe, Zap, Users, Star, Linkedin, X, Mail ,Github } from 'lucide-react';
// --- FOOTER COMPONENT ---

const FooterComponent: React.FC = () => {
    return (
        // Full width container with a subtle background and a distinct top border/shadow
        <footer className="bg-white border-t border-gray-100 shadow-xl mt-10">
            {/* Content Container - Matching the main component's max-width and padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
                
                {/* Top Section: Logo, Links, and Info */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-y-12 mb-10 border-b pb-10">
                    
                    {/* 1. Branding / Logo */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShoppingBag className="w-8 h-8 text-blue-600 fill-blue-100" />
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                SmartCart IoT
                            </h3>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            Smart, seamless, and futuristic retail powered by RFID technology.Designed and developed by our team Dhananjai,Rachi,Simra and Shivi
                        </p>
                        <p className="text-sm text-gray-500 order-2 md:order-1 mt-6 md:mt-0"></p>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition">About Us</Link></li>
                            <li><Link href="/features" className="text-gray-600 hover:text-blue-600 transition">Features</Link></li>
                            <li><Link href="/deals" className="text-gray-600 hover:text-blue-600 transition">Today's Deals <Zap className='inline w-3 h-3 ml-1 text-indigo-500' /></Link></li>
                            <li><Link href="/careers" className="text-gray-600 hover:text-blue-600 transition">Careers</Link></li>
                        </ul>
                    </div>

                    {/* 3. Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className=" space-y-3 text-sm " >
                            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link></li>
                            <li><Link href="/faq" className="text-gray-600 hover:text-blue-600 transition">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-600 hover:text-blue-600 transition">Shipping & Returns</Link></li>
                            <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* 4. Store Info */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Store Location</h4>
                        <address className="space-y-2 not-italic text-sm text-gray-600">
                            <p>123 IoT Innovation Park</p>
                            <p>Digital City, 90210</p>
                            <p>India</p>
                            <p className="mt-3"><a href="mailto:support@smartcartiot.com" className="text-blue-600 hover:text-blue-800 transition">support@smartcartiot.com</a></p>
                        </address>
                    </div>
                    
                    {/* 5. Newsletter / Call-to-Action */}
                     <div className='col-span-2 md:col-span-4 lg:col-span-1'>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Join Our Community</h4>
                        <p className='text-sm text-gray-600 mb-3'>Get updates on new tech and exclusive deals.</p>
                        <form className='flex flex-col space-y-3'>
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                                aria-label="Email for newsletter"
                            />
                            <button 
                                type="submit" 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md flex items-center justify-center text-sm"
                            >
                                <Mail className='w-4 h-4 mr-2'/> Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section: Copyright and Social Media */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6">
                    
                    {/* Copyright */}
                    <p className="text-sm text-gray-500 order-2 md:order-1 mt-6 md:mt-0">
                        &copy; {new Date().getFullYear()} SmartCart IoT. All rights reserved.
                    </p>
                    

                    {/* Social Media Links - Stylish, rounded, and shadowed */}
                    <div className="flex space-x-4 order-1 md:order-2">
                        {/* CORRECTED: Using BrandLinkedin */}
                        <a href="#" aria-label="LinkedIn" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition duration-200 shadow-md">
                            {/* <BrandLinkedin className="w-5 h-5" /> */}
                        </a>
                        {/* CORRECTED: Using BrandX */}
                        <a href="#" aria-label="X (formerly Twitter)" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-800 hover:text-white transition duration-200 shadow-md">
                            {/* <BrandX className="w-5 h-5" /> */}
                        </a>
                        {/* FINAL CORRECTION: Using GitHub */}
                        <a href="#" aria-label="GitHub" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-800 hover:text-white transition duration-200 shadow-md">
                            {/* <GitHub className="w-5 h-5" /> */}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;