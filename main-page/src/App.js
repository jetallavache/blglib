import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { Home } from './pages';
import React from 'react';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
