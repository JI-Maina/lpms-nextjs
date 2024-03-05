// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "./app/api/auth/[...nextauth]/options";

export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//     const session = await getServerSession(authOptions);

//     if (session?.user) {
//         return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL('/auth/login', request.url));
// }

export const config = { matcher: ["/home/:path*"] };
