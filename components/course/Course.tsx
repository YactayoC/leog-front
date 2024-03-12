/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { useRouter } from 'next/router';

import styles from 'styles/Home.module.css';
import { useAppDispatch } from 'hooks';
import { onSelectMovie } from 'store/movies';
import { CursoItemI } from 'interfaces/cursoItem';

interface Props {
  cursoItem: CursoItemI;
}

const Course: FC<Props> = ({ cursoItem }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickSelectMovie = () => {
    dispatch(onSelectMovie(cursoItem));
    router.push(`/home/movie/${cursoItem.id}`);
  };

  console.log(cursoItem)

  return (

    <div className="card" style={{
      width: '30rem',
    }}>
      <img
        src={cursoItem.imagen_url}
        className="card-img-top"
        style={{
          height: '20rem',
          objectFit: 'cover',
        }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          {cursoItem.nombre}
        </h5>
        <p className="card-text" style={{ marginTop: '2rem' }}>
          {cursoItem.descripcion}
        </p>
        <a href="#" className="btn btn-primary">
          Obtener detalles
        </a>
      </div>
    </div>
  );
};

export default Course;
