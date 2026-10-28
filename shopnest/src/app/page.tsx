import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoy from "@/components/DeliverBoy";
import EditRoleMobile from "@/components/EditRoleMobile";
import Footer from "@/components/Footer";
import GeoUpdater from "@/components/GeoUpdater";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import connectDb from "@/lib/db";
import Grocery, { Igrocery } from "@/models/grocery.model";
import User from "@/models/user.model";
import { redirect } from "next/navigation";

export default async function Home(props: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  await connectDb();
  const session = await auth();
  const usercheck = await User.findById(session?.user?.id);
  if (!usercheck) {
    redirect("/login");
  }

  const result =
    !usercheck.mobile ||
    !usercheck.role ||
    (!usercheck.mobile && usercheck.role == "user");

  if (result) {
    return <EditRoleMobile />;
  }
  const plainUser = JSON.parse(JSON.stringify(usercheck));

  let groceryList: Igrocery[] = [];
  if (usercheck.role === "user") {
    if (searchParams.q) {
      groceryList = await Grocery.find({
        $or: [
          { name: { $regex: searchParams?.q || "", $options: "i" } },
          { category: { $regex: searchParams?.q || "", $options: "i" } },
        ],
      });
    }else{
        groceryList=await Grocery.find({})
    }
  }

  return (
    <>
      <Nav user={plainUser} />
      <GeoUpdater userId={plainUser._id} />
      {plainUser.role == "user" ? (
        <UserDashboard groceryList={groceryList}/>
      ) : plainUser.role == "admin" ? (
        <AdminDashboard />
      ) : (
        <DeliveryBoy />
      )}
      <Footer/>
    </>
  );
}
