import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div className="not-found-page animate-page-enter">
    <div className="eyebrow" style={{ justifyContent: 'center' }}>Lost token</div>
    <h1>404</h1>
    <h2>No chair by that name</h2>
    <p>
      This page does not exist. Check the address, or go back and
      pick a craft instead.
    </p>
    <Link to="/" className="book-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
      Back home
    </Link>
  </div>
);

export default NotFoundPage;
