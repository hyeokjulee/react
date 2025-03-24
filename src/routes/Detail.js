import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
      setLoading(false);
    };

    getMovie();
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          <Movie
            id={movie.id}
            year={movie.year}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            genres={movie.genres}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
