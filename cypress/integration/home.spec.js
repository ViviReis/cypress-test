/// <reference types="cypress" />

import Home from '../pages/home';

context('Home', () => {
  beforeEach(() => {
    Home.visit()
  })

  describe('Search Company Name', () => {

    it('See PicPay jobs', () => {
      Home.searchCompanyName()
      Home.validateOptions('See jobs')
    })

    it('See login to the picpay page', () => {
      Home.searchCompanyName()
      Home.validateOptions('Platform login')
    })
  })
})