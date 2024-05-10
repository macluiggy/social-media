type RandomPosts = {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    fullName: string;
  };
};

export { RandomPosts };
