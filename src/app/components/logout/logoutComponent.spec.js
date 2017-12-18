describe('logoutComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('logoutComponent', () => {
      return {
        templateUrl: 'app/logoutComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<logoutComponent></logoutComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
