"use client"
import { ArrowRight, Bike, ShoppingCart, ShoppingCartPlus } from "lucide-react"
import { motion } from "motion/react"
type PropType = {
    nextStep : (s:number)=>void
}
export default function Welcome({nextStep}:PropType)
{
    return(
        <div className="flex flex-col justify-center items-center min-h-screen w-full text-center p-6">

            <motion.div
             initial={{
                opacity:0,
                y:-10
            }}
            animate={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:0.6
            }}
            className="flex items-center gap-3"
            >
             <ShoppingCart className="w-10 h-10 text-blue-600 " />
             <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 ">ShopNest</h1>
            </motion.div>
             
             <motion.p
              initial={{
                opacity:0,
                y:10
            }}
             animate={{
                opacity:1,
                y:0
             }}
             transition={{
                duration:0.6,
                delay:0.3
              }}
              className="text-lg mt-5 text-gray-800 md:text-xl max-w-lg"
             >
                Your Daily Needs, Delivered in Minutes.
                Fresh groceries, everyday essentials, and more — delivered right to your doorstep.
             </motion.p>

             <motion.div
             initial={{
                opacity:0,
                scale:0.9
            }}
            animate={{
                opacity:1,
                scale:1
            }}
            transition={{
                duration:0.6,
                delay:0.5
            }}
            className="flex items-center justify-center gap-10 mt-10"
             >
                <ShoppingCartPlus className="w-24 h-24 md:w-32 md:h-32 text-blue-600
                drop-shadow-md" />
                <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-600
                drop-shadow-md"/>
             </motion.div>

             <motion.button
             initial={{
                opacity:0,
                y:20
            }}
            animate={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:0.6,
                delay:0.6
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-10"
            onClick={()=>nextStep(2)}
            >
                Next
                <ArrowRight/>
             </motion.button>
        </div>
    )
}