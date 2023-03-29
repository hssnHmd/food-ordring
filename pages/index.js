import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Featured from '@/components/Featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import AddBtn from '@/components/AddBtn';
import { useState } from 'react';
import Add from '@/components/Add';

export default function Home({ pizzaList, admin }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza restuarant</title>
        <meta name="description" content="Best pizza ever seen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Featured />
      {admin && <AddBtn setOpen={setOpen} />}
      <PizzaList pizzaList={pizzaList} />
      {open && <Add setOpen={setOpen} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get('http://localhost:3000/api/products');

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
