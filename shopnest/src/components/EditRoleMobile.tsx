"use client"
import axios from "axios";
import { ArrowBigRight, ArrowLeft, ArrowRight, Bike, User, UserCog } from "lucide-react";
import {motion} from "motion/react"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditRoleMobile()
{
    const [roles,setRole] = useState(
       [ {id:"admin",label:"Admin",icon:UserCog},
        {id:"user",label:"User",icon:User},
        {id:"deliveryBoy",label:"Delivery Boy",icon:Bike}]
    )
    const router = useRouter()
    const [selectedRole , SetselectedRole ] = useState("")
    const [mobile,setMobile] = useState("");
    const {update} = useSession()
    const handleEdit = async () => {
        try {
           await axios.post("api/user/edit-role-mobile",{
                role:selectedRole,
                mobile
            })
            await update({role:selectedRole})
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const handleAdminCheck = async ()=>{
            try {
                const result = await axios.get("/api/check-for-admin")
                if(result.data.adminExists){
                    setRole(prev=>prev.filter(r=>r.id!="admin"))
                }
            } catch (error) {
                console.log(error)
            }
        }
        handleAdminCheck();
    },[])
    return (
        <div className="flex flex-col items-center min-h-screen p-6 w-full">
            <motion.h1
             initial={{
                y: -20,
                opacity: 0,
            }}
            animate={{
                y:0,
                opacity:1
            }}
            transition={{
                duration:0.6
            }}
            className="text-3xl md:text-4xl font-extrabold text-center mt-8 text-blue-400"
            >
                Select Your Role
            </motion.h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
            {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
                <motion.div
                key={role.id}
                whileTap={{scale:0.9}}
                onClick={()=>SetselectedRole(role.id)}
                className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 transition-all ${
                    isSelected
                    ? "border-purple-600 bg-green-100 shadow-lg"
                    : "border-gray-300 bg-white hover:border-purple-400"
                }`}
                >
               <Icon />
        <span>{role.label}</span>
          </motion.div>
    );
      })}
            </div>

            <motion.div
              initial={{
               opacity: 0,
            }}
            animate={{
                opacity:1
            }}
            transition={{
                delay:0.5,
                duration:0.6
            }}
            className="flex flex-col items-center mt-10"
            >
                <label htmlFor="mobile" className="text-gray-800 font-medium mb-2">Enter your mobile number : </label>
                <input
                type="tel"
                id="mobile"
                className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
                placeholder="eg. 9145769812"
                onChange={(e)=>setMobile(e.target.value)}
                />
            </motion.div>

            <motion.button
              initial={{
                y: 20,
                opacity: 0,
                }}
                animate={{
                    y:0,
                    opacity:1
                }}
                transition={{
                    delay:0.6
                }}
                disabled={!selectedRole || !(mobile.length >= 10)}
                className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 w-47 mt-20 ${
                        selectedRole && mobile.length === 10
                     ? "bg-blue-600 hover:bg-blue-700 text-white"
                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleEdit}
                >
                     Go To Home
                    <ArrowRight/>
            </motion.button> 
        </div>
    )
}