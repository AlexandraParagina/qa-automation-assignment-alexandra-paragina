class HomePage {
  // ---------------------- LOCATORS --------------------------
  productsTrigger = "[data-test='NavbarAuxDepartments']";
  megaMenuContainer = ".megamenu-list-container";
  megaMenuCategory = ".megamenu-list-department__department-name";
  megaMenuSubCategory = ".megamenu-group a";

  // ---------------------- NAVIGATION ------------------------
  visitHomePage() {
    cy.visit(Cypress.env("siteBaseUrl2"));
  }

  // ---------------------- GETTERS ----------------------------

  megaMenu() {
    return cy.get(this.megaMenuContainer);
  }

  subCategoryByName(subCategoryName) {
    return cy.contains(this.megaMenuSubCategory, subCategoryName);
  }

  categoryByName(categoryName) {
    return this.megaMenu().contains(categoryName);
  }

  // ---------------------- ACTIONS ----------------------------

  openMegaMenu() {
    // Click the products trigger to open the mega menu
    cy.get(this.productsTrigger).should("be.visible").click();

    // Verify that the mega menu becomes visible after clicking
    this.megaMenu().should("be.visible");

    return this;
  }

  hoverCategory(categoryName) {
    this.categoryByName(categoryName).should("be.visible").realHover();

    return this;
  }

  clickSubCategory(subCategoryName) {
    // Some subcategories may be inside a collapsed group in the mega menu,
    // so use force click to handle hidden elements within the DOM.
    this.subCategoryByName(subCategoryName)
      .should("exist")
      .click({ force: true });

    return this;
  }

  // ----------------------- COMPLETE FLOW -----------------

  navigateToSubCategory(categoryName, subCategoryName) {
    this.openMegaMenu()
      .hoverCategory(categoryName)
      .clickSubCategory(subCategoryName);

    return this;
  }
}

export default HomePage;
