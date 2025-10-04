import Link from "next/link";
import CustomerList from "./CustomerList";

const Customer = () => {
  return (
    <div className="w-full px-[20px]">
      <Link
        href="notice/customer/inquiry-private"
        className="mt-[20px] flex h-[50px] w-full justify-center rounded-md bg-[#1EB87B] pt-[20px] font-[550] text-white"
      >
        1:1 문의하기
      </Link>

      <CustomerList />
    </div>
  );
};

export default Customer;
