import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { MainLogo, MoneyWithPiggy } from "@/assets";
import {
  ArrowRightIcon,
  ChevronLeft,
  CircleHelp,
  Lock,
  Mail,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { changePassword } from "@/hooks/AuthHandles";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    if (values.newPassword === values.confirmPassword) {
      const payload = {
        ...values,
        token, // this is the reset token
      };
      changePassword(payload, setIsSubmitting, () => {
        navigate("/login", { replace: true }); // Navigate to home and replace history
      });
    } else {
      toast("Passwords do not match.");
    }
  };

  return (
    <div className="flex">
      <div className="md:flex hidden flex-col justify-between items-center w-1/4 h-screen bg-gradient-to-t to-[#59599B] via-[#24243E] from-[#0F0C29] relative py-24 overflow-hidden">
        <div className="flex items-center gap-x-2 justify-center">
          <img src={MainLogo} alt="Logo" className="w-10" />
          <h2 className="font-bold text-white">Piggy365</h2>
        </div>
        <img
          src={MoneyWithPiggy}
          alt="MoneyPiggy"
          className="absolute left-28 top-1/5"
        />
        <div className="flex flex-col items-center w-[80%] gap-4 z-10">
          <h2 className="text-3xl font-bold text-white text-center">
            The Year of the Smart Piggy Bank
          </h2>
          <p className="text-[#BDBDBD] text-center text-sm leading-relaxed">
            A daily money-saving journey designed to help you build better
            habits, one small step at a time—for 365 days straight.
          </p>
        </div>
      </div>
      <div className="md:w-3/4 md:px-12 py-6 my-auto h-screen flex flex-col justify-between max-md:items-center">
        <div className="flex items-center justify-between">
          <a href="#" className="md:flex hidden items-center gap-x-2 text-sm">
            <ChevronLeft />
            <span className="hidden md:flex">Return Home</span>
          </a>
          <span className="flex items-center text-sm gap-2">
            <span>Not a member yet?</span>
            <Link to={"/"} className="font-bold">
              JOIN NOW
            </Link>
          </span>
        </div>
        <div className="form md:w-xl w-xs max-md:px-4 m-auto">
          <div className="flex flex-col py-4 gap-4 items-center">
            <h2 className="text-center font-bold uppercase md:text-2xl text-lg">
              Welcome Back to Piggy Power
            </h2>
            <p className="md:text-sm text-xs text-center uppercase w-3/4">
              Log in and pick up where your piggy left off!
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none text-sm"
                        >
                          {showNewPassword ? (
                            <span>HIDE</span>
                          ) : (
                            <span>SHOW</span>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pl-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none text-sm"
                        >
                          {showConfirmPassword ? (
                            <span>HIDE</span>
                          ) : (
                            <span>SHOW</span>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex items-center justify-between"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Unlocking...
                    <Spinner />
                  </>
                ) : (
                  <>
                    Unlock My Piggy <ArrowRightIcon />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-between max-md:gap-4">
          <p className="text-sm text-center">
            Copyright 2021 - 2022 FoxHub Inc. All rights Reserved
          </p>
          <span className="flex items-center text-sm gap-2">
            <CircleHelp />
            <a href="#">Need help?</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
