/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useRouter } from 'next/router';

import { TMovie } from 'interfaces/movies';

import styles from 'styles/Home.module.css';
import { useAppDispatch } from 'hooks';
import { onSelectMovie } from 'store/movies';

interface Props {
  movie: any;
}

const Course: FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickSelectMovie = () => {
    dispatch(onSelectMovie(movie));
    router.push(`/home/movie/${movie.uid}`);
  };

  console.log(movie)

  return (

    <div className="card">
      <img
        src={movie.imagen_url}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the cards content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default Course;
