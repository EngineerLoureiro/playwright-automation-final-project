import { expect, Locator, Page, test } from "@playwright/test";
import { CATALOG_PAGE, CatalogItem } from "../data";

export class CatalogPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ===== Dynamic locators (by index) =====
  catalogItem(index: number, type: (index: number) => string) {
    return this.page.getByTestId(type(index));
  }

  async addProductsToCart(items: CatalogItem[]) {
    await test.step("Add Products to the cart", async () => {
      for (const item of items) {
        await this.catalogItem(
          item.position,
          CATALOG_PAGE.ITEM.BUTTON.ID
        ).click();

        if (item.expectedQuantity == 0) {
          await expect(
            this.catalogItem(item.position, CATALOG_PAGE.ITEM.BUTTON.ID)
          ).toBeDisabled();
        }
        await expect(
          this.catalogItem(item.position, CATALOG_PAGE.ITEM.QUANTITY.ID)
        ).toHaveText(`${item.expectedQuantity} units`);
      }
    });
  }
}
