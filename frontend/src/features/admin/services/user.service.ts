import { api } from "../../../core/api/api";
import type { User } from "../types/user.types";
import type { Page } from "../../../shared/types/common.types";
export const userService = {
  getAllUsers: async (
    page: number = 0,
    size: number = 10
  ): Promise<Page<User>> => {
    const response = await api.get<Page<User>>(
      `/users?page=${page}&size=${size}`
    );
    return response.data;
  },
};
