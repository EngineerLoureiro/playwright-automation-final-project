export const PAYMENTS_PAGE = {
  TITLE: {
    ID: "payment-title",
    TEXT: "Payment",
  },
  EMPTY_MESSAGE: {
    ID: "payment-empty-message",
    TEXT: "No items to pay.",
  },
  ITEM: {
    ID: (index: number) => `payment-cart-item-${index}`,
    TOTAL: (index: number) => `payment-item-total-${index}`,
    INFO: (index: number) => `payment-item-info-${index}`,
  },
  TOTAL: {
    ID: "payment-total",
  },
  METHOD: {
    ID: "payment-methods-section",
    TITLE: "Payment Method:",
    LIST: {
      ID: "payment-methods-list",
    },
  },

  CONFIRM_BUTTON: {
    ID: "payment-confirm-button",
  },
};
