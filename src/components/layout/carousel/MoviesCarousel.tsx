import "../../../assets/css/MoviesCarousel.css";
import { Carousel, Image } from "react-bootstrap";
import { MoviesResultState } from "../../../redux-part/moviesState";

interface TopFourMovies {
  topFourMovies?: MoviesResultState[];
  loadingStatus: string;
}

const MoviesCarousel: React.FC<TopFourMovies> = ({
  topFourMovies,
  loadingStatus,
}) => {
  const renderCarousel = () => {
    return (
      <Carousel className="bg-dark">
        {loadingStatus === "loaded"
          ? topFourMovies?.map((movie) => {
              return movie.backdrop_path ? (
                <Carousel.Item key={movie.id}>
                  <Image
                    alt={movie.original_title}
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    className={"movie-thumbnail"}
                  />
                </Carousel.Item>
              ) : (
                <Carousel.Item key={Math.random()} className="loading">
                  <div className="dummy-carousel-image d-flex align-items-center mx-auto">
                    Sorry! No Image to display
                  </div>
                </Carousel.Item>
              );
            })
          : Array(4)
              .fill(1)
              .map(() => {
                return (
                  <Carousel.Item key={Math.random()} className="loading">
                    <div className="dummy-carousel-image"></div>
                  </Carousel.Item>
                );
              })}
      </Carousel>
    );
  };

  return <header>{renderCarousel()}</header>;
};

export default MoviesCarousel;
