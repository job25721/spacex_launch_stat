import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchesItem from "./LaunchesItem";
import Loading from "./Loading";
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
        if (loading) return <Loading />;
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
