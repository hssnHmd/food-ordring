import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';

const Index = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['Preparing', 'On the way', 'Delivered'];
  const handleDelate = async (id) => {
    try {
      const res = await axios.delete(
        'http://localhost:3000/api/products/' + id
      );
      setPizzaList(pizzaList.filter((p) => p._id !== id));
    } catch (error) {
      console.log({ error });
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((o) => o._id === id)[0];
    const currentStatus = item.status;
    console.log(item);

    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus === 2 ? currentStatus : currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log({ orderStatusEr: error });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.name}</td>
                <td>${product.price[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelate(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanaent: false,
      },
    };
  }

  const productsList = await axios.get('http://localhost:3000/api/products');
  const ordersList = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      products: productsList.data,
      orders: ordersList.data,
    },
  };
};
