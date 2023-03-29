import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    '/images/featured1.jpeg',
    '/images/featured3.jpeg',
    '/images/featued2.jpeg',
  ];

  const handleArrow = (e, direction) => {
    if (direction === 'left') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === 'right') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.arrow_container}
        onClick={(e) => handleArrow(e, 'left')}
      >
        <Image src="/images/arrowl.png" alt="arrowl" fill />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((image, i) => (
          <div className={styles.img_container} key={i}>
            <Image src={image} alt="" layout="fill" contain />
          </div>
        ))}
      </div>
      <div
        className={styles.arrow_container}
        onClick={(e) => handleArrow(e, 'right')}
      >
        <Image src="/images/arrowr.png" alt="arrowr" fill />
      </div>
    </div>
  );
};

export default Featured;
