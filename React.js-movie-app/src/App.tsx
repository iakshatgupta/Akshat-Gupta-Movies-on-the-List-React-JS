import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './components/MoviesList';
import MoviesDetails from './components/MoviesDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/:moviesCategory/:path" component={MoviesDetails} />
        <Route path="/:moviesCategory" component={MoviesList} />
        <Route path="/" component={Home} />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;