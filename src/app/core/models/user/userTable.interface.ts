export interface UserTable {
    id:                 number;
    name:               string;
    email:              string;
    roleId:             string;
    creationDate:       string;
}

export interface UserRequest {
    name:               string;
    email:              string;
    password?:           string;
    roleId?:           any;
    status?: any;
}