# MatchAndTrade

## Setup
```
nvm install 10.14.1
nvm use 10.14.1
npm install -g @angular/cli
npm install
npm --version
#-> 6.4.1
node --version
#-> v10.14.1
ng version
#-> Angular CLI: 7.1.2
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## TODO
* Add invalid error message when text-editor is invalid
* Delete attachments
* Add a search bar on the _trade-list_ and _article-list_ pages
* Create a dashboard on the _welcome_ page containing: _My Trades_ and _My Items_
* Return back when saving entries and display message
* Generated database IDs with sequence instead of shared identity
* Should non-members be able to view/download results? Yes. But we should limit the contact information of people to only those which a involved in a trade plus the organiser.
* Externalise logback.xml
* Create _bundles_ so users can offer a _bundle of items_ for another item
* TradeMaximizer import/export
* Implement quota for file upload
* Create a job to clean uploaded files no long in use
* Should allow to delete an item which has offers?
* Users avatar
* Organiser should be able to ban users
* Support Trades by invitation only
* Duplicated trade protection
* [Better custom angular themes](https://blog.thoughtram.io/angular/2017/05/23/custom-themes-with-angular-material.html)