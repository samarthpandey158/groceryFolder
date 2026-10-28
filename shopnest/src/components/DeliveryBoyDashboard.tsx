"use client";
import { getSocket } from "@/lib/socket";
import { RootState } from "@/redux/store";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LiveMap from "./LiveMap";
import DeliveryChat from "./DeliveryChat";
import { Loader } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Swal from "sweetalert2";

interface ILocation {
  latitude:number,
  longitude:number
}
export default function DeliveryBoyDashboard({earning}:{earning:number}) {
  const [assignments, setassignment] = useState<any[]>([]);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [showOtpBox,setShowOtpBox] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [sendOtpLoading, setSendOtpLoading] = useState(false)
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
  const [otp,setOtp] = useState("")
  const [userLocation, setUserLocation] = useState<ILocation>({
  latitude:0,
  longitude:0
});
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<ILocation>({
  latitude:0,
  longitude:0
});
  const {userData} = useSelector((state:RootState)=>state.userka)
  const fetchAssignments = async () => {
      try {
        const result = await axios.get("/api/delivery/get-assignments");
        console.log(result);
        setassignment(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(()=>{
    const socket = getSocket()
    if (!userData?._id) return;
    if (!navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setDeliveryBoyLocation({
             latitude: lat ,
             longitude: lon
          })
        socket.emit("update-location", {
          userId:userData?._id,
          latitude: lat,
          longitude: lon,
        
        });
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  },[userData?._id])
  useEffect((): any => {
    const socket = getSocket();
    socket.on("new-assignment", (deliveryAssignment) => {
      setassignment((prev) => [...prev!, deliveryAssignment]);
    });
    return () => socket.off("new-assignment");
  }, [userData?._id]);

  const handleAccept = async (id: string) => {
    try {
      const result = await axios.get(
        `/api/delivery/assignment/${id}/accept-assignment`,
      );
      console.log(result);
      fetchCurrentOrder()
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentOrder = async () => {
    try {
        const result = await axios.get("/api/delivery/current-order");
        if (result.data.active) {
          setActiveOrder(result.data.assignment);

          setUserLocation({
            latitude: result.data.assignment.order.address.latitude,
            longitude: result.data.assignment.order.address.longitude
          });
        }
    } catch (error) {
        console.log(error);
    }
}

useEffect((): any => {
    const socket = getSocket();

    socket.on("update-deliveryBoy-location", ({ userId, location }) => {
        setDeliveryBoyLocation({
            latitude: location.coordinates[1],
            longitude: location.coordinates[0]
        });
    });

    return () => socket.off("update-deliveryBoy-location");
}, []);
useEffect(() => {
    fetchCurrentOrder()
    fetchAssignments();
  }, [userData]);


const sendOtp = async () => {
  setSendOtpLoading(true)
    try {
        const result = await axios.post("/api/delivery/otp/send", {
            orderId: activeOrder.order._id
        });

        console.log(result.data);
        setShowOtpBox(true);
        setSendOtpLoading(false)
        await Swal.fire({ title: "OTP Sent!", text: result.data.message || "OTP sent successfully to the customer.", icon: "success", confirmButtonText: "Continue", confirmButtonColor: "#16a34a", timer: 3000, timerProgressBar: true, });
    } catch (error:any) {
        console.log(error);
        setSendOtpLoading(false)
        await Swal.fire({ title: "Failed!", text: error.response?.data?.message || "Unable to send OTP.", icon: "error", confirmButtonColor: "#dc2626", });
    }
}

const verifyOtp = async () => {
  if (!otp || otp.length !== 4) { setOtpError("Please enter a valid 4-digit OTP."); Swal.fire({ title: "Invalid OTP!", text: "Please enter your 4-digit OTP.", icon: "warning", confirmButtonColor: "#16a34a", }); return; }
  setVerifyOtpLoading(true)
    try {
        const result = await axios.post("/api/delivery/otp/verify", {
            orderId: activeOrder.order._id,otp
        });

        console.log(result.data);
        setActiveOrder(null);
        setVerifyOtpLoading(false)
        await Swal.fire({ title: "Delivery Completed!", text: result.data.message || "OTP verified successfully.", icon: "success", confirmButtonText: "Great!", confirmButtonColor: "#16a34a", timer: 2500, timerProgressBar: true, });
        await fetchCurrentOrder()
        window.location.reload()
    } catch (error:any) {
      const message = error.response?.data?.message || "Invalid OTP. Please try again.";
        setOtpError("verification error")
        setVerifyOtpLoading(false)
        await Swal.fire({ title: "Verification Failed!", text: message, icon: "error", confirmButtonText: "Try Again", confirmButtonColor: "#dc2626", });
    }
}


  if (!activeOrder && assignments.length === 0) {
    const todayEarning = [
        {
            name: "Today",
            earning,
            deliveries: earning / 40
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-white to-green-50 p-6">
            <div className='max-w-md w-full text-center mt-12'>
            <h2 className='text-2xl font-bold text-gray-800'>
                No Active Deliveries 🚚
            </h2>
            <p className='text-gray-500 mb-5'>
                Stay online to receive new orders
            </p>

            <div className='bg-white border rounded-xl shadow-xl p-6'>
                <h2 className='font-medium text-green-700 mb-2'>
                    Today's Performance
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={todayEarning}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="earnings"  fill="#16A34A" radius={[6, 6, 0, 0]} name="Earnings (₹)" />
                      <Bar dataKey="deliveries"  fill="#16A34A" radius={[6, 6, 0, 0]} name="Deliveries" />
                    </BarChart>
                 </ResponsiveContainer>


                <p className='mt-4 text-lg font-bold text-green-700'>
                    {earning || 0} Earned today
                </p>

                <button
                    className='mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg'
                    onClick={() => window.location.reload()}
                >
                    Refresh Earning
                </button>
             </div>
            </div>
        </div>
    );
  }

  if (activeOrder && userLocation) {
  return (
    <div className="p-4 pt-[120px] min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Active Delivery
        </h1>

        <p className="text-gray-600 text-sm mb-4">
          order#{activeOrder.order._id.slice(-6)}
        </p>

        <div className="rounded-xl  border shadow-lg overflow-hidden mb-6">
          <LiveMap userLocation={userLocation} deliveryBoyLocation={deliveryBoyLocation}/>
        </div>
        <DeliveryChat
        orderId={activeOrder.order._id}
        deliveryBoyId={userData?._id!.toString()!}
      />
      <div className='mt-6 bg-white rounded-xl border shadow p-6'>
    {!activeOrder.order.deliveryOtpVerification && !showOtpBox && (
    <button
        className='w-full py-4 bg-green-600  text-white rounded-lg flex items-center justify-center'
        onClick={sendOtp}
    >
        {sendOtpLoading ? (
    <Loader size={20} className='animate-spin text-white' />
     ) : "Mark as Delivered"}
    </button>
    )}
    {
    showOtpBox && (
        <div className='mt-4'>
            <input
                type="text"
                className='w-full py-3 border rounded-lg text-center'
                placeholder='Enter Otp'
                maxLength={4}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
            />

            <button
                className='w-full mt-4 bg-blue-600 text-white flex items-center justify-center py-3 rounded-lg'
                onClick={verifyOtp}
            >
               {verifyOtpLoading ? (
    <Loader size={20} className='animate-spin  text-white' />
) : "Verify OTP"}
            </button>

            {otpError && (
                <div className='text-red-600 mt-2'>
                    {otpError}
                </div>
            )}
        </div>
    )
    }
    {activeOrder.order.deliveryOtpVerification && (
    <div className='text-green-700 text-center font-bold'>
        Delivery completed!
    </div>
    )}
</div>
      </div>
    </div>
  );
}
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {" "}
      <div className="max-w-3xl mx-auto">
        {" "}
        <h2 className="text-2xl font-bold mt-[120px] mb-[30px]">
          {" "}
          Delivery Assignments{" "}
        </h2>{" "}
        {assignments.map((a,index) => (
          <div
            key={index}
            className="p-5 bg-white rounded-xl shadow mb-4 border"
          >
            <p>
              <b>Order Id </b> #{a?.order?._id.toString().slice(-6)}
            </p>

            <p className="text-gray-600">{a.order.address.fullAddress}</p>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              onClick={()=>handleAccept(a._id)}>
                Accept
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
