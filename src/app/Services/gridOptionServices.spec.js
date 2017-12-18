describe('GridOptionServices service', () => {
  beforeEach(module('app'));
  it('should', angular.mock.inject(GridOptionServices => {
    expect(GridOptionServices.getData()).toEqual(3);
  }));
});
