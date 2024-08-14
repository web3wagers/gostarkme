import Image from "next/image";
import logo from '../assets/logo.png';

export default function NavBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-transparent border-b-2">
      {/* Empty div to push the logo to the center */}
      <div className="w-1/3"></div>

      {/* Logo and Text in the Center */}
      <div className="flex flex-col items-center">
        <Image src={logo} alt="Logo" className="w-16 h-auto" />
        <span className="text-black mt-2">Go Stark Me</span>
      </div>

      {/* Button aligned to the right */}
      <div className="w-1/3 flex justify-end">
        <button className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mr-20">
          Go to App
        </button>
      </div>
    </div>
  );
}
