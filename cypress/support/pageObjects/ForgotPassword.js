class ForgotPasswordPage {
  visit() {
    cy.visit("/web/index.php/auth/login");
  }

  clickForgotPassword() {
    cy.contains("Forgot your password?").click();
  }

  enterUsername(username) {
    cy.get("input[placeholder='Username']").type(username);
  }

  clickReset() {
    cy.get("button[type='submit']").click();
  }
}

export default ForgotPasswordPage;
