import React from "react";
import {
  ChartAreaIcon,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="footer_top w-full pt-10 pb-8 px-4 sm:px-6 lg:px-8 bg-violet-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              {/* logo wrapper  */}
              <div className="logo_wrapper mb-5">
                <Link
                  to="/"
                  className="text-2xl sm:text-3xl text-amber-400 font-inter font-medium capitalize flex items-center gap-2"
                >
                  <ChartAreaIcon size="2rem" color="#029fae" />
                  SandangShop
                </Link>
              </div>

              <p className="text-sm sm:text-base text-[#f8f8f8] font-inter font-normal mb-4 max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus repellat vero nulla!
              </p>

              <div className="footer_social flex items-center gap-3">
                <Link className="p-2 rounded-full border-[#ffffff] border">
                  <Facebook size="1.5rem" color="white" />
                </Link>
                <Link className="p-2 rounded-full border-[#ffffff] border">
                  <Twitter size="1.5rem" color="white" />
                </Link>
                <Link className="p-2 rounded-full border-[#ffffff] border">
                  <Instagram size="1.5rem" color="white" />
                </Link>
                <Link className="p-2 rounded-full border-[#ffffff] border">
                  <Youtube size="1.5rem" color="white" />
                </Link>
              </div>
            </div>

            <div className="footer_wrapper">
              <h3 className="text-base sm:text-xl text-teal-300 font-inter font-medium uppercase">
                Category
              </h3>
              <ul className="space-y-2 mt-4">
                {[
                  "sofa",
                  "armchair",
                  "wing chair",
                  "desk chair",
                  "wooden chair",
                  "park bench",
                ].map((item) => (
                  <li key={item}>
                    <Link className="text-sm sm:text-base text-[#ffffff] font-inter font-normal capitalize">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer_wrapper">
              <h3 className="text-base sm:text-xl text-teal-300 font-inter font-medium uppercase">
                Support
              </h3>
              <ul className="space-y-2 mt-4">
                {[
                  "help & support",
                  "terms & condition",
                  "privacy policy",
                  "help",
                ].map((item) => (
                  <li key={item}>
                    <Link className="text-sm sm:text-base text-[#ffffff] font-inter font-normal capitalize">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="newsletter">
              <h3 className="text-base sm:text-xl text-teal-300 font-inter font-medium uppercase mb-4">
                Newsletter
              </h3>
              <form className="w-full flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  placeholder="Your Email.."
                  className="w-full h-[46px] border border-[#ffffff] rounded-lg pl-2"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto text-base text-white font-semibold capitalize px-6 h-[46px] bg-[#ffd000] rounded-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom w-full h-auto py-4 px-4 sm:px-6 lg:px-8 bg-violet-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center sm:text-left text-amber-400 font-inter">
            @ 2025 - Designed & Developed{"FahmiRohman"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
