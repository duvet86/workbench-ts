import { TOKEN_KEY } from "lib/constants";

interface IToken {
  createdAt: number;
  token: string;
  isExpired: boolean;
}

export const storeToken = (token: string) =>
  sessionStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      createdAt: Math.floor(Date.now() / 1000),
      token,
      isExpired: false
    })
  );

// clearToken doesn't really delete the token. It sets an expiry flag.
// Because same Apis happen on componentWillUnmount (see CanvasContainer)
// and if a user logs out at that time the page will break not having the token
// to execute the action.
export const clearToken = () => {
  const token = getToken();
  sessionStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      ...token,
      isExpired: true
    })
  );
};

export const getToken = (): IToken | null => {
  const tokenKey = sessionStorage.getItem(TOKEN_KEY);
  if (!tokenKey) {
    return null;
  }

  return JSON.parse(tokenKey);
};
