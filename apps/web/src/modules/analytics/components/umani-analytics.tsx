import { __PROD__ } from '@modules/common/lib/common.constants';
import Script from 'next/script';
import React from 'react';

const UmaniAnalytics: React.FC = () => {
  if (!__PROD__) return null;

  return <Script defer src="https://cloud.umami.is/script.js" data-website-id="72aba3ec-bca1-4442-9805-bdf6fa1eab2b" />;
};

export default UmaniAnalytics;
