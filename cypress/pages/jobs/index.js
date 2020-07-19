const el = require('./elements').ELEMENTS;

class Jobs {
  clickOpportunityPage() {
    cy
      .get(el.opportunityPage)
      .should('exist')
      .click();
  }

  applyJob() {
    cy
      .contains('Candidatar')
      .first()
      .should('exist')
      .click();
    cy
      .contains('Sobre você');
  }
}

export default new Jobs();