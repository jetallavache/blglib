import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AddMeeting = () => {
  const isAddMeeting = true;

  return (
    <div className="add-meeting-container">
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
      <div className="add-meeting-header">
        Добавить <span>мероприятие</span></div>
      <div className="add-meeting-info">
        <div className="add-meeting-left">
          <span>Произведение, которое будем обсуждать, место и дату встречи.</span>
        </div>

        <div className="add-meeting-right">

          {isAddMeeting && (
            <div>
              <p>
                Мероприятие успешно <span>добавлено </span>
              </p>
            </div>
          )}


          <form className="add-meeting-form" onSubmit={1}>
            <div className="add-meeting-form-row">
            </div>
            <TextField
              label="Ваше имя"
              // error={Boolean(errors.name?.message)}
              // helperText={errors.name?.message}
              // {...register('name', { required: 'Укажите ваше имя' })}
              fullWidth
            />
            <TextField
              label="Номер телефона"
              // error={Boolean(errors.phone?.message)}
              // helperText={errors.phone?.message}
              // {...register('phone', { required: 'Укажите номер телефона' })}
              fullWidth
            />

            <TextField
              label="Вопросы или пожелания"
              // error={Boolean(errors.message?.message)}
              // helperText={errors.message?.message}
              // {...register('message')}
              fullWidth
            />

            <Button
              color="secondary"
              type="submit"
              size="large"
              variant="contained"
              fullWidth>
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
