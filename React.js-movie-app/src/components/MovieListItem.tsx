import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import IMovies from "../model/IMovies";
import { addMovie, removeMovieById, getHigestMovieId, getMovieByTitle } from "../services/movies";
import "../App.css"

type Props = {
    movies: IMovies
    path: string
    onRemove: (title: string) => void
};

const MovieListItem = ({ movies, path, onRemove }: Props) => {
    const toastTimeout = 1500;
    const isFavouritePage = path === "favourite";

    const { title, poster } = movies;

    var toPath = `${path}/${title}`

    const addMovieToFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const movieByTitle = await getMovieByTitle("favourite", movies.title);
            if (movieByTitle !== null) {
                toast.error("Already added to favourites...", { autoClose: toastTimeout })
                return;
            }

            const highestId = await getHigestMovieId("favourite");
            movies.id = highestId + 1;
            await addMovie("favourite", movies);
            toast.success("Successfully added to favourites...", { autoClose: toastTimeout })
        }
        catch (errormsg: any) {
            toast.error("Not added the favourites...", { autoClose: toastTimeout })
        }
    };

    const removeMovieFromFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if (movies.id === null) {
                toast.warn("Cannot Find the Movie Id to remove from the favourite list...");
            }
            const data = await removeMovieById("favourite", movies.id);
            toast.success("Successfully removed from favourites...", { autoClose: toastTimeout })
            onRemove(movies.title);
        }
        catch (errormsg: any) {
            toast.error("Unable to remove from favourites...", { autoClose: toastTimeout })
        }
    };

    return (
        <Card className="mx-5 my-5 zoom" style={{ width: '18rem' }}>
            <a href={toPath}>
                <Card.Img style={{ height: '25rem' }} variant="top" src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`} />
            </a>
            <Card.Body>
                <Card.Title>
                    <div>
                        {title}
                    </div>
                </Card.Title>
                <Card.Text className="text-center">

                    <Button className="btn btnClass" hidden={isFavouritePage} onClick={addMovieToFavourite}>
                        Add to favourite
                        <FontAwesomeIcon icon={faHeart}
                            className="ms-2 fa-sm"
                            color="Red"
                        /></Button>
                    <Button className="btn btnClass" hidden={!isFavouritePage} onClick={removeMovieFromFavourite}>Remove from favourite
                        <FontAwesomeIcon icon={faHeart}
                            className="ms-2 fa-sm"
                            color="Grey"
                        /></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default MovieListItem