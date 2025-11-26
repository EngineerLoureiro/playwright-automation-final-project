import { expect, Locator, Page, test } from "@playwright/test";
import { ORDERS_PAGE } from "../data";

export class OrdersPage {
  page: Page;
  emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyMessage = this.page.getByTestId(ORDERS_PAGE.EMPTY_MESSAGE.ID);
  }

  async verifyEmptyOrdersMessage() {
    await test.step("Verify Orders is Empty", async () => {
      await expect(this.emptyMessage).toHaveText(
        ORDERS_PAGE.EMPTY_MESSAGE.TEXT
      );
    });
  }
}
