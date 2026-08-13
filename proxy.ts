import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtutils } from "./lib/jwt";

const AUTH_ROUTHS = ["/login", "/register"];
const PUBLIC_ROUTHS = ["/", "/news", "/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // get cookie

  const cookiestore = await cookies();
  const accesstoken = cookiestore.get("accesstoken")?.value;

  const decodetoken = accesstoken
    ? jwtutils.verifytoken(accesstoken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let userrole = null;

  if (!decodetoken?.success) {
    cookiestore.delete("accesstoken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodetoken?.success && decodetoken.data) {
    userrole = (decodetoken.data as JwtPayload).role;
  }

  // user all ready login but user try login & register redirect dashboard rootroute and home page

  if (accesstoken && AUTH_ROUTHS.includes(pathname)) {
    if (userrole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userrole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userrole === "author") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublic = PUBLIC_ROUTHS.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  //Authencatied page protection not authorization

  if (!accesstoken && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authorization : roll based access control

  if (pathname.startsWith("/dashboard") && userrole !== "USER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userrole !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userrole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/author-dashboard", request.url));
  }

  //return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
