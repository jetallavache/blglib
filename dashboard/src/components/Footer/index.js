import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';

import "./index.css";

export const Footer = () => {

  return (
    <Container maxWidth='lg'>
      <div className="footer-container">
        <div className="footer-left">
          admin
        </div>
        <div className="footer-right">
          <Link to="/login">
            control
          </Link>
        </div>
      </div>
    </Container>
  );
};
