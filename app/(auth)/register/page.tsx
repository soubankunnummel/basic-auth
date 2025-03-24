"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordField } from "@/components/ui/password-field";
import { useAdminRegister } from "@/hooks/useAuth";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { CustomError } from "@/types/User";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
   
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be at least 8 characters long, include at least one letter, one number, and one special character.",
      }
    ),
    // confirm_password: z.string(),
  })
//   .superRefine((data, ctx) => {
//     if (data.password !== data.confirm_password) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Passwords do not match",
//         path: ["confirm_password"],
//       });
//     }
//   });

export default function Register() {


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          name: "",
          password: "",
        },
      });

      const router = useRouter();

      const registerMutaioin = useAdminRegister();
      // Handle form submission
      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
          const response = await registerMutaioin.mutateAsync(values);
          console.log(response);
          toast.success("Register Success");
          setTimeout(() => router.push("/login"), 2000);
        } catch (error) {
          const customError = error as CustomError;
          toast.error(customError.response?.data?.message || "Registration failed.");
        }
      } 
  return (
    <div className="flex justify-center items-center  h-screen">
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/2 p-10 border rounded-xl shadow-lg">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              

              <PasswordField form={form} name="password" label="Password" />
              {/* <PasswordField
                form={form}
                name="confirm_password"
                label="Confirm Password"
              /> */}

              <div className="flex flex-col items-center gap-4 mt-6">
                <Button
                  type="submit"
                  className="font-bold text-xl rounded-xl bg-[#199FB1] hover:bg-[#168a99]"
                  size={"lg"}
                >
                 {form.formState.isSubmitting ? <Spinner className="text-white"/> : "Create Account"}
                </Button>
                <p className="text-base font-medium text-[#7CB5EC] cursor-pointer">
                <Link href="/login">Already have an account?</Link>
                </p>
              </div>
            </form>
          </Form>
    </div>
  )
}
