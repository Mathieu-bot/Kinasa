import React from "react";
import { Mail, Phone, MapPin, Clock, Globe, Facebook, Twitter, Instagram, CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100 pt-16 pb-8 border-t border-amber-200 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-amber-700">Kina</span><span className="text-emerald-700">sa</span>
            </h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Connecting Madagascar's agricultural producers with global markets through a transparent, sustainable, and fair trade platform. Supporting farmers across various sectors including agricultural products, handicrafts and natural resources.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
                { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
                { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-amber-600 hover:text-emerald-600 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-emerald-800 border-b border-amber-300 pb-2">Explore</h3>
            <ul className="space-y-2 text-slate-700">
              {[
                { name: "Features", href: "/#features" },
                { name: "How It Works", href: "/#how-it-works" },
                { name: "Success Stories", href: "/#testimonials" },
                { name: "FAQ", href: "/#faq" },
                { name: "Our Producers", href: "/producers" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="hover:text-emerald-600 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2 text-amber-500">→</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-emerald-800 border-b border-amber-300 pb-2">Contact Info</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Antananarivo Business Center<br />
                  Antananarivo 101, Madagascar
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                <a href="mailto:contact@kinasa.mg" className="hover:text-emerald-600 transition-colors duration-300">
                  contact@kinasa.mg
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                <span>+261 20 22 123 45</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Monday - Friday: 8am - 5pm<br />
                  Saturday: 9am - 12pm<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-emerald-800 border-b border-amber-300 pb-2">Download Our App</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Get the Kinasa mobile app for a better experience connecting with producers and tracking your orders on the go.
            </p>
            <div className="flex flex-col space-y-3">
              {[
                { 
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png", 
                  alt: "Get it on Google Play",
                  href: "#"
                },
                { 
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png", 
                  alt: "Download on the App Store",
                  href: "#"
                }
              ].map((store, index) => (
                <a key={index} href={store.href} className="block transform transition-transform hover:scale-105">
                  <img
                    src={store.src}
                    alt={store.alt}
                    className="h-10"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-emerald-800 border-b border-amber-300 pb-2">Newsletter</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Subscribe to our newsletter for updates on new products, special offers, and market insights.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                className="px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white/80"
                placeholder="Your email address"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-md hover:from-emerald-600 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-amber-300 pt-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center mb-4 w-full">
              <h4 className="text-emerald-800 font-medium mb-4 inline-flex items-center">
                <CreditCard className="h-5 w-5 mr-2" /> Accepted Payment Methods
              </h4>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { src: "https://cdn-icons-png.flaticon.com/512/196/196578.png", alt: "Visa" },
                { src: "https://cdn-icons-png.flaticon.com/512/196/196561.png", alt: "Mastercard" },
                { src: "https://cdn-icons-png.flaticon.com/512/196/196539.png", alt: "PayPal" },
                { src: "https://cdn-icons-png.flaticon.com/512/349/349228.png", alt: "Apple Pay" },
                { src: "https://cdn-icons-png.flaticon.com/512/5968/5968416.png", alt: "Orange Money" },
                { src: "https://cdn-icons-png.flaticon.com/512/5977/5977576.png", alt: "Mobile Money" }
              ].map((payment, index) => (
                <img
                  key={index}
                  src={payment.src}
                  alt={payment.alt}
                  className="h-10 opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-700 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} <span className="text-emerald-700 font-medium">Kinasa</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors duration-300 text-sm cursor-pointer">
                <Globe className="h-4 w-4 mr-1" />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
