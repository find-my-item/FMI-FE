import { Icon } from "@/components";
import { cn } from "@/utils";
import { MYPAGE_MENU_LIST } from "../../_constants/MYPAGE_MENU_LIST";
import Link from "next/link";

type menuType = "내 활동" | "알림" | "신고/문의" | "계정 설정";

const MyPageMenuITem = (menu: menuType) => {
  const MenuList = MYPAGE_MENU_LIST[menu];
  return (
    <>
      {MenuList.map((item) => (
        <Link
          href={`/${item.pageName}`}
          className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
        >
          {item.pageName}
          <Icon name="ArrowRightSmall" size={24} />
        </Link>
      ))}
    </>
  );
};

const MyPageMenuSection = () => {
  // const MenuList = MYPAGE_MENU_LIST[menu];

  return (
    <div>
      {MYPAGE_MENU_LIST.map((item) => (
        <>
          <div className="w-full px-5 py-6">
            <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
              {item}
            </div>
            {/* {MenuList.map((item) => (
              <Link
                href={`/${item.pageName}`}
                className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
              >
                {item.pageName}
                <Icon name="ArrowRightSmall" size={24} />
              </Link>
            ))} */}
            <MyPageMenuITem menu={item} />
          </div>
          <hr
            className={cn(
              "mx-5 max-w-full border border-divider-default_3",
              item === "계정 설정" && "opacity-0"
            )}
          />
        </>
      ))}
    </div>
  );
};

export default MyPageMenuSection;

// {
//   MENU_LIST.map((menu) => (
//     <>
//                     <div className="w-full px-5 py-6">
//                       <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
//                         {menu}
//                       </div>

//                       {MenuList.map((item) => (
//                         <Link
//                           href={`/${item.pageName}`}
//                           className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
//                         >
//                           {item.pageName}
//                           <Icon name="ArrowRightSmall" size={24} />
//                         </Link>
//                       ))}
//                     </div>
//                     <hr
//                       className={cn(
//                         "mx-5 max-w-full border border-divider-default_3",
//                         item === "계정 설정" && "opacity-0"
//                       )}
//                     />
//     </>
//   ))
// }
