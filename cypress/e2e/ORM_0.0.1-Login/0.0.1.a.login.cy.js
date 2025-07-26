import LoginPage from "../../support/pageObjects/LoginPage";

describe("Fitur Login OrangeHRM", () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  afterEach(() => {
    cy.screenshot("login/login_test");
  });

  it("Login berhasil dengan username dan password valid", () => {
    cy.intercept("GET", "/web/index.php/dashboard/index").as("loginRequest");

    loginPage.login("Admin", "admin123");

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain", "Dashboard");
  });

  it("Login gagal dengan username salah", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginRequest");

    loginPage.login("Adminx", "admin123");

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 302);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("Login gagal dengan password salah", () => {
    cy.intercept("POST", "/web/index.php/auth/validate").as("loginRequest");

    loginPage.login("Admin", "wrongpass");

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 302);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });
});
