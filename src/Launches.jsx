import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchesItem from "./LaunchesItem";
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
      launch_year
    }
  }
`;
export default () => {
  return (
    <Query query={LAUNCHES_QUERY}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <button
              className="is-loading button is-dark is-light"
              style={{ width: "50px", height: "50px" }}
            ></button>
          );
        if (error) return <h1>404 not found!!!</h1>;
        return (
          <>
            {data.launches.map((launch) => (
              <LaunchesItem key={launch.flight_number} launch={launch} />
            ))}
          </>
        );
      }}
    </Query>
  );
};
