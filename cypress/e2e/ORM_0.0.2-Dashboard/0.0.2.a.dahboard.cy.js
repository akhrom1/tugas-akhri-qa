describe("Dashboard Access", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  afterEach(() => {
    cy.screenshot("dashboard/dashboard_access_test");
  });
  it("Setelah login, user berada di halaman dashboard", () => {
    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain", "Dashboard");
  });
});
