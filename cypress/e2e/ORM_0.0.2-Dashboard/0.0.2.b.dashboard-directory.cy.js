describe("Dashboard Access", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  afterEach(() => {
    cy.screenshot("dashboard/dashboard_access_directory_test");
  });

  it("Setelah login, user berada di halaman Direktory", () => {
    cy.intercept(
      "GET",
      "/web/index.php/api/v2/directory/employees?nameOrId="
    ).as("searchEmployee");

    cy.get("span.oxd-text").contains("Directory").click();

    cy.get("input[placeholder='Type for hints...']").type("Jelena13123", {
      delay: 150,
    });

    cy.get(".oxd-autocomplete-option").contains("Jelena13123 2131 s").click();

    // cy.contains("label", "Job Title")
    //   .parents(".oxd-input-group")
    //   .find(".oxd-select-text")
    //   .click();
    // cy.get(".oxd-select-option").contains("QA Engineer").click();

    cy.contains("label", "Location")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();
    cy.get(".oxd-select-option").contains("Texas R&D").click();

    cy.get("button[type='submit']").contains("Search").click();
  });
});
