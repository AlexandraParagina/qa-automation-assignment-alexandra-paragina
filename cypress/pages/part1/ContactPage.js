class ContactPage {
  //----------------------- LOCATORS ------------------------
  
  // Form field locators
  nameInoput = "#Your-Name";
  companyInput = "#Company-Name";
  emailInput = "#email";
  phoneInput = "#Contact";
  messageInput = "#Message";
  checkbox = "#checkbox";
  submitButton = ".button.bg-white.w-button";

  //----------------------- NAVIGATION ------------------------
  
  visitContactPage() {
    cy.visit(Cypress.env("siteBaseUrl1") + "/other/get-in-touch");
  }

  //----------------------- GETTERS ------------------------
  
  // Get the name input field
  getNameInput() {
    return cy.get(this.nameInoput);
  }
  // Get the company input field
  getCompanyInput() {
    return cy.get(this.companyInput);
  }
  // Get the email input field
  getEmailInput() {
    return cy.get(this.emailInput);
  }
  // Get the phone input field
  getPhoneInput() {
    return cy.get(this.phoneInput);
  }
  //  Get the message textarea
  getMessageInput() {
    return cy.get(this.messageInput);
  }
  //  Get the checkbox element
  getCheckbox() {
    return cy.get(this.checkbox);
  }
  // Get the submit button element
  getSubmitButton() {
    return cy.get(this.submitButton);
  }
}

export default ContactPage;
