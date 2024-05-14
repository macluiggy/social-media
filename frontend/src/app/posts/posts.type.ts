type TPostWithUser = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username?: string | null;
    fullName: string;
  };
};

type TPost = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export { TPostWithUser, TPost };
