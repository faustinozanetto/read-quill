export interface ReferredUser {
  createdAt: Date;
  referred: {
    id: string;
    name: string | null;
    avatar: {
      path: string;
    } | null;
  };
}
