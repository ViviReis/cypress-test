const el = require('./elements').ELEMENTS;

var faker = require('faker-br');
var password = faker.internet.password();
var token;


class SignIn {

  visitSignIn() {
    cy.visit(`${Cypress.env('picPayUrl')}` + '/candidates/signin');
  }

  signupWeb() {
    this.createAccount();
    this.fillName();
    this.fillLastName();
    this.fillCpf('valid cpf');
    this.fillEmailAndEmailConfirmation('valid email');
    this.fillPassword();
    this.useTerms();
    this.createAccountButton();
    this.signinSuccessful();
  }

  signupApi(){
    cy
      .signup();
  }

  createAccount() {
    cy
      .get(el.createAccount)
      .should('exist')
      .click();

    if (
      cy
        .get(el.chooseLaguage)
        .should('be.visible')
        .first()
        .should('not.have.text', 'Português')
      )
    {
      cy
        .get(el.chooseLaguage)
        .should('be.visible')
        .first()
        .click();
      
      cy
        .get('li:first')
        .click({ force: true })
      cy
        .get(el.chooseLaguage)
        .should('have.text', 'Português');
    }
    
    else if (
      cy
        .get(el.chooseLaguage)
        .first()
        .should('have.text', 'Português')
      )
    {
      cy
        .get(el.originCountry)
        .last()
        .should('have.text', 'Brasil');
    }
  }

  fillName() {
    var name = faker.name.firstName();

    cy
      .wait(500)
      .get(el.name)
      .click()
      .focused()
      .type(name, {force: true});
  }

  fillLastName() {
    var lastName = faker.name.lastName();
    cy
      .get(el.lastName)
      .click()
      .focused()
      .type(lastName, {force: true})
      .should('have.value', lastName);
  }
    
  fillCpf(value) {
    var randomCpf = faker.br.cpf();

    switch (value) {
      case 'valid cpf':
        cy
          .get(el.taxpayerRegistry)
          .click()
          .focused()
          .type(randomCpf, {force: true});
        
        break;

      case 'invalid cpf':
        cy
          .get(el.taxpayerRegistry)
          .type('11111111110');
      
      break;

      case 'cpf already registered':
        cy
          .get(el.taxpayerRegistry)
          .click()
          .focused()
          .type('84451011370', {force: true});
      
      break;
    
      default:
        break;
    }
  }

  fillEmailAndEmailConfirmation(value) {
    var counter = Math.floor(Math.random() * 1000000 + 1);
    var email = 'auto.test' + counter + '@auto.com';

    switch (value) {
      case 'valid email':
        cy
          .get(el.email)
          .click()
          .focused()
          .type(email, {force: true});

        cy
          .get(el.emailConfirmation)
          .click()
          .focused()
          .type(email, {force: true});
        
        break;

      case 'invalid email':
        cy
          .get(el.email)
          .click()
          .focused()
          .type('vivi.teste.com', {force: true});
        
        cy
          .get(el.emailConfirmation)
          .click()
          .focused()
          .type('vivi.teste.com', {force: true});
        
        break;

      case 'email already registered':
        cy
          .get(el.email)
          .click()
          .focused()
          .type(`${Cypress.env('email')}`, {force: true});

        cy
          .get(el.emailConfirmation)
          .click()
          .focused()
          .type(`${Cypress.env('email')}`, {force: true});

          break;


      case 'different email of the confirmation email':
        cy
          .get(el.email)
          .click()
          .focused()
          .type(email, {force: true});

        cy
          .get(el.emailConfirmation)
          .click()
          .focused()
          .type('vivi_test001@vivi.com', {force: true});
            
        break;
    
      default:
        break;
    }
  } 

  fillPassword() {
    cy
      .get(el.password)
      .click()
      .focused()
      .type(password, {force: true});
  }

  useTerms() {
    cy
      .get(el.useTerms)
      .should('exist')
      .check({ force: true })
      .should('be.checked');
  }

  createAccountButton() {
    cy
      .get(el.createAccountButton)
      .click()
  }

  loginWeb(value, pass) {
    this.fillEmail(value)
    this.fillPass(pass)
    this.accessAccountButton();
  }

  fillEmail(value) {
    cy
      .get(el.email)
      .should('exist')
      .click()
      .focused()
      .type(value, {force: true});
  }

  fillPass(pass) {
    cy
      .get(el.password)
      .should('exist')
      .click()
      .focused()
      .type(pass, {force: true});
  }

  fillRegisteredCpf(value){
    cy
      .wait(1000)
      .get(el.cpf)
      .should('exist')
      .click()
      .focused()
      .type(value, {force: true});
  }

  accessAccountButton() {
    cy  
      .get(el.accessAccountButton)
      .should('exist')
      .click();
  }

  signinSuccessful() {
    cy
      .contains('Parece que você não tem candidaturas ainda');
  }

  loginSuccessful() {
    cy
      .contains('It seems like you don’t have applications yet');
  }

  errorfulSignin(result, error) {
    if (result === 'failed') {
      this.errorMessage(error);
    }

    else if (result === 'error'){
      cy
        .get(el.createAccountButton)
        .click();
    }
  }

  signupError(value, errorMesssage) {
    if(value === 'blank') {
      for(var i = 0; i < 1; i++) {
        cy
          .get(el.errorMessage)
          .eq(i)
          .should('have.text', errorMesssage);
      }
    }

    else if(value === 'error') {
        cy
          .get(el.errorMessage)
          .should('exist')
          .should('have.text', errorMesssage);
    }

    else if (value === 'invalid')
    cy
      .get(el.alertError)
      .should('exist')
      .should('have.text', errorMesssage);
  }

  forgotPassword(value) {
    cy
      .get(el.forgotPasswordLink)
      .should('exist')
      .click();
    if (value === 'cpf') {
      cy
        .get(el.recoverPasswordCpf)
        .should('be.visible')
        .click();
    } else {

    }
  }

  buttonSubmitForgotPassword() {
    cy
      .get(el.forgotPasswordButton)
      .should('exist')
      .click();
  }

  forgotPasswordSuccessfully(value) {

    if (value === 'email') {
      cy
        .get(el.alertForgotPassword)
        .should('exist')
      cy
        .contains('In case there is a registration at Gupy for this email, we will send further instructions. Keep an eye on your inbox!');
    }

    else if (value === 'cpf'){
    cy
      .get(el.alertForgotPassword)
      .should('exist')
    cy
      .contains('An e-mail with instructions for password redefinition was sent to the following e-mail address:');
    }
  }

  accessRoute() {
    cy
      .getRoute(
        'POST', 
        `${Cypress.env('apiServer')}` + '/candidates/users/*', 
        'signin'
        );
  }

  errorMessage(field) {
    if(field === 'input form') {
      for(var i = 0; i < 5; i++) {
        cy
        .get(el.errorMessage)
        .eq(i)
        .contains('Campo obrigatório');
      }
    }

    else if(field === 'use terms') {
      cy
        .get(el.errorMessage)
        .contains('Clique no quadro para declarar que está de acordo com os termos de serviço');
    }
  }

  errorData(value) {
    switch (value) {
      case 'invalid cpf':
          cy
            .get(el.errorMessage)
            .contains('CPF inválido');
        
        break;

      case 'cpf already registered': 
        cy
          .get(el.errorData)
          .contains('Documento de identificação já cadastrado com o e-mail');
      
        break;

        case 'invalid email':
            for(var i = 0; i < 1; i++) {
              cy
              .get(el.errorMessage)
              .eq(i)
              .contains('Este não é um endereço de e-mail válido');
            }
          
          break;
  
        case 'email already registered':
            for(var i = 0; i < 1; i++) {
              cy
                .get(el.errorData)
                .eq(i)
                .contains('Email já cadastrado');
            }
          
          break;
  
        case 'different email of the confirmation email':
            for(var i = 0; i < 1; i++) {
              cy
                .get(el.errorMessage)
                .eq(i)
                .contains('Esses e-mails não coincidem. Tente novamente.');
            }
              
          break;
    
      default:
        break;
    }
  }

  assertionXhr(reponseCode) {
    cy
      .wait('@signin')
      .then((xhr) => {
        if (xhr.status === 200) {
          expect(xhr.response.body)
            .to.have.property('token')
            .and.not.be.empty
        
            token = xhr.response.body.token
        }

        else if (xhr.status === 422) {
          expect(xhr.response.body)
            .to.have.property('message')
              expect(xhr.response.body)
                .to.have.property('code')
        }

        else if (xhr.status === 404) {
          expect(xhr.response.body)
            .to.have.property('message')
              expect(xhr.response.body)
                .to.have.property('code')
        }
      })
  }
} 

export default new SignIn();