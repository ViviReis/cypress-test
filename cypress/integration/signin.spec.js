import SignIn from '../pages/signin';

context('Sign in', () => {
  beforeEach(() => {
    SignIn.accessRoute();
  })
  describe('Create Account', () => {

    it('Create account successfully', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('valid cpf');
      SignIn.fillEmailAndEmailConfirmation('valid email');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.signinSuccessful();
      SignIn.assertionXhr(200);
    })

    it('Error when not accepting terms of use', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('valid cpf');
      SignIn.fillEmailAndEmailConfirmation('valid email');
      SignIn.fillPassword();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('failed', 'use terms');
    })

    it('Error when create account with blank field', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('failed', 'input');
    })

    it('Error invalid cpf', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('invalid cpf');
      SignIn.fillEmailAndEmailConfirmation('valid email');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('error');
      SignIn.errorData('invalid cpf')
    })

    it('Error cpf already registered', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('cpf already registered');
      SignIn.fillEmailAndEmailConfirmation('valid email');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('error');
      SignIn.errorData('cpf already registered')
      SignIn.assertionXhr(422);
    })

    it('Error invalid email', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('valid cpf');
      SignIn.fillEmailAndEmailConfirmation('invalid email');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('error');
      SignIn.errorData('invalid email')
    })

    it('Error email already registered', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('valid cpf');
      SignIn.fillEmailAndEmailConfirmation('email already registered');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('error');
      SignIn.errorData('email already registered');
      SignIn.assertionXhr(422);
    })

    it('Error different email', () => {
      SignIn.visitSignIn();
      SignIn.createAccount();
      SignIn.fillName();
      SignIn.fillLastName();
      SignIn.fillCpf('valid cpf');
      SignIn.fillEmailAndEmailConfirmation('different email of the confirmation email');
      SignIn.fillPassword();
      SignIn.useTerms();
      SignIn.createAccountButton();
      SignIn.errorfulSignin('error');
      SignIn.errorData('different email of the confirmation email');
    })
  })

  describe('Login', () => {
  
    it('Successful Login', () => {
      SignIn.visitSignIn();
      SignIn.fillEmail(`${Cypress.env('email')}`);
      SignIn.fillPass(`${Cypress.env('password')}`);
      SignIn.accessAccountButton();
      SignIn.loginSuccessful();
      SignIn.assertionXhr(200);
    })

    it('Invalid email', () => {
      SignIn.visitSignIn();
      SignIn.fillEmail('teste.teste.com');
      SignIn.fillPassword((`${Cypress.env('password')}`));
      SignIn.accessAccountButton();
      SignIn.signupError('invalid', 'Invalid Email or Password')
      SignIn.assertionXhr(404);
    })

    it('Invalid password', () => {
      SignIn.visitSignIn();
      SignIn.fillEmail((`${Cypress.env('email')}`));
      SignIn.fillPassword('blablabla1234');
      SignIn.accessAccountButton();
      SignIn.signupError('invalid', 'Invalid Email or Password')
      SignIn.assertionXhr(404);
    })

    it('Email not registered', () => {
      SignIn.visitSignIn();
      SignIn.fillEmail('teste@blablabla.com');
      SignIn.fillPassword((`${Cypress.env('password')}`));
      SignIn.accessAccountButton();
      SignIn.signupError('invalid', 'Invalid Email or Password');
      SignIn.assertionXhr(404);
    })

    it('Error message blank password', () => {
      SignIn.visitSignIn();
      SignIn.fillEmail((`${Cypress.env('email')}`));
      SignIn.accessAccountButton();
      SignIn.signupError('blank', 'Required field');
    })

    it('Error message blank email', () => {
      SignIn.visitSignIn();
      SignIn.fillPassword((`${Cypress.env('password')}`));
      SignIn.accessAccountButton();
      SignIn.signupError('blank', 'Required field');
    })
  })

  describe('Password Recovery', () => {

    it('I forgot my password', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('email');
      SignIn.fillEmail((`${Cypress.env('email')}`));
      SignIn.buttonSubmitForgotPassword();
      SignIn.forgotPasswordSuccessfully('email');
    })

    it('I forgot my password with invalid email', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('email');
      SignIn.fillEmail('teste.teste.com');
      SignIn.buttonSubmitForgotPassword();
      SignIn.signupError('error', 'This is not a valid email address');
    })

    it('I forgot my password with blank email', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('email');
      SignIn.buttonSubmitForgotPassword();
      SignIn.signupError('error', 'Required field');
    })

    it('I forgot my password with cpf', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('cpf');
      SignIn.fillRegisteredCpf('84451011370');
      SignIn.buttonSubmitForgotPassword();
      SignIn.forgotPasswordSuccessfully('cpf');
    })

    it('I forgot my password with invalid cpf', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('cpf');
      SignIn.fillRegisteredCpf('00000000001');
      SignIn.buttonSubmitForgotPassword()
      SignIn.signupError('error', 'Invalid CPF');
    })

    it('I forgot my password with blank cpf', () => {
      SignIn.visitSignIn();
      SignIn.forgotPassword('cpf');
      SignIn.buttonSubmitForgotPassword()
      SignIn.signupError('error', 'Required field');
    })
  })
})