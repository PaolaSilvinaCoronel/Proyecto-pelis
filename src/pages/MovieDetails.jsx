import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/spinner";
import { useQuery } from "../hooks/useQuery";
import { get } from "./httpClient";
import movie from "./movie.json";
import style from "./MovieDetalis.module.css"

export function MovieDetails() {
    const [movie, setMovie] = useState(null);
    // const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    console.log(movie)
    const { movieId } = useParams();
    const [isLoading, setIsloading] = useState(true);
    const query = useQuery();
    const search = query.get("search");
    useEffect(() => {
        
    }, [search]);
    useEffect(() => {
        setIsloading(true);
        console.log(movieId)
        get("/movie/" + movieId).then(data => {
            setIsloading(false);
            setMovie(data);
        });
    }, [movieId]);

    if (isLoading) {
        return <Spinner />;
    }

    // const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    return (<>
        {movie?<div className={style.detalisContainer}>
            <img
                className={style.col + " " + style.movieImage}
                src={"https://image.tmdb.org/t/p/w500" +movie.poster_path}
                alt={movie.title}
            />
            <div className={style.col + " " + style.movieDetails}>
                <p className={style.firstItem}>
                    <strong>Title:</strong> {movie.title}
                    <p>
                        <strong>Genres:</strong>{" "}
                        {movie.genres.map(genre => genre.name).join(", ")}
                    </p>
                    <strong>Description:</strong> {movie.overview}
                </p>
            </div>
        </div>:<></>}</>
    );
}
