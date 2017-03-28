import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';

describe('Login Test', () => {

  beforeEach(() => {
    console.log("beforeEach")
    browser.get('');
    //browser.driver.sleep(5000)
  });

  afterEach(() => {
    console.log("afterEach")
    //browser.driver.sleep(5000)
  })

  it('Login successfully', () => {

    browser.driver.actions()
        .mouseDown(element(by.id('email'))).click()
        .sendKeys("jdwei@yahoo.com")
        .mouseDown(element(by.id('password'))).click()
        .sendKeys("111111")
        .perform()

    element(by.id('btn_login')).click().then(() => {
      console.log("login clicked")
      browser.wait(ExpectedConditions.presenceOf(element(by.css('ion-menu'))), 5000).then(() => {
        console.log("ion-menu found")
        browser.getTitle().then((title) => {
          console.log("title : " + title)
          expect(title).toEqual('Library');
        });
      })
    });
 
  });


})