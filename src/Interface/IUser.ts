export interface IDataUser {
    id: number;
    user: string;
    email: string;
    password: string;
}

export interface IUserLogin{
    dataUser:IDataUser;
    token: string;
    message:string;
}

