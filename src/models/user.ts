

export class User {

    $key: string;
    name: string;
    email: string;
    role: string;

    public static getUpdate(user: any): any {

        const result = Object.assign({}, user);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }

}