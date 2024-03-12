/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import { HomeLayout, Navbar } from 'components';
import Loader from 'components/loader/loader';
import styles from 'styles/Home.module.css';
import { CursoItemI } from 'interfaces/cursoItem';

interface Props {
  courseContent: CursoItemI;
  isLoading: boolean;
}

const CoursesSelectedPage: NextPage<Props> = ({ courseContent, isLoading = true }) => {

  if (isLoading) {
    return <Loader />;
  }
  console.log(courseContent)

  const convertLinkEmbed = (link: string) => {
    //const linkYt = courseContent.video_iframe;
    const linkEmbed = link.replace('watch?v=', 'embed/');
    return linkEmbed;
  }

  const linkEmbed = convertLinkEmbed(courseContent.video_iframe);

  return (
    <>
      <HomeLayout title={`ReMovies`}>
        <div className={styles.hero}>
          <Navbar />
        </div>
      </HomeLayout>
      <div>
        <h2>Nombre: {courseContent.nombre}</h2>
        <p>Descripción: {courseContent.descripcion}</p>
        <img src={courseContent.imagen_url} alt={courseContent.nombre} style={{ width: '25rem' }} />
        <p>Video embebido</p>
        <iframe width="560" height="315" src={linkEmbed} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cursoItem } = query;
  const parsedCursoItem = cursoItem ? JSON.parse(cursoItem as string) : null;

  return {
    props: {
      courseContent: parsedCursoItem,
      isLoading: false,
    },
  };
};

export default CoursesSelectedPage;
