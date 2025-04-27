import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { handleLogIn } from "@/hooks/AuthHandles";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";
import AuthBottomText from "../AuthBottomText";
import { loginSchema } from "@/schema/schema";

const LogIn = () => {
  const { setUser } = useUser() || {};
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailorName: "",
      password: "",
    },
  });

  const onSubmit = (values) =>
    handleLogIn(values, setIsSubmitting, navigate, setUser);

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
      <div className="md:w-3/4 w-full md:px-12 py-6 my-auto md:h-screen h-[40rem] flex flex-col justify-between max-md:items-center">
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
                name="emailorName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Email or Name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pl-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none text-sm"
                        >
                          {showPassword ? <span>HIDE</span> : <span>SHOW</span>}
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
              <div className="flex flex-col gap-4">
                <h4 className="max-md:text-sm">
                  🔐 Trouble Cracking the Vault?
                </h4>
                <p className="max-md:text-xs">
                  Don’t worry—your piggy’s still safe! Let’s{" "}
                  <Link to={"/reset-password"} className="underline px-1">
                    reset your password
                  </Link>
                  and get you saving again.
                </p>
              </div>
            </form>
          </Form>
        </div>
        <AuthBottomText />
      </div>
    </div>
  );
};

export default LogIn;
