import { RoleID } from "../user/loginUserResponse";

export interface Customer {
    id:              number;
    customerName:    string;
    nitNumber:       string;
    address:         string;
    status:          boolean;
    userResponsible: UserResponsible;
}

export interface UserResponsible {
    id:           number;
    name:         string;
    email:        string;
    creationDate: Date;
    status:       RoleID;
    phoneNumber:  string;
    roleId:       RoleID;
}
