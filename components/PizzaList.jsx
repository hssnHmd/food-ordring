import React from 'react';
import PizzaCard from './PizzaCard';
import styles from '../styles/PizzaList.module.css';

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best PiZZA in town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur ut
        dolores aperiam pariatur, culpa impedit porro qui sed! Laboriosam,
        adipisci.
      </p>
      <div className={styles.pizza_card}>
        {pizzaList?.map((item, idx) => (
          <PizzaCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
