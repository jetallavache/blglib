import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './index.css';

import { fetchCurrMeeting } from '../../redux/slices/currMeeting';
import { Header } from '../../components/Header';
import { AddMeeting } from '../../components';

export const Control = () => {

    const dispatch = useDispatch();
    const { currMeeting } = useSelector((state) => state.currMeeting);

    React.useEffect(() => {
        dispatch(fetchCurrMeeting());
    }, []);

    return (
        <>
            <Header />
            <div className="app-section" id="addMeeting">
                <AddMeeting />
            </div>
        </>
    );
};
