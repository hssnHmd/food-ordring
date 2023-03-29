import React from 'react';
import styles from '../styles/AddBtn.module.css';

const AddBtn = ({ setOpen }) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Add new pizza
      </button>
    </div>
  );
};

export default AddBtn;
