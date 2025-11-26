export const CART_PAGE = {
  TITLE: {
    ID: "cart-title",
    TEXT: "Your Cart",
  },
  EMPTY_MESSAGE: {
    ID: "cart-empty-message",
    TEXT: "Your cart is empty.",
  },
  ITEM: {
    ID: (index: number) => `cart-item-${index}`,
    TOTAL: (index: number) => `cart-item-total-${index}`,
    INFO: (index: number) => `cart-item-info-${index}`,
  },

  TOTAL: {
    ID: "cart-total",
  },
};

export type CartItem = {
  name: string;
  quantity: string;
  price: string;
  total: string;
  position: number;
};
