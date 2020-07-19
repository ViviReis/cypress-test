var faker = require('faker-br');

var token;

Cypress.Commands.add('getRoute', (method, apiServer, route) => {
  cy
    .route(method, apiServer)
    .as(route)
})

Cypress.Commands.add('signup', () => {
  var name = faker.name.firstName();
  var lastName = faker.name.lastName();
  var randomCpf = faker.br.cpf();
  var counter = Math.floor(Math.random() * 10000000 + 1);
  var email = 'auto.test' + counter + '@auto.com';
  var randomPassword = faker.internet.password();
  
  cy.request({
    url: `${Cypress.env('apiServer')}` + '/candidates/users/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
            "name": name,
            "lastName": lastName,
            "defaultLanguage": "pt",
            "password": randomPassword,
            "email": email,
            "emailConfirmation": email,
            "agree": true,
            "countryOfOrigin": "BR",
            "taxpayerRegistry": randomCpf,
            "subdomain": "picpay"
    }
  })
    .then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body)
        .to.have.property('token')
        .and.not.be.empty
      token = resp.body.token
    })
    Cypress.env('cpfTest', randomCpf);
    Cypress.env('emailTest', email);
    Cypress.env('passwordTest', randomPassword); 
})