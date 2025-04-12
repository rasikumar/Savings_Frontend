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
import { ArrowRightIcon, ChevronLeft, CircleHelp, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { Link, useNavigate } from "react-router";
import { verifyOtp } from "@/hooks/AuthHandles";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  otp: z.string(),
});
const VerifyOtp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values) => verifyOtp(values, setIsSubmitting, navigate);

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
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                    OTP Verifying...
                    <Spinner />
                  </>
                ) : (
                  <>
                    Verify OTP <ArrowRightIcon />
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

export default VerifyOtp;
