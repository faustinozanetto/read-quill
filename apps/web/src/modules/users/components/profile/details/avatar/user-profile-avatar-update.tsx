import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import UserProfileAvatarUpdateForm from './user-profile-avatar-update-form';
import { useUpdateUserAvatar } from '@modules/users/hooks/avatar/use-update-user-avatar';

const UserProfileAvatarUpdate: React.FC = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { updateAvatar, isPending } = useUpdateUserAvatar({
    onSuccess: async (data) => {
      if (data.data?.avatarImage) {
        toast({ variant: 'success', content: 'Avatar updated successfully!' });
        setDialogOpen(false);
      }
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="absolute top-2 right-2 opacity-50 hover:opacity-100" title="Edit Avatar">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Avatar</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update your avatar to give your profile a fresh look. Choose an image that represents you!
        </DialogDescription>
        <UserProfileAvatarUpdateForm onSubmit={updateAvatar} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileAvatarUpdate;
