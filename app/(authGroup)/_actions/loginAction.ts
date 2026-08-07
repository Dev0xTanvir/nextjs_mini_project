"use server";

type loginstate = {
  success: boolean;
  statuscode: number;
  massege: string;
  data: {
    accesstoken: string;
    refreshtoken: string;
  };
};

export const loginaction = async (
  prevstate: loginstate,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};
