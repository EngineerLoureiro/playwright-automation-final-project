import { CartItem } from "./cart.data";
import { PAYMENT_METHODS } from "./payments.data";

export const ORDERS_PAGE = {
  TITLE: {
    ID: "orders-title",
    TEXT: "Purchase Orders",
  },
  EMPTY_MESSAGE: {
    ID: "orders-empty-message",
    TEXT: "No orders registered.",
  },
  ORDER: {
    PAYMENTS_METHOD: (orderPosition: number) =>
      `order-payment-${orderPosition}`,
    ITEM: {
      NAME: (orderPosition: number, index: number) =>
        `order-item-name-${orderPosition}-${index}`,
      TOTAL: (orderPosition: number, index: number) =>
        `order-item-total-${orderPosition}-${index}`,
    },
    TOTAL: (orderPosition: number) => `order-total-${orderPosition}`,
  },
};

export type OrderItem = {
  items: CartItem[];
  orderPosition: number;
  orderTotal: string;
  paymentMethod: string;
};
