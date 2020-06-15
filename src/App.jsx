import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Launches from "./Launches.jsx";
import LaunchesItem from "./LaunchesItem";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});
const SearchFlight = (props) => {
  const [id] = useState(props.id);
  const SEARCH_QUREY = gql`
    query LaunchesQuery {
      launch(flight_number : ${id} ) {
        flight_number
        mission_name
        launch_date_local
        launch_success
        launch_year
      }
  }
`;
  return (
    <Query query={SEARCH_QUREY}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <button
              className="is-loading button is-dark is-light"
              style={{ width: "50px", height: "50px" }}
            ></button>
          );
        if (error) return <h1>404 not found!!!</h1>;
        const flight = data.launch;
        console.log(flight);

        return <LaunchesItem key={flight} launch={flight} />;
      }}
    </Query>
  );
};
export default () => {
  const [search, setSearch] = useState(false);
  const [searchId, setId] = useState("");
  const submitSearch = () => {
    if (searchId !== "" || searchId === 0) {
      setSearch(true);
    } else {
      alert("please fill flight number 1-109");
    }
  };
  return (
    <ApolloProvider client={client}>
      <h1
        className="title is-1 has-text-white has-text-centered"
        style={{ paddingTop: "30px" }}
      >
        SpaceX Launches
      </h1>
      <div
        style={{
          overflow: "auto",
          height: "1000px",
          width: "550px",
          background: "#fff",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          borderRadius: "13px",
        }}
      >
        <div className="field has-addons">
          <div className="control">
            <input
              onChange={({ target }) => setId(target.value)}
              className="input"
              type="number"
              placeholder="Flight number"
            />
          </div>
          <div className="control">
            <button className="button is-info" onClick={submitSearch}>
              Search
            </button>
          </div>
          {search ? (
            <button
              className="button is-danger"
              style={{ marginLeft: "10px" }}
              onClick={() => setSearch(false)}
            >
              X Clear
            </button>
          ) : (
            ""
          )}
        </div>
        {!search ? <Launches /> : <SearchFlight id={searchId} />}
      </div>
    </ApolloProvider>
  );
};
