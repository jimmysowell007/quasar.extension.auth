describe("User authentification ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/login");
    cy.fixture("users.json").then((userfixture) => {
      this.userfixture = userfixture;
    });
  });
  context("As an existing user I can authenticate", () => {
    it("should not submit login when email and password is empty", () => {
      cy.get("[data-cy=email]");
      cy.get("[data-cy=password]");
      cy.get("[data-cy=submit-login]").should("be.disabled");
    });

    it("should fill input with good email format and at least 6 characters for password", () => {
      cy.get("[data-cy=email]")
      .type("Sowell")
      cy.get("[data-cy=password]")
      .trigger('mousedown', 'topRight').click()
      cy.get(".q-field__messages > div")
      .should("contain.text", "The email is not valid")
      .should("have.css", "color", "rgb(193, 0, 21)");

      cy.get("[data-cy=password")
      .type("12345")
      .invoke('val')  
      .should('have.length', 5);

      cy.get("[data-cy=submit-login]").should("be.disabled");
    });

    it("should not fill bad password with right email", () => {
      cy.get("[data-cy=email]").type(this.userfixture.validUser.email);
      cy.get("[data-cy=password]").type('badPassword');
      cy.get("[data-cy=submit-login]")
        .click()
        .then(() => {
          cy.intercept(
            {
              method: "POST",
              url: "/users/sign_in",
              body: {
                email: this.userfixture.validUser.email,
                password: this.userfixture.validUser.password,
              },
            },
            {
              statusCode: 403
            } 
          ).as("loginPost");
        });
    });

    it("should fill login form with correct email and password and being redirected to homepage on submit", () => {
      cy.get("[data-cy=email]").type(this.userfixture.validUser.email);
      cy.get("[data-cy=password]").type(this.userfixture.validUser.password);
      cy.get("[data-cy=submit-login]")
        .click()
        .then(() => {
          // stub post request  and response stubbing
          cy.intercept(
            {
              method: "POST",
              url: "/users/sign_in",
              body: {
                email: this.userfixture.validUser.email,
                password: this.userfixture.validUser.password,
              },
            },
            //force response Api  mocking
            {
              statusCode: 201,
              body: { jwt: this.userfixture.validUser.goodToken },
            } 
          ).as("loginPost");
        });
      cy.decode(this.userfixture.validUser.goodToken).should('eq','{"name":"dupon dupon","role":"superadmin"}')
      // check user is redirected to the next page
      cy.location("pathname", { timeout: 10000 }).should("eq", "/");
    });
  });

  context("As an anonymous I should not authenticate with bad credentials", () => {
    it("should fill login form with user credentials and get error on submit", () => {
      cy.get("[data-cy=email]").type(this.userfixture.invalidUser.email);
      cy.get("[data-cy=password]").type(this.userfixture.invalidUser.password);
      cy.get("[data-cy=submit-login]")
        .click()
        .then(() => {
          cy.intercept(
            "POST",
            "/users/sign_in",
            {
              body: {
                email: this.userfixture.validUser.email,
                password: this.userfixture.validUser.password,
              },
            },
            {
              statusCode: 404,
              body: {},
            }
          ).as("loginPost");
        });
      // check that token is empty
      // decode token and check its expiration 
      cy.decode(this.userfixture.validUser.badToken ).should('eq',undefined);
      // Show notification
      cy.get(".q-notification__message").should(
        "contain.text",
        "Incorrect credentials"
      );
    });
  });
});