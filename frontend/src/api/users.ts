import api from "./client";
import type { User, UserUpdate } from "@/types";

export const usersApi = {
  getAll: () => api.get<User[]>("/users/").then((r) => r.data),

  getMe: () => api.get<User>("/users/me").then((r) => r.data),

  getById: (id: string) => api.get<User>(`/users/${id}`).then((r) => r.data),

  update: (id: string, data: UserUpdate) =>
    api.put<User>(`/users/${id}`, data).then((r) => r.data),

  remove: (id: string) => api.delete(`/users/${id}`),
};
