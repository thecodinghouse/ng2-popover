import { Ng2PopoverPage } from './app.po';

describe('ng2-popover App', function() {
  let page: Ng2PopoverPage;

  beforeEach(() => {
    page = new Ng2PopoverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
