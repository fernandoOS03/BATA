export interface OrderItemRequest {
  variantId: number;
  quantity: number;
}

export interface OrderRequest {
  addressId: number;
  paymentMethod: string;
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  productName: string;
  variantDetails: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  date: string;
  status: string;
  totalAmount: number;
  address: string;
  paymentStatus: string;
  items: OrderItemResponse[];
}
