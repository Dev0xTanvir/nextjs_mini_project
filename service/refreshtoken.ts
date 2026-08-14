"use server";

import { cookies } from "next/headers";

export const getaccesstoken = async () => {

  const cookiestore = await cookies();

  const refreshtoken = cookiestore.get("refreshtoken")?.value || null;

  if (!refreshtoken) {
    return {
      success: false,
      message: "refreshtoken not found",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh_token`, {
    method: "POST",
    headers: {
      cookie: `refreshtoken=${refreshtoken}`,
    },
    cache: "no-cache",
  });

  const result = await res.json();

  return result;
};
