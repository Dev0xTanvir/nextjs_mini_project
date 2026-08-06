"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const registerfrom = () => {
  return (
    <form className="space-y-4">
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

        <button type="submit">Register</button>
      </Card>
    </form>
  );
};

export default registerfrom;
