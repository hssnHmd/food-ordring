import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const handleClick = () => {
    createOrder({ method: 0, total, customer, phoneNumber, address });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label htmlFor="name">Surname</label>
          <input
            type="text"
            id="name"
            placeholder="Jhone do"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="number"
            id="phone"
            placeholder="+247 33 24 76"
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="your address"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={handleClick}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
