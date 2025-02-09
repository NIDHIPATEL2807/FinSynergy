import React, { useEffect, useRef } from "react";

const News = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: "market",
        market: "stock",
        isTransparent: true,
        displayMode: "regular",
        width: "900",
        height: "550",
        colorTheme: "light",
        locale: "en",
      });

      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen pb-20">
      <div
        ref={widgetRef}
        className="p-4  shadow-2xl rounded-lg w-[920px] flex flex-col items-center"
      >
        <h2 className="text-5xl font-semibold font-satosi text-black mb-4">
          Market News
        </h2>
        <div className="tradingview-widget-container w-full">
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright text-xl text-gray-500">
            <a
              href=""
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-500"
            >
              Track all markets on TradingView
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
