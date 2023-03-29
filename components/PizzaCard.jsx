import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/PizzaCard.module.css';

const PizzaCard = ({ item }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${item._id}`}>
        <Image src={item.image} alt="Pizza" width={200} height={200} />
      </Link>
      <h1 className={styles.title}>{item.name}</h1>
      <span className={styles.price}>$ {item.price[0]}</span>
      <p className={styles.desc}>{item.desc}</p>
    </div>
  );
};

export default PizzaCard;
