import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 p-2 shadow-md">
      <div>
        <div className="my-3 flex justify-around flex-wrap">
          <div>
            <div className="text-xl font-semibold">Get support</div>
            <ul className="ml-1">
              <li className="text-gray-600 my-2">Help Center</li>
              <li className="text-gray-600 my-2">Live chat</li>
              <li className="text-gray-600 my-2">Check order status</li>
              <li className="text-gray-600 my-2">Report</li>
            </ul>
          </div>
          <div>
            <div className="text-xl font-semibold">Get To Know Us</div>
            <ul className="ml-1">
              <li className="text-gray-600 my-2">About EcStore</li>
              <li className="text-gray-600 my-2">Corporate responsibility</li>
              <li className="text-gray-600 my-2">News center</li>
              <li className="text-gray-600 my-2">Careers</li>
            </ul>
          </div>
          <div>
            <div className="text-xl font-semibold">Source on EcStore</div>
            <ul className="ml-1">
              <li className="text-gray-600 my-2">Request for Quotation</li>
              <li className="text-gray-600 my-2">Membership program</li>
              <li className="text-gray-600 my-2">EcStore Logistics</li>
              <li className="text-gray-600 my-2">Sales tax and VAT</li>
            </ul>
          </div>
          <div>
            <div className="text-xl font-semibold">Sell on EcStore</div>
            <ul className="ml-1">
              <li className="text-gray-600 my-2">Start selling</li>
              <li className="text-gray-600 my-2">Seller Central</li>
              <li className="text-gray-600 my-2">Become a Verified Supplier</li>
              <li className="text-gray-600 my-2">Partnerships</li>
            </ul>
          </div>
        </div>
        <div className="divider my-4"></div>
        <div className="text-center">
          <div className="my-2">CONNECT WITH US</div>
          <div className="flex justify-center items-center gap-2">
            <abbr title="facebook">
              <FaFacebook
                size={40}
                className="cursor-pointer hover:text-[#1877F2]"
              />
            </abbr>
            <abbr title="twitter">
              <FaTwitter
                size={40}
                className="cursor-pointer hover:text-[#1DA1F2]"
              />
            </abbr>
            <abbr title="instagram">
              <FaInstagram
                size={40}
                className="cursor-pointer hover:text-[#dc2743]"
              />
            </abbr>
          </div>
        </div>
      </div>
      <div className="divider my-4"></div>
      <div className="text-center mb-3">&copy; 2024 All Right Reseved</div>
    </div>
  );
};

export default Footer;
