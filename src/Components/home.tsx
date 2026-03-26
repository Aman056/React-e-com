import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "./types";
import { cartStore } from "./cartStore";
import { useNavigate } from "react-router-dom";

export default observer(function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>(() => {
        return localStorage.getItem("category") || "";
    });
    
    const navigate = useNavigate()
    const fetchProducts = async () => {
        let url = "https://fakestoreapi.com/products";
        if (selected) {
            url = `https://fakestoreapi.com/products/category/${selected}`;
        }
        const res = await axios.get<Product[]>(url);
        setProducts(res.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get<string[]>(
            "https://fakestoreapi.com/products/categories"
        );
         setCategories(res.data)
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        fetchProducts();       
    }, [selected]);

    return (
        <div className="container py-4">
            <header className="container py-3">
                <div className="row align-items-center">
                    <div className="col-md-3 d-none d-md-block">
                    </div>
                    <div className="col-6 col-md-6 text-center">
                        <motion.h4
                            className="fw-bold mb-0"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-bag mb-1" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg> Explore Products
                        </motion.h4>
                    </div>
                    <div className="col-6 col-md-3 text-end">
                        <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => navigate("/cart")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart mb-1" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg> Cart
                        </button>
                    </div>

                </div>
            </header>
            <motion.div
                className="mb-4 d-flex flex-wrap justify-content-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`btn ${selected === "" ? "btn-dark" : "btn-outline-dark"
                        } m-2 rounded-pill px-3`}
                   onClick={() => {
                             localStorage.setItem('category', "")
                             return setSelected("")
                        }}
                >
                    ALL
                </motion.button>
                {categories.map((cat) => (
                    <motion.button
                        key={cat}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`btn ${selected === cat ? "btn-dark" : "btn-outline-dark"
                            } m-2 rounded-pill px-3`}
                        onClick={() => {
                             localStorage.setItem('category', cat)
                             return setSelected(cat)
                        }}
                    >
                        {cat.toUpperCase()}
                    </motion.button>
                ))}

            </motion.div>
            <motion.div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "25px",
                    margin: '20px 30px',
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.08,
                        },
                    },
                }}
            >
                {products?.map((p) => (
                    <motion.div
                        key={p.id}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to={`/product/${p.id}/details`}
                            className="text-decoration-none"
                        >
                            <motion.div
                                className="card h-100 border-0 shadow-sm"
                                style={{
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    background: "#fff",
                                }}
                                whileHover={{ scale: 1.04, y: -8 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <div
                                    style={{
                                        height: "180px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "15px",
                                        background: "#f8f9fa",
                                    }}
                                >
                                    <motion.img
                                        src={p.image}
                                        alt={p.title}
                                        style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column text-center">
                                    <h6
                                        className="card-title fw-semibold"
                                        style={{ minHeight: "45px" }}
                                    >
                                        {p.title}
                                    </h6>

                                    <p className="text-success fw-bold mb-3">
                                        ₹ {p.price}
                                    </p>
                                    <div className="mt-auto">
                                        <AnimatePresence mode="wait">
                                            {cartStore.getQuantity(p.id) > 0 ? (
                                                <motion.div
                                                    key="qty"
                                                    initial={{ scale: 0.7, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.7, opacity: 0 }}
                                                    className="d-flex align-items-center justify-content-center gap-2"
                                                >
                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            cartStore.decreaseQuantity(p.id);
                                                        }}
                                                    >
                                                        -
                                                    </motion.button>

                                                    <motion.span
                                                        key={cartStore.getQuantity(p.id)}
                                                        initial={{ scale: 1.4 }}
                                                        animate={{ scale: 1 }}
                                                        className="fw-bold"
                                                    >
                                                        {cartStore.getQuantity(p.id)}
                                                    </motion.span>

                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            cartStore.addToCart(p);
                                                        }}
                                                    >
                                                        +
                                                    </motion.button>
                                                </motion.div>
                                            ) : (
                                                <motion.button
                                                    key="add"
                                                    className="btn btn-dark w-100 rounded-pill"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        cartStore.addToCart(p);
                                                    }}
                                                >
                                                    Add to Cart
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
});