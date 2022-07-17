import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <main>
            <section className="my-5">
                <header>
                    <h1 className="ms-3">
                    <FontAwesomeIcon icon = {faFilm}
                    className="me-2 fa-xl"
                />
                        Movies On the Tip
                    </h1>
                </header>
                <hr />
                <p  className="ms-3">
                    Welcome to Movies on the tip app. 
                    <ul>
                        <li>
                            Search movies that are already in theaters, top rated Indian movies, top rated movies around the world.
                        </li>
                        <li>
                            Search movies that will be comming soon to your near by theaters. 
                        </li>
                        <li>
                            Add/Create a list of you favourit movies.  
                        </li>
                    </ul>  
                </p>
            </section>
        </main>
    );
};

export default Home;