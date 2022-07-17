import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const NavigationMenu = () => {    

    return (
        <Navbar className="me-2" bg="light" expand="lg">
        <Navbar.Brand href="/">
                <FontAwesomeIcon icon = {faFilm}
                    className="ms-4 me-2"
                />
                    Movies On the Tip
        </Navbar.Brand>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="flex-end" id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="me-2" href="/movies-in-theaters">Movies in theaters</Nav.Link>
                    <Nav.Link className="me-2" href="/movies-coming">Coming Soon</Nav.Link>
                    <Nav.Link className="me-2" href="/top-rated-india">Top rated Indian</Nav.Link>
                    <Nav.Link className="me-2" href="/top-rated-movies">Top rated Movies</Nav.Link>
                    <Nav.Link href="/favourite">Favourite</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;