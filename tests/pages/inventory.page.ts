import { expect, Locator, Page, test } from "@playwright/test";
import {
  CatalogItem,
  INVENTORY_PAGE,
  InventoryProduct,
  NEW_INVENTORY_PRODUCT,
} from "../data";

export class InventoryPage {
  page: Page;
  productNameInput: Locator;
  priceInput: Locator;
  quantityInput: Locator;
  submitProduct: Locator;
  productList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameInput = this.page.getByTestId(INVENTORY_PAGE.INPUT.NAME);
    this.priceInput = this.page.getByTestId(INVENTORY_PAGE.INPUT.PRICE);
    this.quantityInput = this.page.getByTestId(INVENTORY_PAGE.INPUT.QUANTITY);
    this.submitProduct = this.page.getByTestId(INVENTORY_PAGE.SUBMIT_BUTTON.ID);
    this.productList = this.page.getByTestId(INVENTORY_PAGE.LIST.ID);
  }

  // ===== Dynamic locators (by index) =====
  productItem(index: number, type: (index: number) => string) {
    return this.page.getByTestId(type(index));
  }

  async createValidProduct(newProduct: InventoryProduct) {
    await test.step("Create Valid Product in Inventory Tab", async () => {
      let productCount = await this.productList.locator("li").count();
      console.log(productCount);
      await this.productNameInput.fill(newProduct.name);
      await this.priceInput.fill(newProduct.price);
      await this.quantityInput.fill(newProduct.quantity);
      await this.submitProduct.click();

      const product = this.productItem(
        productCount++,
        INVENTORY_PAGE.LIST.PRODUCT.ID
      );

      await expect(product).toBeVisible();
      await expect(product).toContainText(newProduct.name);
      await expect(product).toContainText(newProduct.price);
      await expect(product).toContainText(newProduct.quantity);
    });
  }

  async verifyInventoryItems(items: CatalogItem[]) {
    await test.step("Verify Inventory Items", async () => {
      for (const item of items) {
        const position = item.position;
        const productQuantity = this.productItem(
          position,
          INVENTORY_PAGE.LIST.PRODUCT.QUANTITY
        );

        expect(productQuantity).toContainText(`${item.expectedQuantity}`);
      }
    });
  }
}
