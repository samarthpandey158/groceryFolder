import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail, User } from "lucide-react";
import {motion} from "motion/react"
import React, { useState } from "react";
import Image from "next/image";
import googleImage from "@/assets/google.png"
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
type propType={
    previousStep:(s:number) => void
}
 function RegisterForm({ previousStep }: propType) {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(true)
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const handleRegister = async (e:React.SubmitEvent)=>{
        e.preventDefault();
        // Name validation
if (!/^[a-zA-Z ]+$/.test(name.trim())) {
    await Swal.fire({
        icon: "error",
        title: "Invalid Name!",
        text: "Name must contain only alphabets.",
        confirmButtonColor: "#2563eb",
    });
    return;
}

// Email validation
if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim())) {
    await Swal.fire({
        icon: "error",
        title: "Invalid Email!",
        text: "Please enter a valid Gmail address.",
        confirmButtonColor: "#2563eb",
    });
    return;
}

// Password validation
if (password.length < 7) {
    await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must contain at least 7 characters.",
        confirmButtonColor: "#2563eb",
    });
    return;
}
        setLoading(true)
        try {
            const register = await axios.post("api/auth/register",{
                name,
                email,
                password
            })
            router.push("/login")
            setLoading(false)
        } catch (error:any) {
            console.log(error)
       
              if (error.response?.status === 500) {
        await Swal.fire({
            icon: "warning",
            title: "Email Already Exists!",
            text: "This email is already registered. Please use another email.",
            confirmButtonColor: "#2563eb",
        });
    } else {
        await Swal.fire({
            icon: "error",
            title: "Registration Failed!",
            text: error.response?.data?.message || "Something went wrong. Please try again.",
            confirmButtonColor: "#2563eb",
        });
    }
    setLoading(false)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <div className="absolute top-6 left-6 flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors cursor-pointer 
      " onClick={()=> previousStep(1)}>
        <ArrowLeft/>
        Back
      </div>

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
        className="text-4xl font-extrabold text-blue-700 mb-2"
      >
        Create Account
      </motion.h1>
       <p className="flex items-center text-gray-600 mb-8 ">Join ShopNest today <Leaf className="w-5 h-5 text-blue-600"/></p>

       <motion.form
       onSubmit={handleRegister}
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
     <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
     <input
       type="text"
       placeholder="Your Name"
       className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
       onChange={(e)=>setName(e.target.value)}
     />
     { name.length > 0 && !/^[a-zA-Z ]+$/.test(name) && (
    <p className="text-red-500 text-sm mt-1">
        Name must contain only alphabets.
    </p>
)}
    </div>
    <div className="relative">
     <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
     <input
       type="text"
       placeholder="Your Email"
       className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
       onChange={(e)=>setEmail(e.target.value)}
     />
     {email.length > 0 &&
    !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim()) && (
        <p className="text-red-500 text-sm mt-1">
            Please enter a valid Gmail address.
        </p>
    )}
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
      name !== "" && email !== "" && password !== "";

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

     <div className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200'  onClick={()=>signIn("google",{callbackUrl:'/'})}>
        <Image src={googleImage} width={20} height={20} alt='google'/>
        Continue with Google
      </div>
       </motion.form>
       <p className='cursor-pointer text-gray-600 mt-6 text-sm flex items-center gap-1'>
      Already have an account? <LogIn className='w-4 h-4' />
       <span className='text-blue-600' onClick={()=>router.push("/login")}>Sign in</span>
    </p>
    </div>
  );
}

export default RegisterForm;