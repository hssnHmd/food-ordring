import axios from 'axios';
import React, { useState } from 'react';
import styles from '../styles/Add.module.css';

const Add = ({ setOpen }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [price, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  console.log({ price });

  const changePrices = (e, idx) => {
    const currentPrice = price;
    currentPrice[idx] = e.target.value;
    setPrices(currentPrice);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const hanldeExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const dt = new FormData();
    dt.append('file', file);
    dt.append('upload_preset', 'downlo');
    try {
      const uploadUrl = await axios.post(
        'https://api.cloudinary.com/v1_1/dmolbzqot/image/upload',
        dt
      );
      const { url } = uploadUrl.data;
      const newPizza = {
        name,
        desc,
        price,
        extraOptions,
        image: url,
      };
      await axios.post('http://localhost:3000/api/products', newPizza);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setOpen(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Add new pizza</h1>
        <div className={styles.item}>
          <label htmlFor="file" className={styles.label}>
            Choose an image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="title" className={styles.label}>
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="desc" className={styles.label}>
            Description
          </label>
          <textarea
            className={styles.input}
            rows={4}
            id="desc"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              type="number"
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrices(e, 0)}
              placeholder="small"
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrices(e, 1)}
              placeholder="medium"
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrices(e, 2)}
              placeholder="large"
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extras</label>
          <div className={styles.extraContainer}>
            <input
              type="text"
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
              placeholder="Item"
              name="text"
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
              placeholder="Price"
              name="price"
            />
            <button className={styles.extraBtn} onClick={hanldeExtra}>
              Add
            </button>
          </div>
        </div>
        <div className={styles.extraItems}>
          {extraOptions?.map((option) => (
            <span className={styles.extraItem} key={option?.text}>
              {option?.text}
            </span>
          ))}
        </div>
        <button className={styles.createBtn} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
