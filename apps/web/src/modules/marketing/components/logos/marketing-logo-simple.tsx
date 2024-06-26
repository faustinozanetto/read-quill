import React from 'react';

interface MarketingLogoSimpleProps {
  className?: string;
}

const MarketingLogoSimple: React.FC<MarketingLogoSimpleProps> = (props) => {
  const { className = 'w-10 h-10' } = props;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.0124544 92.0124544">
      <g>
        <svg />
      </g>
      <g>
        <svg width="92.0124544" height="92.0124544" viewBox="0 0 92.0124544 92.0124544">
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#0d1004"
              d="M27.604 92.012C12.359 92.012 0 79.653 0 64.409V27.604C0 12.359 12.359 0 27.604 0h36.805c15.245 0 27.604 12.359 27.603 27.604v36.805c0 15.245-12.359 27.604-27.603 27.603z"
              data-fill-palette-color="accent"
            />
          </g>
          <g transform="translate(18.40249088 21.85295792)">
            <svg width="55.20747264" height="48.30653856" viewBox="0 0 55.20747264 48.30653856">
              <g>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55.20747264"
                  height="48.30653856"
                  data-fill-palette-color="quaternary"
                  viewBox="0 2 16 14"
                >
                  <g fill="#f1ede1" data-fill-palette-color="quaternary">
                    <path
                      d="M4 16c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2m8 6c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2M2 12H0V6c.01-1.388.649-4 3-4v2c-.928 0-1 1.987-1 2.007zm14 0h-2V6c0-.017-.056-2-1-2V2c2.373 0 3 2.617 3 4zm-9-1h2v2H7z"
                      data-fill-palette-color="quaternary"
                    />
                  </g>
                </svg>
              </g>
            </svg>
          </g>
        </svg>
      </g>
    </svg>
  );
};

export default MarketingLogoSimple;
