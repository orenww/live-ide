'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /studio when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/studio");
  });


  describe('studio', function() {

    beforeEach(function() {
      browser().navigateTo('#/studio');
    });


    it('should render studio view when user navigates to /studio', function() {
      expect(element('[ng-view] article').text()).
        toMatch(/globalDataFormat/);
    });

  });


  // describe('view2', function() {

  //   beforeEach(function() {
  //     browser().navigateTo('#/view2');
  //   });


  //   it('should render view2 when user navigates to /view2', function() {
  //     expect(element('[ng-view] p:first').text()).
  //       toMatch(/partial for view 2/);
  //   });

  // });
});
