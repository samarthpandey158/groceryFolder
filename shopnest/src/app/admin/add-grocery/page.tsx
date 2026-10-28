"use client";
import { ArrowLeft, Loader, PlusCircle, UploadIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
const categories = [
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
];

const units = ["kg", "liter", "g", "pack", "ml", "piece"];

export default function AddGrocery() {
  const [name, setName] = useState("");
  const [unit, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState<string | null>();
  const [backendImage, setBackendImage] = useState<File | null>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    const file = files[0];
    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("unit", unit);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const res = await axios.post("/api/admin/add-grocery", formData);
      
      

        console.log("Grocery API success:", res.status, res.data);

        // Pehle popup show karein
        const result = await Swal.fire({
            icon: "success",
            title: "Grocery Added Successfully!",
            text: `${name} has been added successfully.`,
            confirmButtonText: "Great!",
            confirmButtonColor: "#16a34a",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            setName("");
            setPrice("");
            setCategory("");
            setUnits("");
            setBackendImage(null);
            setPreview(null);

            const fileInput = document.getElementById("image") as HTMLInputElement;
            if (fileInput) fileInput.value = "";
        }

    } catch (error) {
    
     console.error("Add grocery error:", error);

        await Swal.fire({
            icon: "error",
            title: "Upload Failed!",
            text: axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Something went wrong.",
            confirmButtonColor: "#dc2626",
        });
    }finally{
       setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      {" "}
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all"
      >
        {" "}
        <ArrowLeft className="w-5 h-5" />{" "}
        <span className="hidden md:flex">Back to home</span>{" "}
      </Link>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
      >
        {" "}
        <div className="flex flex-col items-center mb-8">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <PlusCircle className="text-green-600 w-8 h-8" />{" "}
            <h1>Add Your Grocery</h1>{" "}
          </div>{" "}
          <p className="text-gray-500 text-sm mt-4 text-center">
            Fill out the details below to add a new grocery item.
          </p>{" "}
        </div>
        <form className="flex flex-col gap-6 w-full" onSubmit={handleForm}>
          {" "}
          <div>
            {" "}
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              {" "}
              Grocery Name <span className="text-red-500">*</span>{" "}
            </label>{" "}
            <input
              type="text"
              id="name"
              required
              placeholder="eg: Sweets, Milk ..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />{" "}
          </div>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {" "}
            <div>
              {" "}
              <label className="block text-gray-700 font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>{" "}
              <select
                name="category"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {" "}
                <option value="">Select Category</option>{" "}
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-gray-700 font-medium mb-1">
                Unit<span className="text-red-500">*</span>
              </label>{" "}
              <select
                name="unit"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white"
                onChange={(e) => setUnits(e.target.value)}
                value={unit}
              >
                {" "}
                <option value="">Select Units</option>{" "}
                {units.map((cat) => (
                  <option value={cat}>{cat}</option>
                ))}{" "}
              </select>{" "}
            </div>{" "}
          </div>
          <div>
            {" "}
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-1"
            >
              {" "}
              Price <span className="text-red-500">*</span>{" "}
            </label>{" "}
            <input
              type="text"
              id="name"
              required
              placeholder="eg:999"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />{" "}
          </div>{" "}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {" "}
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 py-3 hover:bg-green-100 transition-all w-full sm:w-auto"
            >
              {" "}
              <UploadIcon className="w-5 h-5" /> Upload Image{" "}
            </label>{" "}
            <input
              type="file"
              id="image"
              required
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />{" "}
            {preview && (
              <Image
                src={preview}
                alt="image"
                width={100}
                height={100}
                className="rounded-xl shadow-md border border-gray-200 object-cover"
              />
            )}
          </div>{" "}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className="mt-4 w-full bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              " Add Grocery"
            )}{" "}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
