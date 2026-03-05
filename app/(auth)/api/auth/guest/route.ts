import { isDevelopmentEnvironment } from "@/lib/constants";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  try {
    console.log("Testing environment variables...");
    console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);
    console.log("POSTGRES_URL exists:", !!process.env.POSTGRES_URL);
    
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: !isDevelopmentEnvironment,
    });

    if (token) {
      console.log("User already has token, redirecting to:", redirectUrl);
      // return NextResponse.redirect(new URL(redirectUrl, request.url));
   return NextResponse.redirect(new URL("/", request.url));
    }

    // console.log("Attempting to import signIn...");
    // const { signIn } = await import("@/app/(auth)/auth");
    // // console.log("signIn imported successfully");
    
    // // console.log("Attempting guest sign in with redirectUrl:", redirectUrl);
    // const result = await signIn("guest", { redirect: true, redirectTo: redirectUrl });
    // // console.log("Guest sign in result:", result);
    // return result;

    console.log("No token found, redirecting to NextAuth signin endpoint");
    // Redirect to NextAuth's signin endpoint with guest provider
    const signinUrl = new URL("/api/auth/signin", request.url);
    signinUrl.searchParams.set("provider", "guest");
    signinUrl.searchParams.set("callbackUrl", redirectUrl);
    
    console.log("Redirecting to:", signinUrl.toString());
    return NextResponse.redirect(signinUrl);
  } catch (error) {
    console.error("Error in guest auth route:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
