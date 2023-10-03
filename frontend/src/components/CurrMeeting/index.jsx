import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import styles from './CurrMeeting.module.scss';
import { CurrMeetingSkeleton } from './Skeleton';

export const CurrMeeting = ({
  title,
  firstName,
  familyName,
  imageUrl,
  date,
  place,
  children,
  isFullCurrMeeting,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <CurrMeetingSkeleton />;
  }

  const onClickRemove = () => {};

  return (
    <div
      className={clsx(styles.root, { [styles.rootFull]: isFullCurrMeeting })}
    >
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/control/general`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <div className={styles.wrapper}>
            <div className={styles.indention}>
              <h3>Очередная вчтреча книжного клуба пройдет в {date}</h3>
              <h3>{place}</h3>
              <h3>Читаем „{title}“</h3>
              <h3>
                Автор: {firstName} {familyName}
              </h3>
              {children && <div className={styles.content}>{children}</div>}
            </div>
          </div>
        </Grid>
        <Grid xs={4} item>
          {imageUrl && (
            <img
              className={clsx(styles.image, {
                [styles.imageFull]: isFullCurrMeeting,
              })}
              src={imageUrl[0]}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
