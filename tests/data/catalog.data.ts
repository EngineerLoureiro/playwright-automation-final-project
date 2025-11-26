export const CATALOG_PAGE = {
  TITLE: {
    ID: "catalog-title",
    TEXT: "Product Catalog",
  },
  ITEM: {
    ID: (index: number) => `catalog-item-${index}`,
    BUTTON: {
      ID: (index: number) => `catalog-item-add-button-${index}`,
    },
    QUANTITY: {
      ID: (index: number) => `catalog-item-quantity-${index}`,
    },
  },
};

export type CatalogItem = {
  position: number;
  expectedQuantity: number;
};
