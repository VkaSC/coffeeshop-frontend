import { Utils } from "../libs/utils/utils.utils";

export default class Allergen {
    id?: number;
    name: string = '';
    icon?: string = '';
    details: string = '';

    constructor(obj?: any) {
        if (Utils.isObject(obj)) {
            this.id = obj.id;
            this.name = obj.name;
            this.icon = obj.icon;
            this.details = obj.details;
        }
    }
}