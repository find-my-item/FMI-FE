import Link from "next/link";
import CustomerList from "./CustomerList";
import clsx from "clsx";

const Customer = () => {
  return (
    <div className="w-full px-[20px]">
      <Link
        href="notice/customer/inquiry-private"
        className={clsx(
          "mt-[20px] flex h-[50px] w-full items-center justify-center rounded-md bg-[#1EB87B] font-[550] text-white"
        )}
      >
        1:1 문의하기
      </Link>

      <CustomerList />
    </div>
  );
};

export default Customer;
