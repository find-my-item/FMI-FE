import { customerListObject } from "../_constant/customerListObject";
import CustomerItem from "./CustomerItem";

const CustomerList = () => {
  return (
    <>
      <h1 className="mt-[30px] text-[20px] font-semibold text-[#242424]">전체 문의 목록</h1>
      <div className="flex flex-col gap-3">
        {customerListObject.map((item) => (
          <CustomerItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default CustomerList;
