import { contains } from "cypress/types/jquery";

describe("Logg in feature", () => {
  const userData = {
    username: "Julys17",
    password: "samuel.17",
  };

  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/index.html");
    cy.get("#login2").click();
    cy.get("#loginusername").should("be.visible");
    cy.get("#loginusername").type(userData.username, { force: true });
    cy.get("#loginpassword").type(userData.password);
    cy.get(".btn-primary").contains("Log in").click();
  });

  it("Validating successful login", () => {
    cy.get("a#nameofuser").should("contain.text", userData.username);
  });

  it("Add items to shopping cart", () => {
    let phone = 'a:contains("Samsung galaxy s6")';
    let laptop = 'a:contains("MacBook air")';
    let monitor = 'a:contains("Apple monitor 24")';

    cy.get("a#itemc").eq(0).contains("Phones").click();
    cy.get(phone).click();
    cy.get('div[id="tbodyid"] h2').should("contain.text", "Samsung galaxy s6");
    cy.get('div[id="tbodyid"] a').click();

    cy.get("li.active a").click();

    cy.get("a#itemc").eq(1).contains("Laptops").click();
    cy.get(laptop).click();
    cy.get('div[id="tbodyid"] h2').should("contain.text", "MacBook air");
    cy.get('div[id="tbodyid"] a').click();

    cy.get("li.active a").click();

    cy.get("a#itemc").eq(2).contains("Monitors").click();
    cy.get(monitor).click();
    cy.get('div[id="tbodyid"] h2').should("contain.text", "Apple monitor 24");
    cy.get('div[id="tbodyid"] a').click();
  });

  it("Verify total products value", () => {
    it("Verify total products value", () => {
      cy.get("a#cartur").click();
      let suma = 0;
      cy.get('tbody[id="tbodyid"] td').eq(2).each((cell) => {
        const value = parseFloat(cell.text());
        if (!isNaN(value)) {
          suma += value; }
      });
      cy.get('tbody[id="tbodyid"] td').eq(2).then(() => {
        cy.get("#totalp").should("contain", suma);
      });
    });
  });
    
  it("validation of purchase made", () => {
    cy.get("a#cartur").click();
    cy.get("div.row button").click();

    cy.get("#name").type("Juliana giraldo");
    cy.get("#country").type("Colombia");
    cy.get("#city").type("Bello");
    cy.get("#card").type("125475852412");
    cy.get("#month").type("Octubre");
    cy.get("#year").type("2023");
    cy.contains("button", "Purchase").click();
    cy.get('button[onclick="purchaseOrder()"]').click();
  });
  

  it("Validation of correct sending of contact message", () => {
    cy.get('a[data-target="#exampleModal"]').click();
    cy.get("input#recipient-email").type("Julys1500@gmail.com");
    cy.get("input#recipient-name").type("Juliana");
    cy.get("textarea#message-text").type("Gracias por contactanos");
    cy.contains("button", "Send message").click();
    cy.on("window:alert", (message) => {
      expect(message).to.contains("Thanks for the message!!");
    });
  });

});


