/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getusers } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import NoData from "../svgIcons/NoData";
import AddUser from "./AddUser";
import Spinner from "../Spinner/Spinner";
import Users from "./Users";
import axios from "axios";

const UserList = () => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  //const { clients } = useSelector((state) => state.clients);
  const isLoading = useSelector((state) => state.clients.isLoading);
  const { users = [] } = useSelector((state) => state?.auth);
  // const clients = []

  // useEffect(() => {
  // }, [currentId, dispatch]);

  //     useEffect(() => {
  //         dispatch(getClients(1));
  //         // dispatch(getClientsByUser({userId : user?.result?._id}));
  //         // dispatch(getClientsByUser({ search :user?.result?._id, tags: tags.join(',') }));
  //     },[location]
  // )

  useEffect(() => {
    dispatch(getusers({ search: user?.result?._id || user.result.googleId }));
  }, [location, dispatch]);

  if (!user) {
    history.push("/login");
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}>
        <Spinner />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
          margin: "80px",
        }}>
        <NoData />
        <p style={{ padding: "40px", color: "gray", textAlign: "center" }}>
          No Users yet. Click the plus icon to add User
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <AddUser
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Users
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        clients={users}
      />
    </div>
  );
};

export default UserList;
