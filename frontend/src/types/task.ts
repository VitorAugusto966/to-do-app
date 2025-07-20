export type Category = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  category: Category | null;
};
