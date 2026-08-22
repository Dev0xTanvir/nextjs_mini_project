"use server";

import { jwtutils } from "@/lib/jwt";
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

//--------------------------------

export const createaccessToken = async () => {
  const cookiestore = await cookies();

  let accesstoken = cookiestore.get("accesstoken")?.value;
  const refreshtoken = cookiestore.get("refreshtoken")?.value;

  if (!accesstoken && !refreshtoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const decodeaccesstoken = accesstoken
    ? jwtutils.verifytoken(accesstoken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decoderefreshtoken = refreshtoken
    ? jwtutils.verifytoken(
        refreshtoken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodeaccesstoken?.success && decoderefreshtoken?.success) {
    const result = await getaccesstoken();

    if (result.success) {
      const newaccesstoken = result.data.accesstoken;

      cookiestore.set("accesstoken", newaccesstoken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accesstoken = newaccesstoken;
    }
  }
  return accesstoken
};
