"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


// importing necessary functions
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const login = () => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    if (!errors.email && !errors.password) {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // display toaster here
      if(response.error){
        toast.error('Invalid credentials');
      }

      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 403
      ) {
        console.log("Invalid Credentials!");
        // display toaster here

      } else if (response.status === 500) {
        console.log("Server error!");
        // display toaster here
      
      } else {
        toast.success("Logged in successfully")
        router.push("/car-details")
      }
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center  bg-white">
      <Toaster />
      <div className="top-0 left-0 -translate-y-1/2 -translate-x-1/2 absolute h-[400px] w-[400px] bg-gradient-to-r from-violet-600 to-aqua-700 rounded-full z-10"></div>
      <div className="absolute h-[100dvh] w-full bg-gradient-to-br from-white/30 to-violet-400/50 z-20 backdrop-blur-3xl"></div>
      <div className="relative z-30 max-w-[500px] w-full flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-normal text-slate-900">
          <span className="font-bold text-violet-700">Login</span>
        </h1>
        <p className="text-lg font-normal text-zinc-600 mb-10">
          Please enter your Email & Password
        </p>
        <form
          className="w-full text-left flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormItem className="relative">
            <Label className="font-bold text-base" htmlFor="email">
              Email
            </Label>
            <Input
              autocomplete={"off"}
              id={"email"}
              className="min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6"
              type="text"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-rose-600 font-normal text-sm absolute bottom-1">
                {errors.email.message}
              </span>
            )}
          </FormItem>
          <FormItem className="relative">
            <Label className="font-bold text-base" htmlFor="password">
              Password
            </Label>
            <Input
              id={"password"}
              className="min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6"
              type={passwordVisible ? "password" : "text"}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-rose-600 font-normal text-sm absolute bottom-1">
                {errors.password.message}
              </span>
            )}
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute top-[34px] z-10 right-3"
            >
              {passwordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </FormItem>
          <Button
            className="mt-2 text-lg font-bold min-h-14 rounded-full"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default login;
