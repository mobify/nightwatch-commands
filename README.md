nightwatch-commands
===================

[![NPM version](https://badge.fury.io/js/nightwatch-commands.svg)](http://badge.fury.io/js/nightwatch-commands)

A set of Mobify specific custom commands for Nightwatch.js

### Download
To begin, clone this repository. `cd` into your chosen folder, and run the following:
    `npm install`

### Linting
JavaScript in this tool is linted with [ESLint](http://eslint.org/) according to our code [syntax and style standards](https://github.com/mobify/mobify-code-style) here at Mobify.

Linting may be run with the `grunt lint` command. Code is also linted automatically on [CircleCI](https://circleci.com/).

## Assertions
=============

#### elementsCount(selector, expected, message, callback)

The `elementsCount` assertion checks if the given selector is present the number of times that is expected for that selector to appear.

Parameter Name | Parameter Type | Description
--- | --- | ---
selector | String | The CSS/Xpath selector to locate the element.
expected | Number | The expected number of times for the attribute to appear.
message | String | _optional_ The message to output.
callback | Function | _optional_ A function to call after the current command finishes execution. 

```
this.demoTest = function (browser) {
    browser.assert.elementsCount('#x-root', 1);
}
```

#### elementsPresent(selector, message, callback)

The `elementsCount` assertion checks if the given selector is present the number of times that is expected for that selector to appear.

Parameter Name | Parameter Type | Description
--- | --- | ---
selector | String | The CSS/Xpath selector to locate the element.
message | String | _optional_ The message to output.
callback | Function | _optional_ A function to call after the current command finishes execution.

```
this.demoTest = function (browser) {
    browser.assert.elementsPresent('#x-root', '#x-header', '#x-footer');
};
```

#### elementsVisible(selector, message, callback)

The `elementsVisible` assertion checks if one or more selectors are visible. It returns a list of one or more selectors that are not visible on the page.

Parameter Name | Parameter Type | Description
--- | --- | ---
selectors | String | The CSS/Xpath selector to locate the element.
callback | Function | _optional_ A function to call after the current command finishes execution. 

```
this.demoTest = function (browser) {
    browser.assert.elementsVisible('#x-root', '#x-head');
};
```

#### templateName(expected, message, callback)

The `templateName` assertion checks if the given template name is correct.

Parameter Name | Parameter Type | Description
--- | --- | ---
expected | String | The expected value of the attribute to check.
message | String | _optional_ A log message to display in the output. If the parameter is not specified, a default message is displayed.
callback | Function | _optional_ A function to call after the current command finishes execution. 

```
this.demoTest = function (client) {
    browser.assert.templateName('home');
};
```

## Commands
===