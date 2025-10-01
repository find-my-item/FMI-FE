import Link from "next/link";
import CustomerList from "./CustomerList";

const Customer = () => {
  return (
    <div className="w-full px-[20px]">
      <Link href="notice/customer/inquiry-private" className="flex justify-center pt-[20px]">
        <button className="h-[50px] w-full rounded-md bg-[#1EB87B] font-[550] text-white">
          1:1 문의하기
        </button>
      </Link>

      <CustomerList />
    </div>
  );
};

export default Customer;
