import ForgetPassword from "@/components/ForgetPassword";
import React, { Suspense } from "react";

const ForgetPasswordpage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetPassword />
      </Suspense>
    </div>
  );
};

export default ForgetPasswordpage;
