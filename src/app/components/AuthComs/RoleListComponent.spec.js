describe('roleListComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('roleListComponent', () => {
      return {
        templateUrl: 'app/RoleListComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<roleListComponent></roleListComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
