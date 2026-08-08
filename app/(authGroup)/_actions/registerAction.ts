"use server";

type registation = {
  success: boolean;
  statuscode: number;
  massege: string;
};

export const registeraction = async (
  prevState: registation,
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return {
      success: false,
      statuscode: 400,
      message: "Passwords do not match",
    };
  }

  const payload = {
    name,
    email,
    password,
    confirmPassword
  };

  const res = await fetch(`${process.env.BACKEND_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  const result = await res.json();

  return result;
};
