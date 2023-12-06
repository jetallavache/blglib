import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { Footer, Header, Navbar } from './components';
import { Home, Registration, Login, Control } from './pages';
import React from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/control" element={<Control />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
