import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import "./index.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Header } from "../../components/Header";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: 'onChange',
  });

  if (isAuth) {
    return <Navigate to="/control" />;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  return (
    <>
      <div className="login-container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="login-header">
          Авто<span>ризация</span></div>
        <div className="login-info">
          <div className="login-left">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="login-form-row">
              </div>
              <TextField
                sx={{
                  borderRadius: 1,
                  marginBottom: '20px',
                }}
                InputLabelProps={{
                  sx: {
                    color: '#a8a8a8',
                  }
                }}
                InputProps={{
                  sx: {
                    '&hover fieldset': {
                      border: '1px solid black!important',
                      borderRadius: 1,
                    },
                    '&:focus-within fieldset, &:focus-visible fieldset': {
                      border: '1px solid #ff8ed9!important',
                      borderRadius: 1,
                    },
                  }
                }}
                inputProps={{
                  sx: {
                    color: '#a8a8a8',
                    paddingLeft: '15px',
                    fontSize: '20px',
                  }
                }}
                label="Ваша почта"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                FormHelperTextProps={{
                  sx: {
                    color: '#666666',
                  }
                }}
                {...register('email', { required: 'Укажите почту' })}
                fullWidth
              />

              <TextField
                sx={{
                  borderRadius: 1,
                  marginBottom: '20px',
                }}
                InputLabelProps={{
                  sx: {
                    color: '#a8a8a8',
                  }
                }}
                InputProps={{
                  sx: {
                    '&hover fieldset': {
                      border: '1px solid black!important',
                      borderRadius: 1,
                    },
                    '&:focus-within fieldset, &:focus-visible fieldset': {
                      border: '1px solid #ff8ed9!important',
                      borderRadius: 1,

                    },
                  }
                }}
                inputProps={{
                  sx: {
                    color: '#a8a8a8',
                    paddingLeft: '15px',
                    fontSize: '20px',
                  }
                }}
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                FormHelperTextProps={{
                  sx: {
                    color: '#666666',
                  }
                }}
                {...register('password', { required: 'Укажите пароль' })}
                fullWidth
              />

              <Button
                color="secondary"
                type="submit"
                size="large"
                variant="contained"
                fullWidth>
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
