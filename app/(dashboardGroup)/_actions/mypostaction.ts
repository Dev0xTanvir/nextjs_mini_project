"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type poststate = {
  success: boolean;
  statuscode: number;
  massege: string;
  data: {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    status: "PUBLISHED" | "DRAFT";
    tags: string[];
    views: number;
    isPremium: boolean;
    authorId: string;
  };
};

export const createpost = async (prevstate: poststate, formData: FormData) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/post`, {
    method: "POST",
    headers: {
      cookie: `accesstoken=${accesstoken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};

//---------------------------------------

export const getmyposts = async () => {
  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/post/my-posts`, {
    headers: {
      cookie: `accesstoken=${accesstoken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-posts"],
    },
  });

  const result = await res.json();

  return result;
};

//--------------------------------------

export const updatepost = async (
  postId: string,
  prevstate: poststate,
  formData: FormData,
) => {
  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
    tags: (formData.get("tags") as string).split(", ") ?? "",
    isPremium: formData.get("isPremium") === "on",
  };

  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
    method: "PATCH",
    headers: {
      cookie: `accesstoken=${accesstoken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};

//----------------------------------------

export const deletepost = async (postId: string) => {

  const cookiestore = await cookies();

  const accesstoken = cookiestore.get("accesstoken")?.value;

  if (!accesstoken) {
    return {
      success: false,
      message: "user not login",
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
    method: "DELETE",
    headers: {
      cookie: `accesstoken=${accesstoken}`,
    },
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};
