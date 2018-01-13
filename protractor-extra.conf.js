/**
 * Configure browser speed and extra debugging
 * Inpired on https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
 */
var originalControlFlowExecution = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function () {
    var args = arguments;
    originalControlFlowExecution.call(browser.driver.controlFlow(), function () {
        // this 'console.log()' will output a lot o information, use with caution.
        // console.log(args);
        // increase or reduce execution speed in millisecond
        return protractor.promise.delayed(5);
    });

    return originalControlFlowExecution.apply(browser.driver.controlFlow(), args);
};
