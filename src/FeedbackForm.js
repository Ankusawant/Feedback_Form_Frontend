import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'rating':
        setRating(value);
        break;
      case 'comments':
        setComments(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      name: name,
      email: email,
      rating: parseInt(rating),
      comments: comments,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/feedback/addData',
        feedbackData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Feedback submitted successfully!', response.data);
      alert('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setRating('');
      setComments('');
    } catch (error) {
      console.error('Failed to submit feedback:', error.response ? error.response.data : error.message);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#20B2AA',
    },
    formWrapper: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '5px 0 15px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      margin: '5px 0 15px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      minHeight: '100px',
    },
    select: {
      width: '100%',
      padding: '10px',
      margin: '5px 0 15px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: '16px',
      height: '40px',
    },
    submitButton: {
      backgroundColor: '#20B2AA',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={comments}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Enter comments"
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit →
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;