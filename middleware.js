
export async function middleware(request) {
  console.log("middleware.ts called");
  console.log("Middleware called:", request.url); // should appear in terminal
}

// Match everything
export const config = {
  matcher: "/",
};
