import { encode } from "base-64";
import { push } from "connected-react-router";
import { from, Observable } from "rxjs";

import { getAsync } from "lib/http";
import { removeToken, getToken } from "lib/sessionStorageApi";

import { logout } from "login/actions";

export const getTokenObs = (
  userName: string,
  password: string
): Observable<string> =>
  from(
    getAsync("api/token", {
      Authorization: `Basic ${encode(userName + ":" + password)}`
    })
  );

export const deleteTokenAndRedirectLogin = () => {
  removeToken();
  return [logout(), push("/login")];
};

export const isUserAuthenticated = () => {
  // attempt to grab the token from localstorage
  const jwtToken = getToken();

  // if it exists
  if (jwtToken && !jwtToken.isExpired) {
    // compare the total seconds of the created
    // time of the token vs the ttl (time to live) seconds
    const expiry = jwtToken.createdAt + parseInt(process.env.TIME_TO_LIVE!, 10);

    // if the token has expired return false
    if (jwtToken.createdAt > expiry) {
      removeToken();
      return false;
    }

    return true;
  }

  return false;
};
