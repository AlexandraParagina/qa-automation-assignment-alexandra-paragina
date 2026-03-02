# Test Design

## About Structure

The project is organised around three deliberate architectural choices:

### 1. Separation by target application (Part 1 / Part 2)

The two websites under test — AirportLabs and eMAG — have different profiles.
Splitting specs and page objects into `part1/` and `part2/` keeps each context self-contained so that a failure or refactor on one site never ripples into the other.

### 2. Page Object Model

Every page that tests interact with its represented by a dedicated class (`HomePage`, `ContactPage`, `ProductsPage`, `ProductDetailsPage`, `CartPage`).
Selectors and low-level actions live inside these classes.
Test files only express intent (e.g. `productsPage.filterByBrand("LG")`). This means a selector change in eMAG's DOM requires editing exactly one file, not every test that touches that element.

### 3. Fixture-driven

Expected values (statistics text, styling properties) are externalised into `statistics.json` instead of being hardcoded in assertions.
Both patterns make it trivial to add new data points without duplicating test logic.

### 4. Hardcoded values

Since no design specification or style guide was provided, I treated the current live site as the source of truth.
The colours, font sizes, and font weights asserted in the tests (e.g. `font-size: 72px`, `color: rgb(82, 206, 147)`) were captured directly from the site and assumed to be the expected values.
If a design spec were available, these values would ideally come from a shared constants file or fixture so they could be updated in one place.

---

## What I would add with 2 more hours

1. **Negative and edge-case coverage for Part 2** — Add tests for empty-cart state, removing items from the cart and applying an invalid coupon code.
2. **More responsive viewport coverage for Part 1** — Right now tests only cover desktop and iPhone X. I would add tablet viewports (e.g. iPad) and other common screen sizes to catch layout issues that only appear at mid-range widths.
3. **Custom command to dismiss cookie banners** — Both sites show cookie consent pop-ups that can block interactions. I would add a reusable `cy.dismissCookies()` command in `commands.js` that runs in `beforeEach`, so tests don't fail because a cookie banner is covering a button or link.

---

## What is easy vs fragile to maintain

### Easy to maintain

1.  **Fixture-driven data (`statistics.json`)**
    Updating an expected value (e.g. if AirportLabs changes "18+ Years" to "19+ Years") is a single JSON edit — no test logic changes.
2.  **`normalizePrice()` utility**
    Pure function with no DOM dependency — easy to unit-test in isolation, and any locale change is handled in one place.
3.  **Custom commands (`shouldIncludeInUrl`)**
    It’s just a single simple helper function built on top of Cypress’s basic commands, so it’s very unlikely to break when we upgrade Cypress
4.  **Page objects for Part 1**
    Selectors target semantic classes or IDs (`#Your-Name`, `#email`, `.h1.home`). Changes are localised to one file.

### Fragile to maintain

1.  **Part 2 eMAG selectors**
    eMAG is a large, actively developed e-commerce site. Class names like `.megamenu-list-container`, `a.js-product-url`, and `button.sort-control-btn` are implementation details that can change without notice on any deployment.
    A selector refactor on eMAG's side breaks multiple page objects simultaneously.
2.  **Mega-menu hover interaction**
    The `realHover()` call depends on the `cypress-real-events` plugin and on eMAG's specific hover-triggered menu behaviour.
    Any redesign of the navigation (e.g. click-based menu, different structure) invalidates the entire `navigateToSubCategory` flow.
3.  **Single long E2E flow in Part 2**
    The shopping test chains TV selection → accessory selection → cart verification in one `it()` block.
    A failure at any step (e.g. no LG TVs match the 3-star filter today) fails the entire test.
4.  **Hardcoded CSS values in Part 1 style assertions**
    Asserting exact `font-size: 72px` or `color: rgb(82, 206, 147)` is precise but brittle — a minor design-system tweak (e.g. changing the green accent by a few shades) breaks the test even though the feature still works correctly.
