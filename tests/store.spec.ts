import { expect, test } from "@playwright/test";
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
  OrderItem,
  ORDERS_PAGE,
  PAYMENT_METHODS,
} from "./data";

test.beforeEach(async ({ page }) => {
  await page.goto("/store");
});

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

test("Successful Purchase", async ({ page }) => {
  const store = new StorePage(page);
  const cart = new CartPage(page);
  const orders = new OrdersPage(page);
  const catalog = new CatalogPage(page);
  const payments = new PaymentsPage(page);

  const catalogItemsFirstPurchase: CatalogItem[] = [
    {
      position: 0,
      expectedQuantity: 1,
    },
    {
      position: 1,
      expectedQuantity: 14,
    },
    {
      position: 1,
      expectedQuantity: 13,
    },
  ];
  const catalogItemsSecondPurchase: CatalogItem[] = [
    {
      position: 0,
      expectedQuantity: 0,
    },
    {
      position: 1,
      expectedQuantity: 12,
    },
    {
      position: 1,
      expectedQuantity: 11,
    },
  ];

  const cartItems: CartItem[] = [
    {
      name: "Lightsaber (Star Wars)",
      quantity: "1",
      price: "€9999.99",
      total: "€9999.99",
      position: 0,
    },
    {
      name: "Giant Rubber Duck",
      quantity: "2",
      price: "€49.99",
      total: "€99.98",
      position: 1,
    },
  ];

  const orderItemFirstPurchase: OrderItem = {
    items: cartItems,
    orderPosition: 0,
    orderTotal: "€10099.97",
    paymentMethod: PAYMENT_METHODS.MBWAY.TEXT,
  };

  const orderItemSecondPurchase: OrderItem = {
    items: cartItems,
    orderPosition: 1,
    orderTotal: "€10099.97",
    paymentMethod: PAYMENT_METHODS.MBWAY.TEXT,
  };

  await test.step("First Purchase", async () => {
    await store.navigateToStore();
    await store.navigateToCatalogTab();
    await catalog.addProductsToCart(catalogItemsFirstPurchase);
    await store.navigateToCartTab();
    await cart.verifyCartItems(cartItems);
    await store.navigateToPaymentsTab();
    await payments.verifyPaymentsItems(cartItems);
    await payments.confirmPayment(PAYMENT_METHODS.MBWAY.ID);
    await expect(page.getByTestId(ORDERS_PAGE.TITLE.ID)).toBeVisible();
    await orders.verifyOrdersItems([orderItemFirstPurchase]);
    await store.navigateToCartTab();
    await cart.verifyEmptyCartMessage();
    await store.navigateToPaymentsTab();
    await payments.verifyEmptyPaymentsMessage();
  });

  await test.step("Second Purchase", async () => {
    await store.navigateToCatalogTab();
    await catalog.addProductsToCart(catalogItemsSecondPurchase);
    await store.navigateToCartTab();
    await cart.verifyCartItems(cartItems);
    await store.navigateToPaymentsTab();
    await payments.verifyPaymentsItems(cartItems);
    await payments.confirmPayment(PAYMENT_METHODS.MBWAY.ID);
    await expect(page.getByTestId(ORDERS_PAGE.TITLE.ID)).toBeVisible();
    await orders.verifyOrdersItems([orderItemSecondPurchase]);
    await store.navigateToCartTab();
    await cart.verifyEmptyCartMessage();
    await store.navigateToPaymentsTab();
    await payments.verifyEmptyPaymentsMessage();
  });
});
