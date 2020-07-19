/// <reference types="cypress" />

import Jobs from '../pages/jobs';
import Signin from '../pages/signin';

context('Jobs', () => {
  beforeEach(() => {
  })

  describe('See jobs', () => {

    it('See job details', () => {
      Signin.visitSignIn();
      Signin.signupWeb();
      Jobs.clickOpportunityPage();
      Jobs.applyJob();
    })
  })
})