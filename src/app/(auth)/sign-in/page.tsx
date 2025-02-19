"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (res?.error) {
        toast.error(`Sign-in failed: Please check your credentials`);
      } else {
        toast.success("Sign-in successful!");
        router.push("/");
      }
    } catch {
      toast.error("Sign in failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 my-16 max-w-md bg-white shadow-md rounded-md">
      <h1>Sign-in for Sellers only</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <Button disabled={pending} className="w-full" type="submit">
          {pending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-up" className="text-xs">
            if you don&apos;t have an account! submit your request here.
          </Link>
        </Button>
      </div>
    </div>
  );
}
