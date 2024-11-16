export interface LoginResponse {
    token: string;
    user:  User;
}

export interface User {
    id:           number;
    name:         string;
    email:        string;
    creationDate: Date;
    status:       RoleID;
    roleId:       RoleID;
}

export interface RoleID {
    id:                    number;
    parameterName:         null | string;
    parameterValue:        string;
    parameterRelationShip: RoleID | null;
    modifyDate:            Date;
}