"use client"
import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User } from "lucide-react";
import {motion} from "motion/react"
import React, { useState } from "react";
import Image from "next/image";
import googleImage from "@/assets/google.png"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

 function Login() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(true)
    const [loading,setLoading] = useState(false)
    const router = useRouter();
    const handlelogin = async (e:React.SubmitEvent)=>{
      e.preventDefault()
      if (!email.trim() || !email.trim().toLowerCase().endsWith("@gmail.com")) {
    await Swal.fire({
        icon: "error",
        title: "Invalid Email!",
        text: "Please enter a valid Gmail address.",
        confirmButtonColor: "#2563eb",
    });
    return;
}
if (password.length <= 6) {
    await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must be more than 6 characters.",
        confirmButtonColor: "#2563eb",
    });
    return;
}
      setLoading(true)
      try {
        const result=await signIn("credentials",{
          email,password,
          redirect:false,
        })
        if (result?.error) {
        await Swal.fire({
        icon: "error",
        title: "Login Failed!",
        
        text: "Incorrect email or password.",
        confirmButtonColor: "#2563eb",
    });
    setLoading(false)
    return;
    }
        router.push("/");
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">


      <motion.h1
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
            y:0,
            opacity:1
        }}
        transition={{
            duration:0.6
        }}
        className="text-4xl font-extrabold text-blue-700 mb-3"
      >
       Let's fill your cart! 🛍️
      </motion.h1>
       <p className="flex items-center text-gray-600 mb-8 ">Signin ShopNest today <Leaf className="w-5 h-5 text-blue-600"/></p>

       <motion.form
        onSubmit={handlelogin}
        initial={{
        opacity: 0,
        }}
        animate={{
          opacity:1
        }}
        transition={{
            duration:0.6
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
       >

    <div className="relative">
     <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
     <input
       type="text"
       placeholder="Your Email"
       className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
       onChange={(e)=>setEmail(e.target.value)}
     />
    </div>
    <div className="relative">
     <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
     <input
       type={showPassword? "text" : "password"}
       placeholder="Your Password"
       className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
       onChange={(e)=>setPassword(e.target.value)}
     />
     {
       showPassword ? (
      <EyeOff
      className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
      onClick={() => setShowPassword(false)}
       />
      ) : (
       <EyeIcon
      className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
      onClick={() => setShowPassword(true)}
       />
      )
    }
    </div>
      {
      (() => {
    const formValidation =
       email !== "" && password !== "";

    return (
      <button disabled={!formValidation && loading}
        className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
          formValidation
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
       {loading?<Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
      </button>
        );
      })()
      }

      <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
        <span className="flex-1 h-px bg-gray-200"></span>
           OR
        <span className="flex-1 h-px bg-gray-200"></span>
      </div>

     <div className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200' onClick={()=>signIn("google",{callbackUrl:"/"})}>
        <Image src={googleImage} width={20} height={20} alt='google'/>
        Continue with Google
      </div>
       </motion.form>
       <p className='cursor-pointer text-gray-600 mt-6 text-sm flex items-center gap-1'>
      Want to create an account? <LogIn className='w-4 h-4' />
       <span className='text-blue-600' onClick={()=>router.push("/register")}>Sign up</span>
    </p>
    </div>
  );
}

export default Login;