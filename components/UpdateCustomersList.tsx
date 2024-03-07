"use client";
import clientSessionId from "@/app/lib/getSessionClient";
interface CustomerListUpdate {
  customerClientListUpdate: () => void;
}

const UpdateCustomersList = () => {
  const customerClientListUpdate = async () => {
    try {
      // const session = await getServerSession();
      // console.log(session?.user?.email);
      const res = await fetch("http://localhost:3000/api/lemonSquezze", {
        method: "GET",
      });
      console.log(await res.json());
    } catch (err) {}
  };
  return (
    <button
      onClick={customerClientListUpdate}
      className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px]"
    >
      Update List
    </button>
  );
};

export default UpdateCustomersList;
