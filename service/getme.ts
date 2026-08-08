"use server";

import { cookies } from "next/headers";

export const getme = async () => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/users/getme`, {
    headers: {
      cookie: `accesstoken=${accesstoken}`,
    },
  });

  const result = await res.json();

  return result;
};
