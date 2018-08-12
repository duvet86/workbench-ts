import { BASE_URL, TENANT_ID } from "lib/constants";
import { getToken } from "lib/sessionStorageApi";

const getJwtToken = (): string => {
  const tokenInfo = getToken();
  const token = tokenInfo && tokenInfo.token;
  if (token == null) {
    throw new Error("Missing token.");
  }

  return token;
};

const getJwtHeaders = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`
});

const getHeader = (): HeadersInit => {
  const token = getJwtToken();

  return {
    ...getJwtHeaders(token),
    "Content-Type": "application/json",
    section: TENANT_ID
  };
};

const handleErrors = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw { status: response.status, error: error && JSON.parse(error) };
  }

  const res = await response.text();

  try {
    return (res && JSON.parse(res)) || {};
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
    throw {
      error: e.toString(),
      status: "javascript error",
      tip: "Have you changed the BASE_URL in the constants file?"
    };
  }
};

export const getAsync = async (
  url: string,
  headers: HeadersInit
): Promise<any> => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    headers,
    method: "GET"
  });

  return handleErrors(response);
};

export const postAsync = async (
  url: string,
  data: any,
  headers: HeadersInit
): Promise<any> => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    body: JSON.stringify(data),
    headers,
    method: "POST"
  });

  return handleErrors(response);
};

export const getWithJwtAsync = (url: string): Promise<any[]> =>
  getAsync(url, getHeader());

export const postWithJwtAsync = (url: string, data?: any): Promise<any> =>
  postAsync(url, data, getHeader());
