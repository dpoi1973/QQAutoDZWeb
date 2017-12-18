describe('roleDetailDlg component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('roleDetailDlg', () => {
      return {
        templateUrl: 'app/RoleDetailDlg.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<roleDetailDlg></roleDetailDlg>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
