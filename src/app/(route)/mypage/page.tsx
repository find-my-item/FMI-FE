import MyPageProfile from "./_components/MyPageProfile/MyPageProfile";
import MyPageIconNav from "./_components/MyPageIconNav/MyPageIconNav";
import MyPageMenuSection from "./_components/MyPageMenuSection/MyPageMenuSection";

const page = () => {
  return (
    <div className="flex w-full flex-col">
      <MyPageProfile email="abc@gmail.com" userName="사용자 닉네임" />
      <MyPageIconNav />
      <MyPageMenuSection />

      {/* {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))} */}
    </div>
  );
};

export default page;
