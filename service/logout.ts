"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookiestore = await cookies();
  cookiestore.delete("accesstoken");
  cookiestore.delete("refreshtoken");

  revalidateTag("my-app", "max");
};
