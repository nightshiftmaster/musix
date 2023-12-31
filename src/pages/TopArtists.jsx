import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore"; // production api
// import { useGetTopChartsQuery } from "../redux/services/fakeApiCore"; // tests api

import _ from "lodash";

import React from "react";

const TopArtists = () => {
  const { data, isFetching, isError } = useGetTopChartsQuery();

  if (isFetching) {
    return <Loader title="Loading top charts" />;
  }

  if (isError) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold md:text-3xl text-2xl  text-white text-left w-full flex justify-between items-center
    lg:flex-row flex-col mt-6 mb-8"
      >
        Discover Top Artists
      </h2>

      <div
        className="flex flex-wrap justify-around gap-8 mt-2"
        data-testid="artists-bar"
      >
        {_.uniqBy(data, "key")?.map((track, i) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
