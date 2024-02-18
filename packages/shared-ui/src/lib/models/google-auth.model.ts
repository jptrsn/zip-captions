export interface GoogleOauthCallbackFragment {
  state: string;
  access_token: string;
  authuser: string; // "0"
  token_type: string; // "Bearer"
  expires_in: string;
  scope: string;
  prompt: string;
}

export interface GoogleOauthCallbackFragmentError {
  state: string;
  error: string;
}

export interface DecodedToken {
  "iss": string; // "https://accounts.google.com", // The JWT's issuer
  "nbf": number; //  161803398874,
  "aud": string; // "314159265-pi.apps.googleusercontent.com", // Your server's client ID
  "sub": string; // "3141592653589793238", // The unique ID of the user's Google Account
  "hd": string; // "gmail.com", // If present, the host domain of the user's GSuite email address
  "email": string; // "elisa.g.beckett@gmail.com", // The user's email address
  "email_verified": boolean; // true, if Google has verified the email address
  "azp": string; // "314159265-pi.apps.googleusercontent.com",
  "name": string; // "Elisa Beckett",
  "picture": string; // "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler", // If present, a URL to user's profile picture
  "given_name": string; // "Elisa",
  "family_name": string; // "Beckett",
  "iat": number; // 1596474000, // Unix timestamp of the assertion's creation time
  "exp": number; // 1596477600, // Unix timestamp of the assertion's expiration time
  "jti": string; // "abc161803398874def"
}

export const GoogleLoginScopes: string[] = [
  './auth/userinfo.email',
  './auth/userinfo.profile',
  'openid'
]