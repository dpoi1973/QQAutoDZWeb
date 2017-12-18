describe('AdminControllerService service', () => {
  beforeEach(module('app'));
  it('should', done =>{
    angular.mock.inject(AdminControllerService => {
    AdminControllerService.getRoleActions(1).then(data=>{
     //  expect(data.length).toBe(3);
     console.log(data);
       done();
    });
   
  })});
  }

);
