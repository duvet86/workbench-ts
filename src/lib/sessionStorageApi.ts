import { TOKEN_KEY } from "lib/constants";

interface IToken {
  createdAt: number;
  token: string;
}

export const storeToken = (token: string) =>
  sessionStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      createdAt: Math.floor(Date.now() / 1000),
      token
    })
  );

export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

export const getToken = (): IToken | null => {
  const tokenKey = sessionStorage.getItem(TOKEN_KEY);
  if (!tokenKey) {
    return null;
  }

  return JSON.parse(tokenKey);
};
