import React from 'react';
import BackgroundAnimation from '../components/home/BackgroundAnimation';
import StockTicker from '../components/home/StockTicker';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/home/Footer';
import FeaturesSection from '../components/home/FeaturesSection';
import HomePageHero from '../components/home/HomepageHero';
import ChatbotButton from '../components/chatbot/ChatbotButton';
import DotGrid from '../components/DotGrid';
import SquareGrid from '../components/SquareGrid';

const HomePage = () => {

    
  return (
    <div className="relative min-h-screen">
      {/* <BackgroundAnimation /> */}
      
      <StockTicker />
      {/* <DotGrid color="#888888" size={20} dotSize={.9} className="p-10"></DotGrid> */}
      {/* <SquareGrid color="rgba(0, 0, 0, 0.2)" size={30} className="p-10"></SquareGrid> */}
      
      <SquareGrid color="rgba(0, 0, 0, 0.2)" size={40} className="p-30">
           <HomePageHero />
            
      <FeaturesSection/>
      <Testimonials />
                </SquareGrid>
     
      <ChatbotButton/>
      <Footer />
    </div>
  );
};

export default HomePage;
