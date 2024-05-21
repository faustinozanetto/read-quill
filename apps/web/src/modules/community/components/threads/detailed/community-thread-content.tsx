import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

interface CommunityThreadContentProps {
  content: string;
}

const CommunityThreadContent: React.FC<CommunityThreadContentProps> = (props) => {
  const { content } = props;

  return (
    <div className="prose max-w-full prose-orange border rounded-lg shadow p-4 mx-auto w-full">
      <Markdown remarkPlugins={[remarkGfm, remarkMdx]}>{content}</Markdown>
    </div>
  );
};

export default CommunityThreadContent;
