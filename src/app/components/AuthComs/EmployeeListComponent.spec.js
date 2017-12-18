describe('employeeListComponent component', () => {
  beforeEach(module('app', $provide => {
    $provide.factory('employeeListComponent', () => {
      return {
        templateUrl: 'app/EmployeeListComponent.html'
      };
    });
  }));

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<employeeListComponent></employeeListComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
