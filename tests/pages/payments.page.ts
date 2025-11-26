import { expect, Locator, Page, test } from "@playwright/test";
import { PAYMENTS_PAGE } from "../data/payments.data";
import { CartItem } from "../data";

export class PaymentsPage {
  page: Page;
  emptyMessage: Locator;
  paymentMethodList: Locator;
  confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyMessage = this.page.getByTestId(PAYMENTS_PAGE.EMPTY_MESSAGE.ID);
    this.paymentMethodList = this.page.getByTestId(PAYMENTS_PAGE.METHOD.ID);
    this.confirmButton = this.page.getByTestId(PAYMENTS_PAGE.CONFIRM_BUTTON.ID);
  }

  // ===== Dynamic locators (by index) =====
  paymentItem(index: number, type: (index: number) => string) {
    return this.page.getByTestId(type(index));
  }

  paymentMethod(method: string) {
    return this.page.getByTestId(method);
  }

  async verifyEmptyPaymentsMessage() {
    await test.step("Verify Payments is Empty", async () => {
      await expect(this.emptyMessage).toHaveText(
        PAYMENTS_PAGE.EMPTY_MESSAGE.TEXT
      );
    });
  }

  async verifyPaymentsItems(items: CartItem[]) {
    await test.step("Verify Payments Items", async () => {
      for (const item of items) {
        const position = item.position;
        const cartItemInfo = this.paymentItem(
          position,
          PAYMENTS_PAGE.ITEM.INFO
        );

        expect(cartItemInfo).toContainText(item.name);
        expect(cartItemInfo).toContainText(item.quantity);
        expect(cartItemInfo).toContainText(item.price);
        expect(
          this.paymentItem(position, PAYMENTS_PAGE.ITEM.TOTAL)
        ).toContainText(item.total);
        expect(this.paymentMethodList).toBeVisible();
        expect(this.confirmButton).toBeVisible();
      }
    });
  }

  async confirmPayment(method: string) {
    await test.step("Select Payment Method and Click Confirm button", async () => {
      const paymentMethod = this.paymentMethod(method);
      await paymentMethod.click();

      await expect(paymentMethod).toBeChecked();

      await this.confirmButton.click();
    });
  }
}
