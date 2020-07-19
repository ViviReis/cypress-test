import addContext from 'mochawesome/addContext'

import './commands'

beforeEach(() => {
  cy
    .server();

  cy
    .on('uncaught:exception', (err) => {
      expect(err.message).to.include('is not defined');
      // returning false here prevents Cypress from
      // failing the test
      return false;
    })
});

afterEach(() => {
  cy
    .screenshot()
});

Cypress.on('test:after:run', (test, runnable) => {

  if (test.state === 'failed') {
    let item = runnable
    const nameParts = [runnable.title]

    while (item.parent) {
      nameParts.unshift(item.parent.title)
      item = item.parent
    }

    if (runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`)
    }
    
    const fullTestName = nameParts
            .filter(Boolean)
            .join(' -- ')

    const imageUrl = `screenshots/${
      Cypress.spec.name
    }/${fullTestName} (failed).png`

    addContext({ test }, imageUrl)
  }
})