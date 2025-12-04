"use client";

import { useEffect, } from "react";
import Image from "next/image";
import splash from "../app/assets/splash.png"; // adjust your path
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/form')
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);


  return (
    <div className="flex w-full h-screen bg-zinc-50 font-sans items-center justify-center">
      <Image src={splash} alt="logo" fill className="object-cover" priority />


{/**loader part */}
<div className="absolute bottom-50 flex justify-center w-full">
        <div className="loader"></div>
      </div>

 {/**spinner loader */}
 <style jsx>{`
        .loader {
          width: 17px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #fff;
          display: grid;
          animation: l22-0 2s infinite linear;
        }

        .loader:before,
        .loader:after {
          content: "";
          grid-area: 1/1;
          margin: 15%;
          border-radius: 50%;
          background: inherit;
          transform: rotate(0deg) translate(150%);
          animation: l22 1s infinite;
        }

        .loader:after {
          animation-delay: -0.5s;
        }

        @keyframes l22-0 {
          100% {
            transform: rotate(1turn);
          }
        }

        @keyframes l22 {
          100% {
            transform: rotate(1turn) translate(150%);
          }
        }
      `}</style>

    </div>

   
    
  );
}

