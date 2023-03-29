import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from '../styles/Cart.module.css';
import { useState, useEffect } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '@/redux/cartSlice';
import OrderDetail from '@/components/OrderDetail';

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const router = useRouter();
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);

      res.status == 201 && router.push('/orders/' + res.data._id);
      dispatchEvent(reset());
    } catch (error) {
      console.log({ error });
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products?.map((p) => (
              <tr className={styles.tr} key={p._id}>
                <td>
                  <div className={styles.img_container}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}> {p.name}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {p.extras.map((e) => (
                      <span key={e._id}>{e.text} , </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}> ${p.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}> {p.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}> ${p.price * p.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$79.60
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payCash} onClick={() => setCash(true)}>
                Cash on delivery
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AVdCtpraNwp9RBepHPQarek9pv3FthMhWp6VdyiMRtCYz8TyLnDa7kF8IUiAqhZO_TJRp9_Wr6HHX4o5',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(!open)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
