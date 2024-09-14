import Script from 'next/script';
import React from 'react';

const UmaniAnalytics: React.FC = () => {
  return <Script defer src="https://cloud.umami.is/script.js" data-website-id="72aba3ec-bca1-4442-9805-bdf6fa1eab2b" />;
};

export default UmaniAnalytics;
