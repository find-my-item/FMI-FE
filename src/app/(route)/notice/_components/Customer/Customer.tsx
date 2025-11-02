import Link from "next/link";
import CustomerList from "../CustomerList/CustomerList";

const Customer = () => {
  return (
    <div className="w-full px-[20px]">
      <Link
        href="notice/customer/inquiry-private"
        className="mt-[20px] h-[50px] w-full rounded-md bg-[#1EB87B] font-[550] text-white flex-center"
      >
        1:1 문의하기
      </Link>

      <CustomerList />
    </div>
  );
};

export default Customer;
