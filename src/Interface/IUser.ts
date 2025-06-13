export interface IDataUser {
    id: number;
    user: string;
    email: string;
    password: string;
    message: string;
    token : string;
    users: IDataUser
}

export interface IUserLogin{
    dataUser:IDataUser;
    token: string;
    message:string;
}

