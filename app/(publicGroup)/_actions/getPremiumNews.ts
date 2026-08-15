"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async () => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not premium",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/premium`, {
    headers: {
      cookie: `accesstoken=${accesstoken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["premium-news"],
    },
  });
  const result = await res.json();
  return result;
};
