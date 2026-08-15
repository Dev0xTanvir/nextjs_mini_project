"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const subscribePremium = async () => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not subscribe",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/subscription/create-checkout`,
    {
      method: "POST",
      headers: {
        cookie: `accesstoken=${accesstoken}`,
      },
    },
  );
  const result = await res.json();

  if (result.success && result.data.transctionurl) {
    redirect(result.data.transctionurl);
  }

  return result;
};
