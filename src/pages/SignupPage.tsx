
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignupModal from "@/components/auth/SignupModal";
import { signupSchema } from "../lib/Validation";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-300">
      <SignupModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100 flex flex-col space-y-4 p-4">
          <input {...register("username")} placeholder="Tên tài khoản" className="border p-2 rounded" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input {...register("email")} placeholder="Email" className="border p-2 rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input type="password" {...register("password")} placeholder="Mật khẩu" className="border p-2 rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Đăng ký</button>
        </form>
      </SignupModal>
    </div>
  );
};

export default Signup;
