import * as api from "../api/index";
import {
  AUTH,
  CREATE_PROFILE,
  CREATE_USER,
  FETCH_USERS,
  UPDATE_USER,
  START_LOADING,
  END_LOADING,
} from "./constants";

export const signin =
  (formData, openSnackbar, setLoading) => async (dispatch) => {
    try {
      //login the user
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });
      // setLoading(false)
      openSnackbar("Signin successfull");
      // history.push('/dashboard')
      window.location.href = "/dashboard";
    } catch (error) {
      // console.log(error?.response?.data?.message)
      openSnackbar(error?.response?.data?.message);
      setLoading(false);
    }
  };

export const signup =
  (formData, openSnackbar, setLoading) => async (dispatch) => {
    try {
      //Sign up the user
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      const { info } = await api.createProfile({
        name: data?.result?.name,
        email: data?.result?.email,
        userId: data?.result?._id,
        phoneNumber: "",
        businessName: "",
        contactAddress: "",
        logo: "",
        website: "",
      });
      dispatch({ type: CREATE_PROFILE, payload: info });
      window.location.href = "/dashboard";
      // history.push('/dashboard')
      openSnackbar("Sign up successfull");
    } catch (error) {
      console.log(error);
      openSnackbar(error?.response?.data?.message);
      setLoading(false);
    }
  };
export const createuser = (formData, openSnackbar) => async (dispatch) => {
  try {
    //Sign up the user
    const { data } = await api.createUser(formData);
    //dispatch({ type: CREATE_USER, data });
    //  const { info } = await api.createProfile({
    //    name: data?.result?.name,
    //    email: data?.result?.email,
    //    userId: data?.result?._id,
    //    phoneNumber: "",
    //    businessName: "",
    //    contactAddress: "",
    //    logo: "",
    //    website: "",
    //  });
    //  dispatch({ type: CREATE_PROFILE, payload: info });
    //  window.location.href = "/dashboard";
    // history.push('/dashboard')
    openSnackbar("User created successfully");
  } catch (error) {
    console.log(error);
    openSnackbar(error?.response?.data?.message);
    //setLoading(false);
  }
};

export const updateUser = (id, client, openSnackbar) => async (dispatch) => {
  const { data } = await api.updateUser(id, client);
  //dispatch({ type: UPDATE_USER, payload: data });
  openSnackbar("User updated successfully");
  try {
  } catch (error) {
    console.log(error);
  }
};

export const forgot = (formData) => async (dispatch) => {
  try {
    await api.forgot(formData);
  } catch (error) {
    console.log(error);
  }
};

export const reset = (formData, history) => async (dispatch) => {
  try {
    await api.reset(formData);
    history.push("/dashboard");
  } catch (error) {
    alert(error);
  }
};

export const getusers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getusers();
    dispatch({ type: FETCH_USERS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
  }
};
