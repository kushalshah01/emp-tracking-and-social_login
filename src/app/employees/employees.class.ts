import { UserModel } from "../authentication/authentication.class";

export class EmployeesModel extends UserModel {
  isChecked: boolean = false;
  mobileNumber: any;
  gender: string;
  birthDate: any;
  address: string;
  department: string;
  constructor(init?: Partial<EmployeesModel>) {
    super();
    Object.assign(this, init);
  }
}


