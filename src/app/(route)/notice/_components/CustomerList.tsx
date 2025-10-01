import Icon from "@/components/Icon/Icon";
import Link from "next/link";
import { customerListObject } from "../_constant/customerListObject";

const CustomerList = () => {
  return (
    <>
      <h1 className="mt-[30px] text-[20px] font-semibold text-[#242424]">전체 문의 목록</h1>
      <div className="flex flex-col gap-3">
        {customerListObject.map((item) => (
          <Link
            href={`notice/customer/${item.id}`}
            className="w-full border-b border-b-[#E4E4E4] py-[24px] hover:bg-gray-100"
          >
            <div>
              <div className="mb-2 flex items-center gap-3">
                <p className="rounded-[4px] bg-emerald-100 px-2 py-[2px] text-[12px] text-emerald-700">
                  {item.category}
                </p>
                <h2 className="u-ellipsis text-[16px] font-semibold text-[#242424]">
                  {item.title}
                </h2>
              </div>

              <div className="mb-2 flex items-center gap-3 text-[13px] text-[#5D5D5D]">
                <span>작성자1</span>
                <span className="text-[#9D9D9D]">3일전</span>
              </div>

              <div className="mt-1 flex gap-4 text-[13px] text-[#9D9D9D]">
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={16} /> 24
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={16} /> 12
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CustomerList;
