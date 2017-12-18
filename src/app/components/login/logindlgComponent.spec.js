describe('logindlgComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('logindlgComponent', () => {
      return {
        templateUrl: 'app/logindlgComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<logindlgComponent></logindlgComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
