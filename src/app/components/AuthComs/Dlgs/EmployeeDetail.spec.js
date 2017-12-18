describe('employeeDetail component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('employeeDetail', () => {
      return {
        templateUrl: 'app/employeeDetail.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<employeeDetail></employeeDetail>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
