import ForgotPasswordPage from "../../support/pageObjects/ForgotPassword";
const forgotPage = new ForgotPasswordPage();

describe("Forgot Password Feature", () => {
  beforeEach(() => {
    forgotPage.visit();
  });

  afterEach(() => {
    cy.screenshot("login/forgot_password_test");
  });

  it("Send reset password request", () => {
    forgotPage.clickForgotPassword();
    forgotPage.enterUsername("admin345");

    cy.intercept("POST", "/web/index.php/auth/requestResetPassword").as(
      "resetRequest"
    );

    forgotPage.clickReset();

    cy.wait("@resetRequest").its("response.statusCode").should("eq", 302);
    cy.get(".orangehrm-forgot-password-title").should(
      "contain",
      "Reset Password link sent successfully"
    );
  });
});
