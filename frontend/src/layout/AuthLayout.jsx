import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    // h-screen and overflow-hidden prevent the page from scrolling
<div 
  className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans"
  style={{
    background: "radial-gradient(circle at center, #ffffff 0%, #929FBF 50%, #1c92ff 100%)"
  }}
>      
      {/* Main Card: Fixed max-height to ensure it never exceeds viewport */}
      <div className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden max-w-5xl w-full shadow-2xl h-full max-h-[700px]">
        
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#1c92ff] p-12 flex-col justify-center items-center text-white relative">
          {/* Decorative Background Blob */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-125">
              <path fill="#FFFFFF" d="M40,-60C53.3,-53.3,66.7,-46.7,73.3,-33.3C80,-20,80,-6.7,73.3,6.7C66.7,20,53.3,33.3,40,46.7C26.7,60,13.3,73.3,0,80C-13.3,86.7,-26.7,86.7,-40,80C-53.3,73.3,-66.7,60,-73.3,46.7C-80,33.3,-80,20,-73.3,6.7C-66.7,-6.7,-60,-20,-53.3,-33.3C-46.7,-46.7,-33.3,-53.3,-20,-60C-6.7,-66.7,6.7,-66.7,40,-60Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
            <div className="bg-white/20 p-5 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30">
               <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-blue-50 text-base max-w-xs mx-auto leading-relaxed opacity-90">
              Unlock premium features and join our growing community today.
            </p>
          </div>

          <div className="absolute bottom-8 flex gap-8 text-[10px] tracking-widest text-blue-100/70 font-bold uppercase">
            <span className="hover:text-white cursor-pointer transition-all">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-all">Terms</span>
            <span className="hover:text-white cursor-pointer transition-all">Help</span>
          </div>
        </div>

        {/* Right Side: Form Content (Scrollable internally if screen is tiny) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center overflow-y-auto no-scrollbar">
          {toggle ? (
            <Register setToggle={setToggle} />
          ) : (
            <Login setToggle={setToggle} />
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;