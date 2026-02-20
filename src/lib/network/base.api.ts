// base.api.ts
const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export const apiRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
) => {
  let fullUrl = `${baseUrl}${url}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (method === "GET" && data) {
    const query = new URLSearchParams(data).toString();
    fullUrl += `?${query}`;
  } else if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData.detail ||
      errorData.error ||
      `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

// Simplified export for your GET requests
export const get = (url: string, params?: any) =>
  apiRequest(url, "GET", params);
export const post = (url: string, data: any) => apiRequest(url, "POST", data);
