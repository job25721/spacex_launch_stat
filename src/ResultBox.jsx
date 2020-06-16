import React, { useState } from "react";
import { withApollo } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import LaunchesItem from "./LaunchesItem";
import Launches from "./Launches";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});
const ResultBox = () => {
  const [contents, setContent] = useState("");
  const [searchId, setId] = useState("");
  const [onLoading, setLoading] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [error, triggerErr] = useState(false);
  const _executeSearch = async (e) => {
    e.preventDefault();
    triggerErr(false);
    console.log(searchId);

    if (searchId !== "") {
      setOnSearch(true);
      setLoading(true);
      const SEARCH_QUREY = gql`
    query LaunchesQuery {
      launch(flight_number: ${searchId}) {
        flight_number
        mission_name
        launch_date_local
        launch_success
        launch_year
      }
    }
  `;
      try {
        const res = await client.query({
          query: SEARCH_QUREY,
        });
        setContent(res.data);
        setLoading(false);
      } catch {
        triggerErr(true);
      }
    }
  };
  return (
    <>
      <form className="field has-addons">
        <div className="control">
          <input
            onChange={({ target }) => setId(target.value)}
            value={searchId}
            className="input is-light"
            type="number"
            placeholder="Flight number"
          />
        </div>
        <div className="control">
          <button className="button is-info is-light" onClick={_executeSearch}>
            Search
          </button>
        </div>
        {contents !== "" || onSearch ? (
          <button
            className="button is-danger is-light"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setOnSearch(false);
              triggerErr(false);
              setId("");
              setContent("");
            }}
          >
            X Clear
          </button>
        ) : (
          ""
        )}
      </form>
      {!onSearch ? (
        error ? (
          <h1 className="subtitle is-5 has-text-danger">404 not found</h1>
        ) : (
          <Launches />
        )
      ) : error ? (
        <h1 className="subtitle is-5 has-text-danger">404 not found</h1>
      ) : onLoading ? (
        <div
          className="notification is-info"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button className="is-loading button is-info"></button>
          <span className="subtitle is-6">Loading...</span>
        </div>
      ) : (
        <LaunchesItem launch={contents.launch} />
      )}
    </>
  );
};

export default withApollo(ResultBox);
