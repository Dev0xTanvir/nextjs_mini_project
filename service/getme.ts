"use server";

import { cookies } from "next/headers";

export const getme = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accesstoken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/users/getme`, {
    headers: {
      cookie: `accesstoken=${accessToken}`,
    },
  });

  const result = await res.json();

  return result;
};
