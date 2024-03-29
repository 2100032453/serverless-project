// SignUp.js
import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import Firebase auth and firestore

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      setUserEmail(user.email); // Set user email after successful sign-up

      // Store user details in Firestore
      await db.collection('users').doc(user.uid).set({
        email: user.email,
        // Add more user details as needed
      });

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {userEmail && <p>Registered successfully with email: {userEmail}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
