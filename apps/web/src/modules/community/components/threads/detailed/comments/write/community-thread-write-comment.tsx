'use client';

import React from 'react';
import CommunityThreadWriteCommentForm, {
  CommunityThreadWriteCommentFormData,
} from './community-thread-write-comment-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

interface CommunityThreadWriteCommentProps {
  threadId: string;
}

const CommunityThreadWriteComment: React.FC<CommunityThreadWriteCommentProps> = (props) => {
  const { threadId } = props;

  const { toast } = useToast();

  const handleCreateComment = async (data: CommunityThreadWriteCommentFormData) => {
    try {
      const url = new URL('/api/community/thread/comment', __URL__);
      const body = JSON.stringify({
        threadId,
        content: data.content,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create thread comment!');
      }

      const { success }: { success: boolean } = await response.json();

      toast({ variant: 'success', content: `Comment created successfully!` });
    } catch (error) {
      let errorMessage = 'Could not create thread comment!';
      if (error instanceof Error) errorMessage = error.message;

      toast({ variant: 'error', content: errorMessage });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow flex flex-col">
      <CommunityThreadWriteCommentForm onSubmit={handleCreateComment} />
    </div>
  );
};

export default CommunityThreadWriteComment;
