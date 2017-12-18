describe('userAdminComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('userAdminComponent', () => {
      return {
        templateUrl: 'app/UserAdminComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<userAdminComponent></userAdminComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
