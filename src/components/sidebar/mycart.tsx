'use client'

import CardIcon from '@/images/card_icon.svg';
import CartIcon from '@/images/cart_icon.svg';
import { CircleXIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
  const [IsCartOpen, setIsCartOpen] = useState<boolean>(false);
  return (
    <>
      {
        !IsCartOpen ?
          <div className="fixed right-0 top-1/2 z-20 hidden h-fit -translate-y-1/2 lg:flex items-center justify-center translate-x-0">
            <div className="relative flex h-[110px] w-[90px] 
                flex-col items-center justify-center 
                gap-1 rounded-l-xl
                shadow-[0px_8px_16px_-4px_rgba(3,6,15,0.32)] cursor-pointer 
                transition-all hover:w-[100px] bg-red-600" onClick={() => {
                setIsCartOpen(true);
                console.log("cart", IsCartOpen);
              }}>
              <Image
                src={CardIcon}
                width={25}
                height={25}
                alt="My cart icon"
              />
              <p className="w-[4rem] text-center text-white font-semibold text-[0.9rem]">My Cart</p>
            </div>
          </div>
          : <></>
      }
      {
        IsCartOpen ?
        <div className="fixed right-0 top-1/2 z-20 hidden h-fit -translate-y-[22rem] lg:flex items-center justify-center translate-x-0">
          <div className="fixed -top-3 -left-2">
            <CircleXIcon stroke="white" fill="black" size={30} onClick={() => setIsCartOpen(false)}/>
            </div>
            <div className="flex w-[22rem] h-[76vh] min-h-[400px] flex-col bg-white border-solid border-slate-50 
        items-center justify-center gap-y-1 text-center px-16 shadow-[0px_4px_8px_rgba(150,150,150,0.15),-4px_0px_8px_rgba(150,150,150,0.15)] 
        rounded-b-xl
        ">
              <Image
                src={CartIcon}
                width={60}
                height={60}
                alt="My cart icon"
                className="opacity-40"
              />
              <div className="w-[15rem] font-medium text-[1.1rem] text-gray-400">Start adding items to your cart</div>
            </div>
          </div>
          : <></>
      }
    </>
  )
}