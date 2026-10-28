"use client"
import RegisterForm from "@/components/RegisterForm";
import Welcome  from "@/components/Welcome";
import { useState } from "react";

export default function Register()
{
    const [step,stepSet] = useState(1);
    return <div>
        {step ==1 ? <Welcome nextStep={stepSet}/> : <RegisterForm previousStep={stepSet}/> }
    </div>
}