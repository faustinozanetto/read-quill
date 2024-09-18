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

interface MagicLinkEmail {
  url: string;
}

export const MagicLinkEmail = ({ url }: MagicLinkEmail) => {
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
            <Section>
              <Row>
                <Text className="text-base">
                  Welcome to Read Quill! We&apos;re thrilled to have you join our community of book enthusiasts. Get
                  ready for a journey filled with exciting stories, insightful discussions, and a world of literary
                  exploration.
                </Text>

                <Text className="text-base">Here's your magic link url to get you started:</Text>
                <Section className="text-center">
                  <Button
                    className="bg-brand text-brand-text font-medium rounded-lg py-3 px-[18px]"
                    href={url}
                    title="Continue Sign In"
                  >
                    Continue Sign In
                  </Button>
                </Section>
                <Text>Or copy and paste the following url if the button is not working:</Text>
                <Link href={url}>{url}</Link>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
