import UserLogin from "@/components/user/UserLogin";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <UserLogin />
      </Suspense>
    </div>
  );
};

export default LoginPage;
