import { observer } from "mobx-react-lite";
import { cartStore } from "./cartStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const [show, setShow] = useState(false);

  return (
    <>   
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "black",
          color: "white",
          padding: 10,
          zIndex: 1000,
        }}
      >
        <footer className="d-flex justify-content-between align-items-center container">
          <div>
            Items: {cartStore.totalItems} | Total: ₹{" "}
            {cartStore.totalPrice.toFixed(2)}
          </div>

          <motion.button
            className="btn btn-primary px-4 rounded-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShow(cartStore.totalItems>0&&true)}
          >
            Buy Now
          </motion.button>
        </footer>
      </div>    
      <AnimatePresence>
        {show && (
          <>           
            <motion.div
              className="modal-backdrop show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

         
            <motion.div
              className="modal d-block"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.7, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.7, y: 50 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ borderRadius: "16px" }}
                >
              
                  <div className="modal-header">
                    <h5 className="modal-title"> Order Summary</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShow(false)}
                    ></button>
                  </div>

                
                  <div className="modal-body">
                    <p>Total Items: {cartStore.totalItems}</p>
                    <p>Total Price: ₹ {cartStore.totalPrice.toFixed(2)}</p>

                    <hr />

                    <p className="text-muted">
                      This is a demo checkout. Payment integration coming soon.
                    </p>
                  </div>

                 
                  <div className="modal-footer">
                    <motion.button
                      className="btn btn-secondary"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      className="btn btn-success"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        alert("Order placed successfully!");
                        cartStore.clearCart();
                        setShow(false);
                      }}
                    >
                      Confirm Order
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default observer(Footer);