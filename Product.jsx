
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const Product = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [product1, setProduct1] = useState({});
  const [product2, setProduct2] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    fetch("../../public/electronicsProduct.csv")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setAllProducts(data);
      });
  }, []);

  const handleCompare = (product, isFirstProduct) => {
    const details = {
      img: product[4],
      name: product[1],
      rating: product[6],
      reviews: product[7],
      discount: product[8]?.slice(3),
      price: product[9]?.slice(3),
    };
    isFirstProduct ? setProduct1(details) : setProduct2(details);
  };

  
  const filteredProducts = allProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-wrapper">
      <div className="backbtn">
        <Link to="/">
          <button className="backBtnSelect">Back</button>
        </Link>
      </div>

      <h1>🔍 Product Comparison</h1>

      <div className="input-boxes">
        <input
          type="text"
          placeholder="Enter product 1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const match = allProducts.find((p) =>
                p[1]?.toLowerCase().includes(input1.toLowerCase())
              );
              if (match) handleCompare(match, true);
              setInput1("");
            }
          }}
        />

        <input
          type="text"
          placeholder="Enter product 2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const match = allProducts.find((p) =>
                p[1]?.toLowerCase().includes(input2.toLowerCase())
              );
              if (match) handleCompare(match, false);
              setInput2("");
            }
          }}
        />
      </div>

      <div
        className="comparison-section"
        style={{ display: "flex", gap: "2rem" }}
      >
        {[product1, product2].map((p, index) => (
          <div
            className="card"
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "500px",
            }}
          >
            {p.img ? (
              <img
                src={p.img || "/placeholder.svg"}
                alt={`product-${index}`}
                width="100%"
                height="300px"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>No Image</span>
              </div>
            )}
            <h3>{index === 0 ? "Product 1" : "Product 2"}</h3>
            <p>
              <strong>Product Name:</strong> {p.name || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {p.rating || "N/A"}
            </p>
            <p>
              <strong>Reviews:</strong> {p.reviews || "N/A"}
            </p>
            <p>
              <strong>Discount:</strong> ₹{p.discount || "N/A"}
            </p>
            <p>
              <strong>Actual Price:</strong> ₹{p.price || "N/A"}
            </p>
          </div>
        ))}
      </div>

      <h2>
        🔍 All Products (Page {currentPage} of {totalPages})
      </h2>

      <div
        className="all-products-section"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {currentProducts.map((p, index) => (
          <div
            className="card"
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "300px",
              margin: "1rem",
            }}
          >
            {p[4] ? (
              <img
                src={p[4] || "/placeholder.svg"}
                alt={`product-${index}`}
                width="100%"
                height="300px"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>No Image</span>
              </div>
            )}
            <h3>{p[1]}</h3>
            <p>
              <strong>Product Name:</strong> {p[1] || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {p[6] || "N/A"}
            </p>
            <p>
              <strong>Reviews:</strong> {p[7] || "N/A"}
            </p>
            <p>
              <strong>Discount:</strong> ₹{p[8]?.slice(3) || "N/A"}
            </p>
            <p>
              <strong>Actual Price:</strong> ₹{p[9]?.slice(3) || "N/A"}
            </p>
            <button onClick={() => handleCompare(p, true)}>
              Compare with Product 1
            </button>
            <button onClick={() => handleCompare(p, false)}>
              Compare with Product 2
            </button>
          </div>
        ))}
      </div>

      <div
        className="pagination-controls"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem 1rem",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Previous
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: currentPage === pageNum ? "#007bff" : "#fff",
                color: currentPage === pageNum ? "#fff" : "#000",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "0.5rem 1rem",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;