import { AppPage } from './app.po';

describe('matchandtrade-web-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation bar', () => {
    page.navigateTo();
    expect(page.getNavigationBar()).toBeDefined();
  });
});
