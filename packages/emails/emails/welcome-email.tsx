import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
}

const PropDefaults: WelcomeEmailProps = {
  name: 'Jhon Doe',
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Discover your Dashboard.</strong>{' '}
          <Link href="https://readquill.com/dashboard" title="Dashboard">
            Explore your personalized dashboard
          </Link>{' '}
          to track your reading progress and manage your book collection.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Connect with the Community.</strong> Join discussions and share your thoughts with fellow readers.{' '}
          <Link href="https://readquill.com/community" title="Community">
            Visit the Community Hub
          </Link>{' '}
          to get started.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Explore Achievements.</strong> Unlock and showcase your reading achievements.{' '}
          <Link href="https://readquill.com/achievements" title="Achievements">
            Check out your achievements
          </Link>{' '}
          and set new reading goals.
        </li>
      ),
    },
  ],
};
export const WelcomeEmail = ({ name = PropDefaults.name, steps = PropDefaults.steps }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ReadQuill</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: 'hsl(43 59% 81%)',
                'brand-text': 'hsl(20 3% 34%)',
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="bg-white p-45">
            <Img src="https://readquill.com/images/readquill-banner.png" alt="Read Quill" className="w-full mb-20" />
            <Heading className="text-center my-0 leading-8">Welcome to Read Quill</Heading>
            <Section>
              <Row>
                <Text className="text-base">
                  Hi {name}, welcome to Read Quill! We&apos;re thrilled to have you join our community of book
                  enthusiasts. Get ready for a journey filled with exciting stories, insightful discussions, and a world
                  of literary exploration.
                </Text>

                <Text className="text-base">Here's how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button
                href="https://readquill.com/dashboard"
                title="Goto Dashboard"
                className="bg-brand text-brand-text font-medium rounded-lg py-3 px-[18px]"
              >
                Go to your dashboard
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
