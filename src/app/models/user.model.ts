import { Utils } from "../libs/utils/utils.utils";

export default class User{

    id?: string;
    name: string = '';
    lastName: string = '';
    type: 'Admin' | 'Cliente' = 'Cliente';
    email: string = '';
    active: boolean = false;
    password: string = '';

    constructor(obj?: any) {
        if (Utils.isObject(obj)) {
            this.id = obj.id;
            this.name = obj.name;
            this.lastName = obj.lastName;
            this.type = obj.type;
            this.email = obj.email;
            this.active = obj.active;
            this.password = obj.password;
        }
    }
}