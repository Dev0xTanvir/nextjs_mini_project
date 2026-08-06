"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const loginFrom = () => {
  return (
    <form className="space-y-4">
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
        <button type="submit">Login</button>
      </Card>
    </form>
  );
};

export default loginFrom;
