describe('userDetailDlg component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('userDetailDlg', () => {
      return {
        templateUrl: 'app/UserDetailDlg.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<userDetailDlg></userDetailDlg>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
