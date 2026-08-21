"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

type loginstate = {
  success: boolean;
  statuscode: number;
  massege: string;
  data: {
    accesstoken: string;
    refreshtoken: string;
  };
};

export const loginaction = async (
  redirectTo: string,
  prevstate: loginstate,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookiestore = await cookies();

    cookiestore.set("accesstoken", result.data.accesstoken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookiestore.set("refreshtoken", result.data.refreshtoken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  const decodetoken = jwt.decode(result.data.accesstoken) as JwtPayload;

  if (
    redirectTo &&
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    redirect(redirectTo);
  }

  if (decodetoken.role === "ADMIN") {
    redirect("/admin-dashboard");
  } else if (decodetoken.role === "USER") {
    redirect("/dashboard");
  } else if (decodetoken.role === "AUTHOR") {
    redirect("author-dashboard");
  }

  console.log(decodetoken);

  return result;
};
