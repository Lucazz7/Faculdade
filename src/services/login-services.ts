import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";
import { AuthVerification } from "../pages/Login/use-login";

export const Authentication = createAsyncThunk(
  "authentication/tokenAuthentication",
  async (data: AuthVerification, thunkApi) => {

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.loginEmail,
        data.loginPassword,
      );
      const token = (await user.user.getIdTokenResult()).token;

      const response = await axios.get('https://login-client-om32e3yzoa-uc.a.run.app/authentication', {
        headers: {
          Authorization: token,
        }
      })
      // console.log(response)
      return response;

    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }

  }
);