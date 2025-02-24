"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OctagonAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
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
    <div className="flex flex-col gap-4 container w-[90%] p-8 my-16 max-w-md bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold">Sign-in </h1>
      <div className="text-yellow-500 flex items-center gap-1 text-sm">
        <OctagonAlert className="size-4" />
        <p>for Re-sellers only</p>
      </div>
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
        <Suspense>
          <Button disabled={pending} className="w-full" type="submit">
            {pending ? "loading..." : "Submit request"}
          </Button>
        </Suspense>
      </form>
      <div className="text-center ">
        <Button asChild variant="link" className="text-gray-500">
          <Link href="/sign-up" className="text-xs flex flex-wrap ">
            if you don&apos;t have an account!{" "}
            <span>submit your request here.</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
