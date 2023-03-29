import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const qty = useSelector((state) => state.cart.quantity);
  console.log({ qty });
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callbtn}>
          <Image
            src="/images/telephone.png"
            alt="Telephone"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Order Now</div>
          <div className={styles.text}>02 476 345 334</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>HomePage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>
            <Image src="/images/logo.png" width={160} height={69} alt="Logo" />
          </li>
          <li className={styles.listItem}>Event</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart">
          <div className={styles.cart}>
            <Image src="/images/cart.png" alt="" width={30} height={30} />
            <span className={styles.counter}>{qty}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
