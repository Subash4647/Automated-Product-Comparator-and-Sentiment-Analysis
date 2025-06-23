import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sentiment from "sentiment";

const Senti = () => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  // Fetch all reviews on load
  useEffect(() => {
    fetchReviews();
  }, []);
  const API_URL = "http://localhost:5000/api/auth";
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/getreview`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || !name.trim()) return;

    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(text);

    try {
      const res = await fetch(`${API_URL}/reviewpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewername: name,
          review: text,
        }),
      });

      if (res.ok) {
        setMessage("Review submitted!");
        setText("");
        setName("");
        fetchReviews(); // Refresh the list
      } else {
        setMessage(" Failed to submit review.");
      }
    } catch (err) {
      console.error("Error posting review:", err);
      setMessage(" Server error.");
    }
  };

  return (
    <div className="review-container">
      <h2>Leave a Review</h2>

      <div className="backbtn">
        <Link to="/">
          <button className="backBtnSelect">Back</button>
        </Link>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit}>Submit Review</button>
        {message && <p>{message}</p>}
      </div>

      {reviews.length > 0 && <h3>All Reviews</h3>}
      <div className="reviews">
        {reviews.map((rev, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-header">
              <strong>{rev.reviewername}</strong> •{" "}
              <span>{new Date(rev.createdAt).toLocaleString()}</span>
            </div>
            <p>{rev.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Senti;
