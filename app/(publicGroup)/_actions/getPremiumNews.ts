"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not premium",
    };
  }

  // Convert searchParams object to query string
  const searchParams = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(key, item);
        });
      } else if (value !== undefined) {
        searchParams.set(key, value);
      }
    });
  }

  const queryString = searchParams.toString();

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/premium${
      queryString ? `?${queryString}` : ""
    }`,
    {
      headers: {
        cookie: `accesstoken=${accesstoken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["premium-news"],
      },
    },
  );

  const result = await res.json();

  return result;
};
