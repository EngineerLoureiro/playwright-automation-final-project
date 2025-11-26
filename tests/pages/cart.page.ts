import { expect, Locator, Page, test } from "@playwright/test";
import { CartItem, CART_PAGE } from "../data";

export class CartPage {
  page: Page;
  emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyMessage = this.page.getByTestId(CART_PAGE.EMPTY_MESSAGE.ID);
  }

  // ===== Dynamic locators (by index) =====
  cartItem(index: number, type: (index: number) => string) {
    return this.page.getByTestId(type(index));
  }

  async verifyEmptyCartMessage() {
    await test.step("Verify Cart is Empty", async () => {
      await expect(this.emptyMessage).toHaveText(CART_PAGE.EMPTY_MESSAGE.TEXT);
    });
  }

  async verifyCartItems(items: [CartItem]) {
    await test.step("Verify Cart Items", async () => {
      for (const item of items) {
        const position = item.position;
        const cartItemInfo = this.cartItem(position, CART_PAGE.ITEM.INFO);

        expect(cartItemInfo).toContainText(item.name);
        expect(cartItemInfo).toContainText(item.quantity);
        expect(cartItemInfo).toContainText(item.price);
        expect(this.cartItem(position, CART_PAGE.ITEM.TOTAL)).toContainText(
          item.total
        );
      }
    });
  }
}
