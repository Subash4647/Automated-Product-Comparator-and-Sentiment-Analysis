import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sentiment from "sentiment";


const AdminReviews = () => {
  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const API_URL = "http://localhost:5000/api/auth";

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/getreview`);
      const data = await res.json();
      const sentiment = new Sentiment();

      const positive = [];
      const negative = [];

      data.forEach((rev) => {
        const score = sentiment.analyze(rev.review).score;
        if (score >= 0) {
          positive.push(rev);
        } else {
          negative.push(rev);
        }
      });

      setPositiveReviews(positive);
      setNegativeReviews(negative);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const renderTable = (reviews) => (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Reviewer Name</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rev.reviewername}</td>
              <td>{rev.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="backbtn">
          <Link to="/">
            <button className="backBtnSelect">Back</button>
          </Link>
        </div>
      <h1>Admin Review Dashboard</h1>

      <h2>Positive Reviews</h2>
      {positiveReviews.length > 0 ? (
        renderTable(positiveReviews)
      ) : (
        <p>No positive reviews available.</p>
      )}

      <h2 style={{ marginTop: "40px" }}>Negative Reviews</h2>
      {negativeReviews.length > 0 ? (
        renderTable(negativeReviews)
      ) : (
        <p>No negative reviews available.</p>
      )}
    </div>
  );
};

export default AdminReviews;
