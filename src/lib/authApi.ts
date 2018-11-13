import { encode } from "base-64";
import { push } from "connected-react-router";

import { getAsync } from "lib/http";
import { clearToken, getToken } from "lib/sessionStorageApi";

import { logout } from "login/actions";

export const getTokenAsync = (
  userName: string,
  password: string
): Promise<string> =>
  getAsync("api/token", {
    Authorization: `Basic ${encode(userName + ":" + password)}`
  });

export const deleteTokenAndRedirectLogin = () => {
  clearToken();
  return [logout(), push("/login")];
};

export const isUserAuthenticated = () => {
  // attempt to grab the token from localstorage
  const jwtToken = getToken();

  // if it exists
  if (jwtToken != null) {
    // compare the total seconds of the created
    // time of the token vs the ttl (time to live) seconds
    const expiry = jwtToken.createdAt + parseInt(process.env.TIME_TO_LIVE!, 10);

    // if the token has expired return false
    if (jwtToken.createdAt > expiry) {
      clearToken();
      return false;
    }

    return true;
  }

  return false;
};
