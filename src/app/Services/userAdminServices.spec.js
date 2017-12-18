describe('UserAdminServices service', () => {
    beforeEach(module('app'));
    it('should', function (done) {
        angular.mock.inject(UserAdminServices => {
            UserAdminServices.getList().then(data => {
                expect(data.length).toEqual(1);
                done();
            });

        })
    });
});
