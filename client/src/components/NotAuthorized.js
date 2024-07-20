import React from "react";
import NoData from "./svgIcons/NoData";

const NotAuthorized = () => {
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
      <h1>Not Authorized</h1>
      <p style={{ padding: "40px", color: "gray", textAlign: "center" }}>
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default NotAuthorized;
