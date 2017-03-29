var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
//import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';
 
exports.config = {
    allScriptsTimeout: 5000000,
    directConnect: true,
    capabilities: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    specs: ['./e2e/**/*.e2e-spec.ts'],
    baseUrl: 'http://localhost:8100',
    useAllAngular2AppRoots: true,
    beforeLaunch: function() {
 
        require('ts-node').register({
            project: 'e2e'
        });
 
        require('connect')().use(require('serve-static')('www')).listen(8100);
 
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter());
        browser.get('');
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
    }
}