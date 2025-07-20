import API from "./api";
import { type Task } from "../types/task";

export const getTasks = (isCompleted?: boolean, page = 1, limit = 2) => {
  const params = new URLSearchParams();

  if (isCompleted !== undefined) {
    params.append("is_completed", String(isCompleted));
  }

  params.append("page", String(page));
  params.append("limit", String(limit));

  return API.get(`/tasks/?${params.toString()}`);
};

export const createTask = (data: { title: string; description?: string; category?: number | null }) => {
  return API.post("/tasks/", data);
};

export const deleteTask = (id: number) => {
  return API.delete(`/tasks/${id}/`);
};

export const updateTask = (id: number, data: Partial<Task>) => {
  return API.patch(`/tasks/${id}/`, data);
};

