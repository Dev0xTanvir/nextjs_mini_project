"use server";

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not subscribe",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/subscription/get-status`,
    {
      headers: {
        cookie: `accesstoken=${accesstoken}`,
      },
    },
  );
  const result = await res.json();

  return result;
};
