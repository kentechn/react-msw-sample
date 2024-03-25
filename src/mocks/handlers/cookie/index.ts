import { HttpResponse, http } from "msw";

// cookie取得解説用Api（利用なし）
export const cookieTestHandler = http.get("resource", async ({ cookies }) => {
  console.log(cookies.mySecret);
  return HttpResponse.json(null, {
    status: 201,
    statusText: "success",
    headers: {
      "Set-Cookie": "mySecret=abc-123",
    },
  });
});
