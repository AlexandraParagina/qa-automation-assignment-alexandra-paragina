import ContactPage from "../../pages/part1/ContactPage";
describe("Scenario 5: Check the contact form on the home page", () => {
  const contactPage = new ContactPage();

  beforeEach(() => {
    contactPage.visitContactPage();
  });

  // Test to verify the presence and attributes of form fields
  it("Should verify the contact form fields", () => {
    // check the name input field
    contactPage
      .getNameInput()
      .should("be.visible")
      .and("have.attr", "type", "text")
      .and("have.attr", "placeholder", "Your Name");

    // check the email input field
    contactPage
      .getEmailInput()
      .should("be.visible")
      .and("have.attr", "type", "email")
      .and("have.attr", "placeholder", "Email Address");

    // check the phone input field
    contactPage
      .getPhoneInput()
      .should("be.visible")
      .and("have.attr", "type", "tel")
      .and("have.attr", "placeholder", "Phone Number");

    // check the message textarea
    contactPage
      .getMessageInput()
      .should("be.visible")
      .and("have.attr", "placeholder", "Message");

    // check the checkbox
    contactPage
      .getCheckbox()
      .should("have.css", "opacity", "0")
      .and("not.be.checked");

    // check the submit button
    contactPage
      .getSubmitButton()
      .should("be.visible")
      .and("have.value", "Send Inquiry");
  });

  // Test to fill the form fields and verify the entered values
  it("Should fill all form fields with data and verify all values", () => {
    const testData = {
      name: "Jane Doe",
      company: "Tech Solutions Inc",
      email: "jane@tech.com",
      phone: "+40761089274",
      message: "I would like to inquire about your services",
    };

    // Fill each field
    contactPage.getNameInput().type(testData.name);
    contactPage.getCompanyInput().type(testData.company);
    contactPage.getEmailInput().type(testData.email);
    contactPage.getPhoneInput().type(testData.phone);
    contactPage.getMessageInput().type(testData.message);

    // Verify each field has the correct value
    contactPage.getNameInput().should("have.value", testData.name);
    contactPage.getCompanyInput().should("have.value", testData.company);
    contactPage.getEmailInput().should("have.value", testData.email);
    contactPage.getPhoneInput().should("have.value", testData.phone);
    contactPage.getMessageInput().should("have.value", testData.message);
  });

  // Test to clear a field and verify it's empty
  it("Should fill a field, clear it, and verify it's empty", () => {
    const testName = "Test User";

    contactPage
      .getNameInput()
      .type(testName)
      .should("have.value", testName)
      .clear()
      .should("have.value", "");
  });

  // Test to check the checkbox functionality
  it("Should check the checkbox when clicked", () => {
    contactPage
      .getCheckbox()
      .click({ force: true }) // Force click since it's hidden
      .should("be.checked");
  });

  // Test to uncheck the checkbox
  it("Should uncheck the checkbox when clicked again", () => {
    contactPage
      .getCheckbox()
      .click({ force: true }) // Force click since it's hidden
      .should("be.checked")
      .click({ force: true }) // Force click since it's hidden
      .should("not.be.checked");
  });

  // Test required name field validation
  it("Should show validation error when submitting without filling required name field", () => {
    contactPage.getSubmitButton().click();
    contactPage.getNameInput().then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  // Test reqired company field validation
  it("Should show validation error when submitting without filling required company field", () => {
    contactPage.getSubmitButton().click();
    contactPage.getCompanyInput().then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  // Test required email field validation
  it("Should show validation error when submitting without filling required email field", () => {
    contactPage.getSubmitButton().click();
    contactPage.getEmailInput().then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  // Test invalid email format validation
  it("Should show validation error when submitting with invalid email format", () => {
    contactPage.getEmailInput().type("invalid-email");
    contactPage.getSubmitButton().click();
    contactPage.getEmailInput().then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Please include an '@' in the email address. 'invalid-email' is missing an '@'.",
      );
    });
  });
});
