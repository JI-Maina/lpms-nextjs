// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "./app/api/auth/[...nextauth]/options";
// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(request: NextRequestWithAuth) {
//     //   console.log(request.nextUrl.pathname);
//     //   console.log(request.nextauth.token);
//     console.log(request.nextauth.token?.user.user_role);
//     if (request.nextauth.token?.user.user_role === "owner") {
//       return NextResponse.rewrite(new URL("/police", request.url));
//     }
//   },
//   { callbacks: { authorized: ({ token }) => !!token } }
// );
export { default } from "next-auth/middleware";

export const config = { matcher: ["/managers/:path*", "/tenants/:path*"] };

// export async function middleware(request: NextRequest) {
//     const session = await getServerSession(authOptions);

//     if (session?.user) {
//         return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL('/auth/login', request.url));
// }
