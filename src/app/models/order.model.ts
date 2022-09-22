import { Utils } from "../libs/utils/utils.utils";

export default class Order {
    id?: number;
    device?: string;
    date: number = 0;
    userId?: string;
    total?: number;

    constructor(obj?: any) {
        if (Utils.isObject(obj)) {
            this.id = obj.id;
            this.device = obj.device;
            this.date = obj.date;
            this.userId = obj.userId;
            this.total = obj.total;
        }
    }
}