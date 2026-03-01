import HomePage from "../../pages/part2/HomePage";
import ProductsPage from "../../pages/part2/ProductsPage";
import ProductDetailsPage from "../../pages/part2/ProductDetailsPage";
import CartPage from "../../pages/part2/CartPage";

describe("Scenario 1: Check the home page of the shopping site", () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const productDetailsPage = new ProductDetailsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    homePage.visitHomePage();
  });

  it("Should add filtered products to cart and validate item details and total amount", () => {
    // --- TV SELECTION STEPS ---
    // Open the TV menu and click on the "Televizoare" subcategory, then verify the URL contains "televizoare"
    homePage.navigateToSubCategory("TV, Audio-Video & Foto", "Televizoare");
    cy.shouldIncludeInUrl("televizoare");

    // Click on the LG brand filter option
    productsPage.filterByBrand("LG");
    cy.shouldIncludeInUrl("brand");

    // Filter by minimum 3-star rating
    productsPage.filterByMinRating(3);
    cy.shouldIncludeInUrl("3-5");

    // Sort by descending price
    productsPage.openSortDropdown().selectSortOption("Pret descrescator");
    cy.shouldIncludeInUrl("sort-pricedesc");

    // Select the first product item from the category page
    productsPage.selectFirstProduct();

    // Add product to cart
    productDetailsPage.getProductDetails().then((tv) => {
      productDetailsPage.addToCart().closeConfirmationModal();

      // Navigate back to home page for a clean menu state
      homePage.visitHomePage();

      // --- ACCESSORY SELECTION STEPS ---
      homePage.navigateToSubCategory("TV, Audio-Video & Foto", "Suporturi");

      // Click on the LG brand filter option
      productsPage.filterByBrand("LG");
      cy.shouldIncludeInUrl("brand");

      // Filter by minimum 3-star rating
      productsPage.filterByMinRating(3);
      cy.shouldIncludeInUrl("3-5");

      // Sort by ascending price
      productsPage.openSortDropdown().selectSortOption("Pret crescator");
      cy.shouldIncludeInUrl("sort-priceasc");

      // Select the first product item from the category page
      productsPage.selectFirstProduct();

      // Add accessory to cart and calculate expected total price
      productDetailsPage.getProductDetails().then((accessory) => {
        productDetailsPage.addToCart().closeConfirmationModal();

        const expectedTotal = tv.price + accessory.price;

        // --- CART VERIFICATION STEPS ---
        // Navigate to the cart page
        cartPage.navigateToCart();
        cy.shouldIncludeInUrl("cart");

        // Verify that are exactly 2 items in the cart
        cartPage.getCartItems().should("have.length", 2);

        // Verify the first product added in the cart has the correct name and price
        cartPage.getItemBrandByIndex(1).should("contain", tv.brand);
        cartPage.getItemPriceByIndex(1).should("equal", tv.price);

        // Verify the second product added in the cart has the correct name and price
        cartPage.getItemBrandByIndex(0).should("contain", accessory.brand);
        cartPage.getItemPriceByIndex(0).should("equal", accessory.price);

        // Verify the total price in the cart matches the expected total
        cartPage.getTotalPrice().should("eq", expectedTotal);
      });
    });
  });
});
