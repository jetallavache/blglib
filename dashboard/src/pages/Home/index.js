import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './index.css';

import { fetchCurrMeeting } from '../../redux/slices/currMeeting';

import { HomePage } from '../../components/Home/HomePage';
import { AboutPage } from '../../components/Home/AboutPage';
import { ArchivePage } from '../../components/Home/ArchivePage';
import { CurrMeetingPage, TakePartPage } from '../../components';
import { Navbar, Footer } from '../../components';

export const Home = () => {
  const [showBackToTopBtn, setShowBackToTopBtn] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setShowBackToTopBtn(true);
    } else if (scrolled <= 500) {
      setShowBackToTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const dispatch = useDispatch();
  const { currMeeting } = useSelector((state) => state.currMeeting);

  React.useEffect(() => {
    dispatch(fetchCurrMeeting());
  }, []);

  return (
    <>
      <Navbar />
      <div className="app-section" id="home">
        <HomePage />
      </div>
      <div className="app-section" id="currMeeting">
        <CurrMeetingPage
          title={currMeeting.items.title}
          firstName={currMeeting.items.firstName}
          familyName={currMeeting.items.familyName}
          imageUrl={currMeeting.items.covers}
          place={currMeeting.items.place}
          date={currMeeting.items.date}
          isEditable={false}
        />
      </div>
      <div className="app-section" id="takePart">
        <TakePartPage />
      </div>
      <div className="app-section" id="archive">
        <ArchivePage listMeetings={currMeeting.items.listMeetings} />
      </div>
      <div className="app-section" id="about">
        <AboutPage />
      </div>
      {showBackToTopBtn && (
        <button className="btn-back-to-top" onClick={scrollToTop}>
          <span> Back to Top</span>
          <ArrowUpwardIcon />
        </button>
      )}
      <Footer />
    </>
  );
};
