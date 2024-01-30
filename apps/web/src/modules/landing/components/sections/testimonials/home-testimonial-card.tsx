import Image from 'next/image';
import React from 'react';

export interface HomeTestimonialCardProps {
  name: string;
  content: string;
}

const HomeTestimonialCard: React.FC<HomeTestimonialCardProps> = (props) => {
  const { name, content } = props;

  return (
    <div className="border bg-card shadow rounded-lg p-6 relative backdrop-blur-md w-[400px]">
      <div className="flex gap-4 items-center justify-start mb-4">
        <Image
          alt="Testimonial"
          className="rounded-full"
          height={50}
          src="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"
          width={50}
        />
        <span className="font-bold">{name}</span>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default HomeTestimonialCard;
