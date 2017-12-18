describe('CommonUtilsServices service', () => {
  beforeEach(module('app'));
  it('should', angular.mock.inject(CommonUtilsServices => {
    expect(CommonUtilsServices.getData()).toEqual(3);
  }));
});
