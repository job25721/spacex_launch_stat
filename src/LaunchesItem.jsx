import React from "react";

export default ({
  launch: {
    flight_number,
    mission_name,
    launch_year,
    launch_date_local,
    launch_success,
  },
}) => {
  return (
    <div
      className="card"
      style={{
        width: "500px",
        marginBottom: "20px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <header className="card-header has-background-dark">
        <p className="card-header-title has-text-white">
          Mission name : {mission_name}{" "}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>Flight number : {flight_number}</p>
          <p>Launch year : {launch_year}</p>
          <p>Launch date local : {launch_date_local}</p>
          <p>Launch success : {launch_success ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};
