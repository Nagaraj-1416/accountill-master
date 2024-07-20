import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddClient from "../Invoice/AddClient";
import AddUser from "../User/AddUser";

const FabButton = () => {
  const location = useLocation();
  const mainButtonStyles = { backgroundColor: "#fd4441" };
  const [openUser, setOpenUser] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);

  return (
    <div>
      <AddClient setOpen={setOpenCustomer} open={openCustomer} />

      <AddUser setOpen={setOpenUser} open={openUser} />
      <Fab
        mainButtonStyles={mainButtonStyles}
        icon={<AddIcon />}
        alwaysShowTitle={true}>
        <Action text="New User" onClick={() => setOpenUser((prev) => !prev)}>
          <PersonAddIcon />
        </Action>
        {location.pathname !== "/invoice" && (
          <Action
            text="New Invoice"
            onClick={() => (window.location.href = "/invoice")}>
            <CreateIcon />
          </Action>
        )}
        <Action
          text="New Customer"
          onClick={() => setOpenCustomer((prev) => !prev)}>
          <PersonAddIcon />
        </Action>
      </Fab>
    </div>
  );
};

export default FabButton;
