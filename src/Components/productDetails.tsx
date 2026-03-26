import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "./types";
import { CartContext } from "./cartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <motion.div
      className="container py-1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
         <motion.button
        className="btn btn-outline-secondary mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/")}
      >
        ← Back
      </motion.button>
      <motion.div
        className="card shadow border-0"
        style={{ borderRadius: "16px", overflow: "hidden" }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="row g-0 my-4 py-5">
          <div className="col-md-5 d-flex align-items-center justify-content-center p-4 bg-light">
            <motion.img
              src={product.image}
              alt={product.title}
              style={{
                maxHeight: "320px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body d-flex flex-column h-100">

              <motion.h4
                className="fw-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {product.title}
              </motion.h4>

              <motion.p
                className="text-muted"
                style={{ fontSize: "14px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {product.description}
              </motion.p>

              <motion.h3
                className="text-success mb-3"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                ₹ {product.price}
              </motion.h3>
              <div className="mt-auto d-flex gap-3">
                
                <motion.button
                  className="btn btn-primary px-4 rounded-pill"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cart.addToCart(product)}
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  className="btn btn-outline-danger px-4 rounded-pill"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cart.decreaseQuantity(product.id)}
                >
                  Remove From Cart
                </motion.button>

              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}