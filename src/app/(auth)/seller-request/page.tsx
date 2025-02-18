"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

export default function page() {
  async function handleSubmit() {
    // const res = await sendEmail(formData);
    // if (res?.success) {
    //   toast.success(res.message);
    // } else {
    //   toast.error(res?.message);
    // }
  }
  return (
    <div className="flex flex-col gap-4 container my-16 mx-auto p-4 max-w-md bg-white shadow-md rounded-md">
      <h1>Request a Seller account</h1>
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

        <Button className="w-full" type="submit">
          Send Request
        </Button>
      </form>
    </div>
  );
}
