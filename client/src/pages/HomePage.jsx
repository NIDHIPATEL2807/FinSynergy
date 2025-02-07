import React from 'react';
import BackgroundAnimation from '../components/home/BackgroundAnimation';
import StockTicker from '../components/home/StockTicker';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/home/Footer';
import FeaturesSection from '../components/home/FeaturesSection';
import HomePageHero from '../components/home/HomepageHero';
import ChatbotButton from '../components/chatbot/ChatbotButton';

const HomePage = () => {

    
  return (
    <div className="relative min-h-screen">
      <BackgroundAnimation />
      <StockTicker />
      <HomePageHero/>
      <FeaturesSection/>
      <Testimonials />
      <ChatbotButton/>
      <Footer />
    </div>
  );
};

export default HomePage;
