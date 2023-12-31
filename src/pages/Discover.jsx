import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"; // production api
// import { useGetSongsByGenreQuery } from "../redux/services/fakeApiCore"; // tests api
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) {
    return <Loader title="Loading songs" />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid="discover">
      <div
        className="xl:w-[96%] mb-3 flex justify-between items-center
        lg:flex-row md:mb-10 mt-6"
      >
        <h2 className="font-bold md:text-3xl text-2xl ml-0   text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || "Pop"}
          className="bg-black  text-gray-300 p-2 text-sm rounded-lg outline-none"
          id="genres"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div
        className="w-full justify-around items-center flex-wrap md:flex hidden gap-6 text-white"
        data-testid="songs-bar"
      >
        {data?.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          );
        })}
      </div>
      <div className="flex-col w-full md:hidden flex">
        <div className="w-full justify-between items-center flex-col">
          <Swiper
            slidesPerView={2}
            spaceBetween={40}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {data?.map((song, i) => (
              <SwiperSlide
                key={i}
                className="shadow-lg rounded-full animate-slideright"
              >
                <SongCard
                  key={song.key}
                  song={song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  discover="true"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Discover;
