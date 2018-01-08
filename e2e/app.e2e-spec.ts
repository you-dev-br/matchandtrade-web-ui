import { AppPage } from './app.po';

describe('matchandtrade-web-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation bar', () => {
    page.navigateToHome();
    expect(page.elementTrades()).toBeDefined();
    expect(page.elementSignin()).toBeDefined();
  });

});
