const APPAPI = '/api';
import baseRESTServices from '../basejs/baserest.js';
class AdminControllerService extends baseRESTServices {
  // @ngInject
  constructor($http, $q) {
    super($q, $http);
  }
  //  获取角色action
  getRoleActions(roleid) {
    return this.doGet(`${APPAPI}/Role/${roleid}/actionpermissions`);
  }

  //  根据id查询action名称
  getActionAuth(roleid) {
    return this.doGet(`${APPAPI}/actionauth/getroleactions?id=${roleid}`);
  }

  //  关联action
  grantRoleActions(permissions) {
    return this.doPost(`${APPAPI}/ActionAuth/grant`, permissions);
  }
  //  解除action
  revokeRleActions(permission) {
    return this.doPost(`${APPAPI}/ActionAuth/revoke`, permission);
  }
  //  获取角色用户
  getRoleUsers(roleid) {
    return this.doGet(`${APPAPI}/Role/${roleid}/users`);
  }
  //  获取用户角色
  getUserRoles(userid) {
    return this.doGet(`${APPAPI}/User/${userid}/roles`);
  }
  //  获取所有用户
  getAllUsers(userid) {
    return this.doGet(`${APPAPI}/User`);
  }

  //  获取所有角色
  getAllRoles(roleid) {
    return this.doGet(`${APPAPI}/Role`);
  }

  //  获取可分配给员工的用户
  getValidUser(roleid) {
    return this.doGet(`${APPAPI}/Empinfo/getValidUser?empid=${roleid}`);
  }
  /**
   * addUsersToRole(bodyjson.usernames, bodyjson.rolename)
   * */
  //  添加用户到角色
  addUsersToRole(usernames, rolename) {
    return this.doPost(`${APPAPI}/ActionAuth/addUsersToRole`, {usernames, rolename});
  }
  //  移除用户从角色
  removeUserFromRole(usernames, rolename) {
    return this.doPost(`${APPAPI}/ActionAuth/removeUserFromRole`, {usernames, rolename});
  }

  //  添加角色到用户
  addRolesToUser(username, roles) {
    return this.doPost(`${APPAPI}/ActionAuth/addRolesToUser`, {username, roles});
  }
  //  移除角色从用户
  removeRolesFromUser(username, roles) {
    return this.doPost(`${APPAPI}/ActionAuth/removeRolesFromUser`, {username, roles});
  }

}

export const AdminControllerServic = AdminControllerService;
