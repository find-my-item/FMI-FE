// 공용 컴포넌트 예시

import Tab from "@/app/components/common/Tab";

const page = () => {
  return (
    <div className="w-full h-[100vh] bg-gray-600 gap-4 flex-col-center">
      <Tab />
      <Tab />
      <Tab />
      <Tab />
    </div>
  );
};

export default page;
