import { expect, Locator, Page, test } from "@playwright/test";
import {
  STORE_TABS,
  INVENTORY_PAGE,
  CART_PAGE,
  ORDERS_PAGE,
  CATALOG_PAGE,
} from "../data";
import { PAYMENTS_PAGE } from "../data/payments.data";

export class StorePage {
  page: Page;
  tabInput: (tab: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabInput = (tab: string) => this.page.getByTestId(`store-tab-${tab}`);
  }

  /**
   * Navigate to the /store page and validate it is loaded.
   */
  async navigateToStore() {
    await test.step("Navigate to home page", async () => {
      await this.tabInput(STORE_TABS.HOME).click();
      for (const tab of Object.values(STORE_TABS)) {
        await expect(this.tabInput(tab)).toBeVisible();
      }
    });
  }

  /**
   * Navigate to the inventory tab and validate it is loaded with the correct artifacts, such as Title, input buttons and products
   */
  async navigateToInventoryTab() {
    await test.step("Navigate to Inventory tab", async () => {
      await this.tabInput(STORE_TABS.INVENTORY).click();
      await expect(this.page.getByTestId(INVENTORY_PAGE.TITLE.ID)).toHaveText(
        INVENTORY_PAGE.TITLE.TEXT
      );
      for (const input of Object.values(INVENTORY_PAGE.INPUT)) {
        await expect(this.page.getByTestId(input)).toBeVisible();
      }
      const inventorySubmitButton = this.page.getByTestId(
        INVENTORY_PAGE.SUBMIT_BUTTON.ID
      );
      await expect(inventorySubmitButton).toBeEnabled();
      await expect(inventorySubmitButton).toHaveText(
        INVENTORY_PAGE.SUBMIT_BUTTON.TEXT
      );
    });
  }

  async navigateToCartTab() {
    await test.step("Navigate to Cart tab", async () => {
      await this.tabInput(STORE_TABS.CART).click();

      await expect(this.page.getByTestId(CART_PAGE.TITLE.ID)).toHaveText(
        CART_PAGE.TITLE.TEXT
      );
    });
  }

  async navigateToOrderTab() {
    await test.step("Navigate to Orders tab", async () => {
      await this.tabInput(STORE_TABS.ORDERS).click();

      await expect(this.page.getByTestId(ORDERS_PAGE.TITLE.ID)).toHaveText(
        ORDERS_PAGE.TITLE.TEXT
      );
    });
  }

  async navigateToCatalogTab() {
    await test.step("Navigate to Catalog tab", async () => {
      await this.tabInput(STORE_TABS.CATALOG).click();

      await expect(this.page.getByTestId(CATALOG_PAGE.TITLE.ID)).toHaveText(
        CATALOG_PAGE.TITLE.TEXT
      );
    });
  }

  async navigateToPaymentsTab() {
    await test.step("Navigate to Payments tab", async () => {
      await this.tabInput(STORE_TABS.PAYMENTS).click();

      await expect(this.page.getByTestId(PAYMENTS_PAGE.TITLE.ID)).toHaveText(
        PAYMENTS_PAGE.TITLE.TEXT
      );
    });
  }
}
