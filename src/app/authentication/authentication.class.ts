export class UserLoginModel {
  UserName: string;
  Password: string;
  constructor(init?: Partial<UserLoginModel>) {
    Object.assign(this, init);
  }
}
export class ChangePasswordModel {
  password: string;
  confirmPassword: string;
  constructor(init?: Partial<ChangePasswordModel>) {
    Object.assign(this, init);
  }
}
export class UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  isActive: boolean = true;
  profileImage: string = "";
  constructor(init?: Partial<UserModel>) { }
}
