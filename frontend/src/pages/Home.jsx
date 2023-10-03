import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { CurrMeeting } from '../components/CurrMeeting';

import { fetchCurrMeeting } from '../redux/slices/currMeeting';

export const Home = () => {
  const dispatch = useDispatch();
  const { currMeeting, tags } = useSelector((state) => state.currMeeting);

  const isCurrMeetingLoaded = currMeeting.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchCurrMeeting());
  }, []);

  return (
    <>
      {isCurrMeetingLoaded ? (
        <CurrMeeting isLoading={true} />
      ) : (
        <CurrMeeting
          title={currMeeting.items.title}
          firstName={currMeeting.items.firstName}
          familyName={currMeeting.items.familyName}
          imageUrl={currMeeting.items.covers}
          place={currMeeting.items.place}
          date={currMeeting.items.date}
          isEditable={false}
        />
      )}
    </>
  );
};
