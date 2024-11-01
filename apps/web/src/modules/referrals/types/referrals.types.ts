export interface ReferredUser {
  createdAt: Date;
  referred: {
    id: string;
    name: string;
    avatar: {
      path: string;
    } | null;
  };
}
