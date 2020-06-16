import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ResultBox from "./ResultBox";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <h1
        className="title is-1 has-text-white has-text-centered"
        style={{ paddingTop: "30px" }}
      >
        SpaceX Launches Stat
      </h1>
      <div
        style={{
          height: "75vh",
          background: "#fff",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <ResultBox />
      </div>
    </ApolloProvider>
  );
};
