import { api } from "../../../core/api/api";
import type { OrderRequest, OrderResponse } from "../types/order.types";

export const createOrder = async (
  order: OrderRequest
): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>("/orders", order);
  return response.data;
};

export const getMyOrders = async (): Promise<OrderResponse[]> => {
  const response = await api.get<OrderResponse[]>("/orders/my-orders");
  return response.data;
};
