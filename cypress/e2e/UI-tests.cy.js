describe ("E2E - home page", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/");
        cy.get("[data-popup-button]").click();
      })

    it ("Expand language menu and select language", () => {
        cy.get("[data-button-lang-expand]").each((button)=>{
            cy.wrap(button).click();
            cy.get("[data-lang-list]>li").each((li)=>{
                cy.wrap(li).click({ force: true });
            })
        })
        })  
})