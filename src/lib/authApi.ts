import { encode } from "base-64";
import { push } from "connected-react-router";
import { from, Observable } from "rxjs";

import { TIME_TO_LIVE } from "lib/constants";
import { getAsync } from "lib/http";
import { clearToken, getToken } from "lib/sessionStorageApi";

import { logout } from "login/actions";

export const getTokenAsync = (
  userName: string,
  password: string
): Observable<string> =>
  from(
    getAsync("api/token", {
      Authorization: `Basic ${encode(userName + ":" + password)}`
    })
  );

export const deleteTokenAndRedirectLogin = () => {
  clearToken();
  return [logout(), push("/login")];
};

export const isUserAuthenticated = () => {
  // attempt to grab the token from localstorage
  const jwtToken = getToken();

  // if it exists
  if (jwtToken) {
    // compare the total seconds of the created
    // time of the token vs the ttl (time to live) seconds
    const expiry = jwtToken.createdAt + TIME_TO_LIVE;

    // if the token has expired return false
    if (jwtToken.createdAt > expiry) {
      clearToken();
      return false;
    }

    return true;
  }

  return false;
};
