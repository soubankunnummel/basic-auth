"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAdminLogin } from "@/hooks/useAuth";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
// import { CustomError } from "@/types/user";
import { PasswordField } from "@/components/ui/password-field";
import { Spinner } from "@/components/ui/spinner";
import { CustomError } from "@/types/User";
import Cookies from "js-cookie";

// Define your form schema with validation
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Login() {
  const router = useRouter();
  // Initialize form with validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  interface FormValues {
    email: string;
    password: string;
  }
  const loginMutaioin = useAdminLogin();

  async function onSubmit(values: FormValues) {
    console.log(values);
    try {
      const response = await loginMutaioin.mutateAsync(values);
      toast.success("Login Success");
      Cookies.set("tokens", response.token); 
      localStorage.setItem("token", response.token);
      setTimeout(() => router.push("/"), 2000);
      console.log(response);
     
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.response?.data?.message || "Login failed.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 border p-10 rounded-xl shadow-lg">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordField form={form} name="password" label="Password" />

              <p className="text-[#7F7F7F] font-normal text-sm text-center ">
                Forgot Password
              </p>

              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className=" font-bold text-xl rounded-xl bg-[#199FB1] hover:bg-[#168a99] text-center "
                  size={"lg"}
                >
                  {loginMutaioin.isPending ? <Spinner /> : "Login"}
                </Button>
              </div>
              <p className="text-base font-medium  text-[#7CB5EC] text-center mt-14 cursor-pointer">
                <Link href="/register">Create New Account</Link>
              </p>
            </form>
          </Form>
    </div>
  );
}
