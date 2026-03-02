# QA Automation Assignment

Cypress end-to-end test suite covering two target websites:

- **Part 1** — [AirportLabs](https://www.airportlabs.com) (static site validation)
- **Part 2** — [eMAG](https://www.emag.ro) (shopping flow)

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** (bundled with Node.js)

## Installation

```bash
# Clone the repository
git clone https://github.com/AlexandraParagina/qa-automation-assignment-alexandra-paragina.git
cd qa-automation-assignment-alexandra-paragina

# Install dependencies (includes Cypress and cypress-real-events)
npm install

# If you need to install cypress-real-events separately
npm install --save-dev cypress-real-events
```

## Running the Tests

### Interactive mode (Cypress Test Runner)

```bash
npx cypress open
```

This opens the Cypress Test Runner UI where you can:
1. Select **E2E Testing**
2. Choose a browser (eg. Chrome, Firefox, Electron)
3. Click on any spec file to run it and watch the tests execute in real time

### Headless mode (CI-friendly)

```bash
# Run all tests
npx cypress run

# Run only Part 1 tests
npx cypress run --spec "cypress/e2e/part1/**/*.cy.js"

# Run only Part 2 tests
npx cypress run --spec "cypress/e2e/part2/**/*.cy.js"
```

---

## Cypress Version

| Package | Version |
|---------|---------|
| cypress | ^15.10.0 |
| cypress-real-events | ^1.15.0 |

---

## Configuration Highlights

Defined in `cypress.config.js`:

| Setting | Value |
|---------|-------|
| `defaultCommandTimeout` | 10 000 ms |
| `pageLoadTimeout` | 30 000 ms |
| `env.siteBaseUrl1` | `https://www.airportlabs.com` |
| `env.siteBaseUrl2` | `https://www.emag.ro` |

---

## Project Structure

```
├── cypress.config.js              # Cypress configuration (timeouts, base URLs)
├── package.json                   # Project metadata & dependencies
│
└── cypress/
    ├── e2e/                       # Test specs
    │   ├── part1/                 # AirportLabs tests
    │   │   ├── scenario1-check-title.cy.js          # Hero header text & styles (desktop + mobile)
    │   │   ├── scenario2-check-statistics.cy.js     # Statistics values & styling (fixture-driven)
    │   │   ├── scenario3-check-social-media-links.cy.js  # Social media link attributes & navigation
    │   │   ├── scenario4-check-logo.cy.js           # Logo visibility & dimensions
    │   │   └── scenario5-check-contact-form.cy.js   # Contact form fields, validation & interaction
    │   │
    │   └── part2/                 # eMAG tests
    │       └── check-shopping-site.cy.js            # E2E shopping flow: navigate, filter, sort,
    │                                                #   add to cart, verify cart totals
    │
    ├── fixtures/                  # Test data
    │   └── statistics.json        # Data-driven values for statistics scenario
    │
    ├── pages/                     # Page Object Model classes
    │   ├── part1/
    │   │   ├── HomePage.js        # AirportLabs homepage selectors & getters
    │   │   └── ContactPage.js     # AirportLabs contact form selectors & getters
    │   └── part2/
    │       ├── HomePage.js        # eMAG mega-menu navigation helpers
    │       ├── ProductsPage.js    # Product listing: filter, sort, select
    │       ├── ProductDetailsPage.js  # PDP: extract product info, add to cart
    │       └── CartPage.js        # Cart: item details & total verification
    │
    ├── support/
    │   ├── commands.js            # Custom Cypress commands (e.g. shouldIncludeInUrl)
    │   ├── e2e.js                 # Global setup, imports commands & cypress-real-events
    │   └── utils.js               # Utility functions (e.g. normalizePrice for Romanian prices)
    │
    └── screenshots/               # Auto-captured screenshots on test failure
```

---

## Key Patterns & Practices

| Pattern | Description |
|---------|-------------|
| **Page Object Model** | Each page has a dedicated class encapsulating selectors and interactions, keeping tests readable and maintainable. |
| **Fixture-driven tests** | Test data (e.g. expected statistics) is stored in JSON fixtures and loaded with `cy.fixture()`. |
| **Custom commands** | Reusable assertions like `cy.shouldIncludeInUrl()` are defined in `commands.js`. |
| **Utility functions** | Shared helpers such as `normalizePrice()` handle locale-specific formatting (prices). |
| **Responsive testing** | Part 1 tests verify behaviour across desktop and mobile viewports using `cy.viewport()`. |
| **Data-driven iteration** | Tests iterate over arrays of test cases (e.g. social media links) for concise, parameterised coverage. |
| **Real browser events** | The `cypress-real-events` plugin is used for native hover interactions on eMAG's mega menu. |
