export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/issues/:path*"], // protecting all paths starting from /issues
  matcher: ["/issues/new", "/issues/:id/edit"],

  // can protect all api routes as well - '/api/:path*
};
