import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReCAPTCHA from 'react-google-recaptcha';

import { fetchAddMember, selectIsAddMember } from '../../../redux/slices/addMember';

const quoteList = [
  'Если вы ищете совершенства, вы никогда не будете счастливы',
  'Пока они не осознают свою силу, они не будут восставать, и до тех пор, пока они не раскроют себя, они не будут осознавать. Это проблема',
  'Каждый однажды говорит себе: \'Хочется бросить все и уйти\'. Многие говорят это просто для снятия стресса, некоторые действительно бросают и уходят. Самая идиотская ситуация — когда и бросать нечего, и идти, в общем, некуда',
  'Пожалуй, они правы, помещая любовь в книги. Пожалуй, только там ей и место',
  'Надежда, эта фальшивая эмоция, которая завязывает людские души в узлы'
];

const authorQuoteList = [
  'Лев Николаевич Толстой, «Анна Каренина»',
  'Джордж Оруэлл, «1984»',
  'Минаев, «Москва, я не люблю тебя»',
  'Уильям Фолкнер, «Свет в августе»',
  'Дженнифер Блейк, «Только по любви»',
];

const freeSeatsList = [
  'Нет свободных мест. Мы добавим Вас в список ожидания.',
  'Осталось одно место',
  'Осталось два места',
  'Осталось три места',
  'Есть свободные места',
  'Есть свободные места',
  'Есть свободные места',
  'Есть свободные места',
  'Есть свободные места',
  'Есть свободные места',
  'Есть свободные места',
];

export const TakePartPage = ({countParticipants}) => {

  const inputProps = {
    sx: {  color: '#a8a8a8',
      fontSize: '20px',
      '& fieldset, &hover fieldset': {   
        border: '1px solid #a8a8a8!important',
      },
      '&:focus-within fieldset, &:focus-visible fieldset': {
        border: '1px solid #1976d2!important',
      }
    }
  };

  const inputLabelProps = {
    sx: {
      color: '#a8a8a8',
    }
  };

  const sxProps = {
    borderRadius: 1,
    marginBottom: '20px',
  };

  let freeSeats = 10;

  if (countParticipants !== undefined) {
    if (countParticipants[0] !== undefined) {
      freeSeats = 10 - countParticipants[0].total;
      freeSeats = freeSeats > 0 ? freeSeats : 0;
    }
  }

  const isFreeSeats = freeSeats > 0 ? true : false;

  console.log(isFreeSeats);

  let rundomNum = Math.floor(Math.random() * quoteList.length);

  const [quote, setJoke] = useState(
    quoteList[rundomNum]
  );

  const [authorQuote, setAuthorQuote] = useState(
    authorQuoteList[rundomNum]
  );

  const isAddMember = useSelector(selectIsAddMember);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
    mode: 'onChange',
  });

  console.log(isAddMember);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAddMember(values));

    if (!data.payload) {
      alert('Не удалось отправить заявку');
    }

    if ('name' in data.payload) {
      window.localStorage.setItem('name', data.payload.name);
    }
  }

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  function onChange(value) {
    setIsCaptchaSuccess(true)
  }

  return (
    <div className='take-part-container'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className='take-part-header'>
        Принять <span>участие</span></div>
      
      <div className='take-part-info'>
        <div className='take-part-left'>
          <span>„{quote}“</span>
          <p>
            — {authorQuote}
          </p>
        </div>

        <div className='take-part-right'>

          {(isAddMember && isFreeSeats) && (
            <div>
              <p>
              Вы <span>успешно</span> зарегистрированы!
              </p>
              <p>
                Обязательно свяжемся с вами.
              </p>
            </div>
          )}

          {(isAddMember && !isFreeSeats) && (
            <div>
              <p>
                Добавили Вас в <span>список ожидания</span>.
              </p>
              <p>
                Обязательно свяжемся с вами.
              </p>
            </div>
          )}

          {!isAddMember && (            
            <form className='take-part-form' onSubmit={handleSubmit(onSubmit)}>
              
              <div className='take-part-form-col'>
                <p> Каждый месяц мы готовы пригласить до десяти желающих. Итоговый список участников может меняться ближе к дате проведения встречи.</p>
                <span>{freeSeatsList[freeSeats]}</span>
              </div>

              <TextField
                sx={sxProps}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
                label='Ваше имя'
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                {...register('name', { required: 'Укажите ваше имя' })}
                fullWidth
              />

              <TextField
                sx={sxProps}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
                label='Номер телефона'
                error={Boolean(errors.phone?.message)}
                helperText={errors.phone?.message}
                {...register('phone', { required: 'Укажите номер телефона' })}
                fullWidth
              />
              
              <TextField
                sx={sxProps}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
                label='Вопросы или пожелания'
                error={Boolean(errors.message?.message)}
                helperText={errors.message?.message}
                // {...register('message')}
                fullWidth
              />

              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={onChange}
                theme='dark'
              />

              <Button
                sx={{
                  marginTop: '20px',
                  borderRadius: 1,
                  '&.Mui-disabled': {
                    background: '#eaeaea',
                    color: '#c0c0c0'
                  }
                }}

                disabled={!isCaptchaSuccessful}
                // color='secondary'
                type='submit'
                size='large'
                variant='contained'
                fullWidth>
                Отправить
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
