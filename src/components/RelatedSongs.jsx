import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  return (
    <div className="flex flex-col" data-testid="related-songs">
      <h1 className="font-bold text-3xl text-white mb-4">
        {artistId ? "Top Songs" : "Related Songs"}
      </h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => {
          return (
            <SongBar
              key={`${song.key}-${artistId}-${i}`}
              song={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedSongs;
