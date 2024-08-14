import Image from "next/image";
import Card from '../assets/card.png';
import logo from '../assets/logo.png';
import { CiUser } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { PiStarFourLight } from "react-icons/pi";
export default function HomeContent() {
  return (
   <div className="flex  flex-row justify-center">

   <div className=" p-32 ">
    <h2 className=" text-xl font-bold p-4">Upload your cause</h2>

    <div className="flex p-2">
    <CiUser className="w-8"/>
    <h3 className="pl-1">Give it a name.</h3>
    </div>

    <div className="flex p-2">
      <GoGoal className="w-8"/> 
     <h3 className="pl-1"> Give it a Good Purpose</h3>
    </div>
    <div className="flex p-2">
      <PiStarFourLight className="w-8"/>
     <h3 className="pl-1"> Recollect Stars</h3>
    </div>
    <div className="flex p-2">
    <Image src={logo} alt="Logo" className="w-8 pr-1 h-auto" />
<h3>Recieve Donations</h3>
    </div>

   </div>
      <div className=" p-12  ">
    <Image src={Card} alt="Logo" className=" w-72 h-auto" />
    </div>
    </div>  
  );
}
