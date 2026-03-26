import { observer } from "mobx-react-lite";
import { cartStore } from "./cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default observer(function Cart() {
  const navigate = useNavigate();

  if (cartStore.cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>🛒 Your cart is empty</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">

    {/* Back Button */}
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>

    <h2 className="mb-0 text-center flex-grow-1">🛒 My Cart</h2>

    {/* Empty div for spacing (keeps title centered) */}
    <div style={{ width: "60px" }}></div>
  </div>
      <div className="row">      
        <div className="col-md-8">
          <AnimatePresence>
            {cartStore.cart.map((item) => (
              <motion.div
                key={item.id}
                className="card mb-3 shadow-sm border-0"
                style={{ borderRadius: "12px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="row g-0 align-items-center">
           
                  <div className="col-md-3 text-center p-3">
                    <img
                      src={item.image}
                      style={{
                        maxHeight: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-md-5">
                    <div className="card-body">
                      <h6>{item.title}</h6>
                      <p className="text-muted mb-1">
                        ₹ {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          cartStore.decreaseQuantity(item.id)
                        }
                      >
                        -
                      </motion.button>

                      <span>{item.quantity}</span>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="btn btn-outline-success btn-sm"
                        onClick={() => cartStore.addToCart(item)}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        cartStore.removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="col-md-4">
          <motion.div
            className="card shadow border-0"
            style={{ borderRadius: "12px" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-body">
              <h5>Order Summary</h5>

              <hr />

              <p>
                Items: <b>{cartStore.totalItems}</b>
              </p>

              <p>
                Total:{" "}
                <b>₹ {cartStore.totalPrice.toFixed(2)}</b>
              </p>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => alert("Proceeding to checkout")}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});