class CategoryPage {
  // ---------------------- LOCATORS -----------------------
  // Filter locators
  brandContainer = '[data-type="brand"]';
  ratingContainer = '[data-type="rating"]';
  seeMoreButton = ".filter-extra-options-btn";

  // Filter Pop-up locators
  filterPopup = ".ph-popup";
  searchInput = "input.js-filter-search";
  applyFiltersButton = "button.js-set-options";

  // Sort dropdown locator
  sortDropdown = "button.sort-control-btn:visible";

  // Product locators
  productItem = "[data-product-id]";
  productLink = "a.js-product-url";

  // ---------------------- GETTERS ---------------------------
  // Get the product items on the category page
  getProductItems() {
    return cy.get(this.productItem);
  }

  // ------------------ ACTION METHODS -----------------

  // Filter by brand with the specified brand name
  filterByBrand(brandName) {
    // Click on the "See more" button to expand the brand filter options
    cy.get(this.brandContainer)
      .should("be.visible")
      .within(() => {
        cy.get(this.seeMoreButton).click();
      });

    // In the filter pop-up, search for the specified brand name, select the brand option, and apply the filters
    cy.get(this.filterPopup)
      .should("be.visible")
      .within(() => {
        cy.get(this.searchInput)
          .should("be.visible")
          .click()
          .clear()
          .type(brandName);
        this.selectBrandOption(brandName);
        cy.get(this.applyFiltersButton).should("be.visible").click();
      });

    return this;
  }

  // Select the brand option with the specified name
  selectBrandOption(brandName) {
    cy.get(`a[data-name='${brandName}']`).click();
    return this;
  }

  // Filter by minimum rating with the specified value
  filterByMinRating(minRating) {
    this.selectRatingOption(minRating);
    return this;
  }

  // Select the rating option with the specified minimum rating value
  selectRatingOption(minRating) {
    cy.get(this.ratingContainer)
      .should("be.visible")
      .find(`[data-option-id="${minRating}-5"]`)
      .click();
    return this;
  }

  // Open the sort dropdown
  openSortDropdown() {
    cy.contains(this.sortDropdown, "Cele mai populare")
      .scrollIntoView()
      .should("be.visible")
      .click();
    return this;
  }

  // Select the sort option with the specified name
  selectSortOption(optionName) {
    cy.contains("a.js-sort-option", optionName).click({ force: true });
    return this;
  }

  // Select the first product item from the category page
  selectFirstProduct() {
    cy.get(this.productItem)
      .should("exist")
      .first()
      .within(() => {
        cy.get(this.productLink).first().click();
      });

    return this;
  }
}
export default CategoryPage;
