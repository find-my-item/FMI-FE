"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { FormValue } from "../types/FormData";
import Input from "@/app/components/common/Input/Input";

const InputStyle = "w-[330px] h-[40px] px-3 py-3 m-2 border rounded-[3px]";

const Page = () => {
  return (
    <div>
      <input type="text" className={InputStyle} />
      <input type="text" className={InputStyle} />
      <button>로그인</button>
      <input type="ckeckbox" />

    </div>
  )
};

export default Page;
