const el = require('./elements').ELEMENTS;

class Home {
  constructor() {
  }
  
  visit() {
    cy
      .visit('/')
  }

  searchCompanyName() {

    cy
      .get(el.login)
      .should('be.visible')
      .click();

    cy
      .get(el.search)
      .find('input')
      .clear()
      .type('picpay');
  }

  validateOptions(link) {
    switch (link) {
      case 'See jobs':
        cy
          .contains(el.seeJobs)
          .should('have.attr', 'href', 'https://picpay.gupy.io/')
        break;

        case 'Platform login':
          cy
            .contains(el.platformLogin)
            .should('have.attr', 'href', 'https://picpay.gupy.io/candidates/')
          break;
    
      default:
        break;
    }
  }
}

export default new Home();