import { expect, Locator, Page, test } from "@playwright/test";
import { CartItem, OrderItem, ORDERS_PAGE } from "../data";

export class OrdersPage {
  page: Page;
  emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyMessage = this.page.getByTestId(ORDERS_PAGE.EMPTY_MESSAGE.ID);
  }

  // ===== Dynamic locators to select cart items of each order =====
  orderItem(
    orderPosition: number,
    index: number,
    item: (orderPosition: number, index: number) => string
  ) {
    return this.page.getByTestId(item(orderPosition, index));
  }

  // ===== Dynamic locators to select cart total and payment method of each order =====

  orderInfo(orderPosition: number, info: (orderPosition: number) => string) {
    return this.page.getByTestId(info(orderPosition));
  }

  async verifyEmptyOrdersMessage() {
    await test.step("Verify Orders is Empty", async () => {
      await expect(this.emptyMessage).toHaveText(
        ORDERS_PAGE.EMPTY_MESSAGE.TEXT
      );
    });
  }

  async verifyOrdersItems(orders: OrderItem[]) {
    await test.step("Verify Order Items", async () => {
      for (const order of orders) {
        const orderPosition = order.orderPosition;

        expect(
          this.orderInfo(orderPosition, ORDERS_PAGE.ORDER.PAYMENTS_METHOD)
        ).toContainText(order.paymentMethod);
        expect(
          this.orderInfo(orderPosition, ORDERS_PAGE.ORDER.TOTAL)
        ).toContainText(order.orderTotal);

        for (const item of order.items) {
          expect(
            this.orderItem(
              orderPosition,
              item.position,
              ORDERS_PAGE.ORDER.ITEM.NAME
            )
          ).toContainText(item.name);
          expect(
            this.orderItem(
              orderPosition,
              item.position,
              ORDERS_PAGE.ORDER.ITEM.NAME
            )
          ).toContainText(item.quantity);
          expect(
            this.orderItem(
              orderPosition,
              item.position,
              ORDERS_PAGE.ORDER.ITEM.TOTAL
            )
          ).toContainText(item.total);
        }
      }
    });
  }
}
