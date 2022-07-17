import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Alert, Col, Row } from "react-bootstrap";
import { LoadingStatus } from "../services/types";
import IMovies from "../model/IMovies";
import LoadingIndicator from "./LoadingIndicator";
import { getMovieByTitle } from "../services/movies";
import NoDataMatched from "./NoDataMatched";

type Props = {
    moviesCategory: string,
    path: string
}
const MoviesDetails = (props: RouteComponentProps<Props>) => {
    const [status, setStatus] = useState<LoadingStatus>("LOADING")
    const [movies, setMovies] = useState<IMovies | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieByTitle(props.match.params.moviesCategory, props.match.params.path);
                setMovies(data);
                setStatus("LOADED");
            }
            catch (errormsg: any) {
                setError(errormsg)
                setStatus("LOADING_ERROR")
            }
        }

        fetchMovie();
    }, [props.match.params.path, props.match.params.moviesCategory])

    let el

    switch (status) {
        case "LOADING":
            el = <LoadingIndicator size="large" message="Loading Libraries. Please wait...." />;
            break;
        case "LOADED":

            if (movies === null) {
                el = (
                    <NoDataMatched />
                );
                break;
            }

            const { title,
                storyline,
                poster,
                posterurl,
                duration,
                releaseDate,
                actors,
                year,
                imdbRating,
                contentRating,
                averageRating,
                genres } = movies as IMovies;

            if (title === null) {
                el = (
                    <NoDataMatched />
                );
                break;
            }

            const imageClick = () => {
                return (
                    <img
                        src={`${posterurl}`}
                        alt={title}
                    />
                );
            };

            el = (
                <div>
                    <Row className="mx-3 my-5 m">
                        <Col xs={12} lg={3} className="my-3">
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
                                alt={title}
                                className="w-100"
                                onClick={() => imageClick()}
                            />
                        </Col>
                        <Col xs={12} lg={8} className="my-3">
                            <div>
                                <h2>
                                    {title} ({year})
                                </h2>
                            </div>
                            <div className="my-4">
                                <Row>
                                    <Col xs={3}>
                                        Imdb Rating
                                    </Col>
                                    <Col xs={8}>
                                        {imdbRating}
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Content Rating
                                    </Col>
                                    <Col xs={8}>
                                        {contentRating}
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Average Rating
                                    </Col>
                                    <Col xs={8}>
                                        {averageRating}
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Duration
                                    </Col>
                                    <Col xs={8}>
                                        {duration}
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Genres
                                    </Col>
                                    <Col xs={8}>
                                        {
                                            genres.map(
                                                genres => (
                                                    <span className="me-2"
                                                        key={genres}>
                                                        {genres}
                                                    </span>
                                                )
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Actors
                                    </Col>
                                    <Col xs={8}>
                                        {
                                            actors.map(
                                                actors => (
                                                    <span className="me-2"
                                                        key={actors}>
                                                        {actors}
                                                    </span>
                                                )
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Released Date
                                    </Col>
                                    <Col xs={8}>
                                        {releaseDate}
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col xs={3}>
                                        Story Line
                                    </Col>
                                    <Col xs={8}>
                                        {storyline}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
            break;

        case "LOADING_ERROR":
            let msg = error?.message ?? '';

            if (msg?.indexOf("404") > -1) {
                el = (
                    <NoDataMatched />
                )
            } else {
                el = (
                    <Alert variant="danger">
                        {error?.message}
                    </Alert>
                )
            }
            break;
    }

    return el;
}

export default MoviesDetails