describe('roleToUser component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('roleToUser', () => {
      return {
        templateUrl: 'app/roleToUser.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<roleToUser></roleToUser>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
