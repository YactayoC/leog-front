import { FC } from 'react';

import Course from 'components/course/Course';
import styles from 'styles/Home.module.css';

interface Props {
  items: any[];
}

const ListCourses: FC<Props> = ({ items }) => {
  console.log(items)

  return (
    <div className={styles.movies}>
      {items.map((item, index) => (
        <Course key={index} movie={item} />
      ))}
    </div>
  );
};

export default ListCourses;
