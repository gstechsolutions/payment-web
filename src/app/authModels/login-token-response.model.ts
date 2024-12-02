export class LoginTokenResponseModel {
    accessToken: string = '';
  userName: string = '';
  expiresIn: number = 0;
  roles?: RolePolicyModel[]; // Optional array
  roleId: number = 0;
  requestId?: number;
}

export interface RolePolicyModel {
    roleName: string;
    policy: string;
  }
