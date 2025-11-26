export const INVENTORY_PAGE = {
  TITLE: {
    ID: "inventory-title",
    TEXT: "Inventory Management",
  },
  INPUT: {
    NAME: "inventory-input-name",
    PRICE: "inventory-input-price",
    QUANTITY: "inventory-input-quantity",
  },
  SUBMIT_BUTTON: {
    ID: "inventory-submit-button",
    TEXT: "Add Product",
  },
  LIST: {
    ID: "inventory-product-list",
    PRODUCT: {
      ID: (index: number) => `inventory-product-${index}`,
      QUANTITY: (index: number) => `inventory-product-quantity-${index}`,
    },
  },
};

export type InventoryProduct = {
  name: string;
  price: string;
  quantity: string;
};

export const NEW_INVENTORY_PRODUCT = {
  VALID: {
    NAME: "Ring of Power",
    PRICE: "500",
    QUANTITY: "20",
  },
};
