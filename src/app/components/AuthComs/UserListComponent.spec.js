describe('userListComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('userListComponent', () => {
      return {
        templateUrl: 'app/UserListComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<userListComponent></userListComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
