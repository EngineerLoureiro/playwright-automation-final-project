import { test } from "@playwright/test";
import {
  StorePage,
  InventoryPage,
  CartPage,
  OrdersPage,
  CatalogPage,
  PaymentsPage,
} from "./pages";
import {
  CartItem,
  CatalogItem,
  InventoryProduct,
  NEW_INVENTORY_PRODUCT,
} from "./data";

test("Verify Navigation", async ({ page }) => {
  const store = new StorePage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const orders = new OrdersPage(page);
  const catalog = new CatalogPage(page);
  const payments = new PaymentsPage(page);
  const newProduct: InventoryProduct = {
    name: NEW_INVENTORY_PRODUCT.VALID.NAME,
    price: NEW_INVENTORY_PRODUCT.VALID.PRICE,
    quantity: NEW_INVENTORY_PRODUCT.VALID.QUANTITY,
  };
  const catalogItem: CatalogItem = {
    position: 0,
    expectedQuantity: 1,
  };
  const cartItem: CartItem = {
    name: "Lightsaber (Star Wars)",
    quantity: "1",
    price: "€9999.99",
    total: "€9999.99",
    position: 0,
  };

  await store.navigateToStore();
  await store.navigateToInventoryTab();
  await inventory.createValidProduct(newProduct);

  await store.navigateToCartTab();
  await cart.verifyEmptyCartMessage();
  await store.navigateToPaymentsTab();
  await payments.verifyEmptyPaymentsMessage();
  await store.navigateToOrderTab();
  await orders.verifyEmptyOrdersMessage();

  await store.navigateToCatalogTab();
  await catalog.addProductsToCart([catalogItem]);
  await store.navigateToCartTab();
  await cart.verifyCartItems([cartItem]);
  await store.navigateToPaymentsTab();
  await payments.verifyPaymentsItems([cartItem]);

  await store.navigateToInventoryTab();
  await inventory.verifyInventoryItems([catalogItem]);
  await store.navigateToOrderTab();
  await orders.verifyEmptyOrdersMessage();
});
