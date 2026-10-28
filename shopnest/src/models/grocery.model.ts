

import mongoose, { model } from "mongoose";

export interface Igrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:string,
    unit:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}

const grocerySchema = new mongoose.Schema<Igrocery>({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:[
            "Fruits & Vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Snacks & Biscuits",
            "Spices & Masalas",
            "Beverages & Drinks",
            "Personal Care",
            "Household Essentials",
            "Instant & Packaged Food",
            "Baby & Pet Care",
        ]    
    },
    price:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        requird:true,
        enum:[
            "kg","liter","g","pack","ml","piece"
        ]
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Grocery = mongoose.models.Grocery || mongoose.model("Grocery",grocerySchema)

export default Grocery;