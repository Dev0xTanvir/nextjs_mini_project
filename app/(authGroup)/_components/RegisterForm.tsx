"use client";
import React, { useActionState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registeraction } from "../_actions/registerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {

  const [state, action, pending] = useActionState(registeraction, false);
  const router = useRouter();
  
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "registation successful");
      router.push("/login");
    }
    if (!state.success) {
      toast.error(state.message || "registation faield");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="name" type="text" placeholder="Enter your name" required />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <button type="submit">{pending ? "loading..." : "Register"}</button>
      </Card>
    </form>
  );
};

export default RegisterForm;
