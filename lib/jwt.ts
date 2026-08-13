/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

// token verify function

const verifytoken = (token: string, secret: string) => {
  try {
    const verifyedtoken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifyedtoken,
    };
  } catch (error: any) {
    console.log("token verification failed", error);
    return {
      success: false,
      error: error.massege,
    };
  }
};

export const jwtutils = {
  verifytoken,
};
