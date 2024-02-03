import * as React from 'react';
import { Body, Button, Container, Head, Html, Img, Preview, Section, Tailwind, Text } from 'jsx-email';

interface WelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = 'http://localhost:3000';

export const WelcomeEmail: React.FC<WelcomeEmailProps> = (props) => {
  const { userFirstname = 'Alan' } = props;

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: 'hsl(24.6, 95%, 53.1%)',
            },
          },
        },
      }}
      production
    >
      <Html>
        <Head />
        <Preview>Welcome to RadQuill, start your reading journey now.</Preview>
        <Body
          className="subpixel-antialiased bg-white"
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          <Container className="mx-auto">
            <Img alt="ReadQuill Banner" className="w-full" src={`${baseUrl}/images/readquill-banner.png`} />
            <Text>
              Hi {userFirstname}, welcome to Read Quill! We&apos;re thrilled to have you join our community of book
              enthusiasts. Get ready for a journey filled with exciting stories, insightful discussions, and a world of
              literary exploration.
            </Text>
            <Section className="text-center">
              <Button
                className="block text-center rounded-md font-medium bg-primary text-white hover:bg-primary/90 h-6 px-4 py-2"
                href={`${baseUrl}/dashboard`}
              >
                Get started
              </Button>
            </Section>

            <Text>
              Best,
              <br />
              The Read Quill team
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default WelcomeEmail;
