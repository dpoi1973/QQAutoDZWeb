describe('registerComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('registerComponent', () => {
      return {
        templateUrl: 'app/registerComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<registerComponent></registerComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
