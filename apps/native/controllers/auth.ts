import { supabase } from "@/utils/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "@supabase/supabase-js";

const signInBackend = async (access_token: string | undefined) => {
  if (!access_token) throw "access token required!!";
  const {
    data: { token },
  } = await axios.post(process.env.BACKEND_URL + "/api/auth/signin" || "", {
    token: access_token,
  });

  await AsyncStorage.setItem("authToken", token);
};

type signing = (email: string) => void;

export const signIn: signing = async (email: string) => {
  await supabase.auth.signInWithOtp({
    email,
  });
};

export const verifyUser = async (email: string, otp: string) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) throw error;

  await signInBackend(session?.access_token);
};

export const appleAuthHandler = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // Sign in via Supabase Auth.
    if (credential.identityToken) {
      const {
        error,
        data: { user, session },
      } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });
      // console.log(JSON.stringify({ error, user }, null, 2));
      if (!error) {
        // User is signed in.
        await signInBackend(session?.access_token);
      }
    } else {
      throw new Error("No identityToken.");
    }
  } catch (e: any) {
    if (e?.code === "ERR_REQUEST_CANCELED") {
      // handle that the user canceled the sign-in flow
    } else {
      // handle other errors
    }
  }
};

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId: process.env.GOOGLE_CLIENT_ID,
});

export const googleAuthHandler = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.idToken,
      });
      // console.log(error, data);
      await signInBackend(session?.access_token);
    } else {
      throw new Error("no ID token present!");
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

const redirectTo = AuthSession.makeRedirectUri();

// gets session data from the URL and sets the session on the client
const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

// performing authorization using third party providers
export const performOAuth = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    const session = await createSessionFromUrl(url);
    await signInBackend(session?.access_token);
  }
};

export const signout = async () => {
  await Promise.all([
    AsyncStorage.removeItem("authToken"),
    supabase.auth.signOut(),
  ]).catch((error) => {
    throw error;
  });
};
