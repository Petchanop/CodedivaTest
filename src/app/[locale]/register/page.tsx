import RegisterComponent from "@/components/register/register";
import Image from "next/image";
import RegisterBanner from "@/images/register/register-banner.webp";

export default function RegisterPage() {
  return (
    <div className="flex relative 
    xl:pl-24 xl:justify-center xl:space-x-32 
    justify-start bg-gray-100 overflow-x-hidden overflow-y-hidden">
      <div className="xl:flex-col xl:w-[40rem] w-full md:p-10 p-6 space-y-7">
        <RegisterComponent />
      </div>
      <div className="flex-col xl:w-[36rem] xl:pr-10 max-lg:hidden">
        <Image
          src={RegisterBanner}
          alt="Register banner"
          className="w-auto h-full object-cover"
        />
      </div>
    </div>
  )
}