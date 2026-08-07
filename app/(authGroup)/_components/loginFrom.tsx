"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { loginaction } from "../_actions/loginAction";
import { toast } from "sonner";

const LoginFrom = () => {
  const [state, action, pending] = useActionState(loginaction, false);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "user login successful");
    }
    if (!state.success) {
      toast.error(state.message || "user login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="enter our email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="enter our password"
          required
        />
        <button type="submit">
          {pending ? "submiting..." : "Login"}
        </button>
      </Card>
    </form>
  );
};

export default LoginFrom;
