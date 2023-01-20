describe ("E2E - home page", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/");
        cy.get("[data-popup-button]").click();
      })

      it ("API request test", () => {
        cy.intercept("GET","https://api.mymemory.translated.net/*").as("translateRequest");
        // cy.get("[data-textarea-left]").type("test");
        cy.wait("@translateRequest");
        cy.get("@translateRequest").then(res => {
          expect(res.response.statusCode).to.equal(200)
        })
      })

    // it ("Expand language menu and select language", () => {
    //     cy.get("[data-button-lang-expand]").each((button)=>{
    //         cy.wrap(button).click();
    //         cy.get("[data-lang-list]>li").each((li)=>{
    //             cy.wrap(li).click({ force: true });
    //         })
    //     })
    //     })  


})