import { normalizePrice } from "../../support/utils";

class CartPage {
  // ----------------------- LOCATORS --------------------------

  // Cart locators
  cartButton = "#my_cart";
  cartItems = ".cart-widget.cart-line";
  cartProductName = ".line-item-title.main-product-title";
  cartItemsPrice = ".product-new-price";
  totalPrice = ".order-summary-line";

  // ----------------------- GETTERS ---------------------------

  // Get the cart items
  getCartItems() {
    return cy.get(this.cartItems);
  }

  // ------------------------ ACTION METHODS -----------------------

  // Navigate to the cart page
  navigateToCart() {
    cy.get(this.cartButton).should("be.visible").click();
  }

  // Get the product name of a cart item by its index
  getItemBrandByIndex(index) {
    return cy
      .get(this.cartItems)
      .eq(index)
      .find(this.cartProductName)
      .invoke("text")
      .then((text) => text.trim());
  }

  // Get the price of a cart item by its index
  getItemPriceByIndex(index) {
    return cy
      .get(this.cartItems)
      .eq(index)
      .find(this.cartItemsPrice)
      .invoke("text")
      .then((priceText) => {
        return normalizePrice(priceText);
      });
  }

  // Get the total price from the cart summary
  getTotalPrice() {
    return cy
      .get(this.totalPrice)
      .invoke("text")
      .then((priceText) => {
        return normalizePrice(priceText);
      });
  }
}

export default CartPage;
