import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtutils } from "./lib/jwt";
import { getaccesstoken } from "./service/refreshtoken";
import { getSubscriptionStatus } from "./app/(publicGroup)/_actions/subscribePremium";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookiestore = await cookies();

  let accesstoken = cookiestore.get("accesstoken")?.value;
  const refreshtoken = cookiestore.get("refreshtoken")?.value;

  let decodeaccesstoken = accesstoken
    ? jwtutils.verifytoken(accesstoken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decoderefreshtoken = refreshtoken
    ? jwtutils.verifytoken(
        refreshtoken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  // ============================================
  // Refresh access token
  // ============================================

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

      decodeaccesstoken = jwtutils.verifytoken(
        newaccesstoken,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  // ============================================
  // Remove invalid access token
  // ============================================

  if (!decodeaccesstoken?.success) {
    cookiestore.delete("accesstoken");
    accesstoken = undefined;
  }

  // ============================================
  // Get user role
  // ============================================

  let userrole: string | null = null;

  if (decodeaccesstoken?.success && decodeaccesstoken.data) {
    userrole = (decodeaccesstoken.data as JwtPayload).role;
  }

  // ============================================
  // Public routes
  // ============================================

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // ============================================
  // Logged-in user trying login/register
  // ============================================

  if (accesstoken && AUTH_ROUTES.includes(pathname)) {
    if (userrole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (userrole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    if (userrole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  // ============================================
  // Authentication protection
  // ============================================

  if (!accesstoken && !isPublic) {
    const requestUrl = new URL("/login", request.url);

    requestUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(requestUrl);
  }

  // ============================================
  // Authorization
  // ============================================

  if (pathname.startsWith("/dashboard")) {
    if (userrole !== "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin-dashboard")) {
    if (userrole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/author-dashboard")) {
    if (userrole !== "AUTHOR") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ============================================
  // Premium route
  // ============================================

  if (pathname === "/premium") {
    const getstatusResult = await getSubscriptionStatus();

    const isActive = Boolean(
      getstatusResult?.success && getstatusResult.data?.isstatus,
    );

    if (!isActive) {
      return NextResponse.redirect(new URL("/payment", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
