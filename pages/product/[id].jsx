import Image from 'next/legacy/image';
import { useState } from 'react';
import styles from '../../styles/Product.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.price[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const dispatch = useDispatch();

  // const pizza = {
  //   id: 1,
  //   name: 'CAMPAGNOLA',
  //   img: '/images/pizza.png',
  //   price: [12, 15, 18, 25],
  //   desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, numquam a repudiandae porro ullam atque? Ipsa minus sunt ad numquam.',
  // };

  const changePrice = (num) => {
    setPrice(price + num);
  };
  const handleSize = (sizeIndex) => {
    const difference = pizza.price[sizeIndex] - pizza.price[size];
    setSize(sizeIndex);
    changePrice(difference);
  };
  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((o) => o._id !== option._id));
    }
  };
  const handleClick = () => {
    dispatch(addToCart({ ...pizza, extras, price, quantity }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.image_container}>
          <Image
            src={pizza.image}
            alt={pizza._id}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>$ {price}</span>
        <p className={styles.description}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose your size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image
              src="/images/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image
              src="/images/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image
              src="/images/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Chhose your ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptiens.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option._id}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option._id} className={styles.label}>
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.quantity}
          />
          <button className={styles.add_btn} onClick={handleClick}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};
