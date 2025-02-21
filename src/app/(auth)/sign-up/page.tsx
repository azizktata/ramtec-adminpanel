"use client";
import { checkUserAccount } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/utils/sendEmail";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function Page() {
  const { pending } = useFormStatus();
  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const res = await checkUserAccount(email);
    if (res?.success) {
      toast.error("you already have an account");

      return;
    }

    const [sellerEmailResponse, adminMailResponse] = await Promise.all([
      await sendEmail({
        email: email,
        text: `Hello ${name},\n\nYour account request has been sent successfully.`,
        sujet: "Account request",
      }),
      await sendEmail({
        text: ` New seller account request submission has been made. here is seller info: \n\n email:${email} \n name:${name} \n phone:${phone} \n address:${address} \n company:${company} `,
        sujet: "New Seller account request",
      }),
    ]);
    if (sellerEmailResponse?.success && adminMailResponse?.success) {
      toast.success("your account request has been sent successfully");
    } else {
      toast.error("Error sending email. Please try again.");
    }
  }
  return (
    <div className="flex flex-col gap-4 container w-[90%] p-8 my-16 mx-auto  max-w-md bg-white shadow-md rounded-md">
      <h1 className="text-lg font-semibold">Submit to request an account</h1>
      <div className="text-yellow-500 flex items-center gap-1 text-sm">
        <OctagonAlert className="size-4" />
        <p>for Re-sellers only</p>
      </div>
      <form action={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            company name
          </Label>
          <Input
            type="text"
            name="company"
            id="company"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            address
          </Label>
          <Input
            type="text"
            name="address"
            id="address"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label className="block text-sm font-medium text-gray-700">
            phone
          </Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                "
          />
        </div>

        <Button disabled={pending} className="w-full" type="submit">
          {pending ? "loading..." : "Submit request"}
        </Button>
      </form>
      <div className="text-center">
        <Button
          asChild
          variant="link"
          className="text-xs flex flex-wrap text-gray-500"
        >
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
