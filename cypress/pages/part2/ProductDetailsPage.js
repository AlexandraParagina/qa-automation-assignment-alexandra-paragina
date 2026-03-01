import { normalizePrice } from "../../support/utils";

class ProductDetailsPage {
  // ---------------- LOCATORS ------------------

  // Product details locators
  productName = "[data-test='page-title']";
  productPrice = "[data-test='main-price']";
  productBrand = "div.disclaimer-section.my-5 p a";

  // Add to cart button locator
  addToCartButton = "[data-test='main-add-to-cart-button']";

  //  Confirmation modal locators
  confirmationModal = ".modal-dialog.modal-lg";
  closeModalButton = "[data-test='atc-modal-close']";

  // ---------------- ACTION METHODS ------------------

  // Click on the "Add to Cart" button
  addToCart() {
    cy.get(this.addToCartButton).should("be.visible").click();
    return this;
  }

  // Get the product details
  getProductDetails() {
    const product = {};

    // Get and store product title
    return (
      cy
        .get(this.productBrand)
        .invoke("text")
        .then((brand) => {
          product.brand = brand.trim();
          cy.log(`Product brand: ${product.brand}`);
        })

        // Chain next command to ensure sequential execution
        .then(() => cy.get(this.productPrice).invoke("text"))

        // Normalize price format (e.g. 1.299,99 → 1299.99)
        .then((priceText) => {
          product.price = normalizePrice(priceText);
          return product;
        })
    );
  }

  // Close the confirmation modal
  closeConfirmationModal() {
    cy.get(this.confirmationModal).should("be.visible");
    cy.get(this.closeModalButton).click();
    cy.get(this.confirmationModal).should("not.exist");
    return this;
  }
}

export default ProductDetailsPage;
