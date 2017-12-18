describe('controllerActionDetailDlg component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('controllerActionDetailDlg', () => {
      return {
        templateUrl: 'app/ControllerActionDetailDlg.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<controllerActionDetailDlg></controllerActionDetailDlg>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
