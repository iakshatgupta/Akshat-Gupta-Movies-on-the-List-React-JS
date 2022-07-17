import axios from "axios";
import IMovies from "../model/IMovies";

const basePath = process.env.REACT_APP_API_BASE_URL;

const getMovies = async (moviesCategory: string) => {
  const response = await axios.get<IMovies[]>(`${basePath}/${moviesCategory}`);
  return response.data;
};

const getMovieByTitle = async (moviesCategory: string, title: string) => {
  const response = await axios.get<IMovies[]>(
    `${basePath}/${moviesCategory}/?title=${title}`
  );
  if (response.data === null || response.data.length === 0) {
    return null;
  }
  return response.data[0];
};

const addMovie = async (moviesCategory: string, movie: IMovies) => {
  return axios
    .post<IMovies[]>(`${basePath}/${moviesCategory}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

const removeMovieById = async (moviesCategory: string, id: string | number) => {
  const response = await axios.delete<IMovies>(
    `${basePath}/${moviesCategory}/${id}`
  );
  return response.data;
};

const getHigestMovieId = async (moviesCategory: string) => {
  const response = await axios.get<IMovies[]>(
    `${basePath}/${moviesCategory}?_sort=id&_order=desc`
  );

  if (response.data === null || response.data.length === 0) {
    return 0;
  }
  return response.data[0].id ?? 0;
};

export {
  getMovies,
  getMovieByTitle,
  addMovie,
  removeMovieById,
  getHigestMovieId,
};