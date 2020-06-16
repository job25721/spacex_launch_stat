import React from "react";

export default () => {
  return (
    <div
      className="notification is-info"
      style={{ display: "flex", alignItems: "center" }}
    >
      <button className="is-loading button is-info"></button>
      <span className="subtitle is-6">Loading...</span>
    </div>
  );
};
