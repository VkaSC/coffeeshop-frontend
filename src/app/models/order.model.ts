import { Utils } from "../libs/utils/utils.utils";
import OrderLine from "./order-line.model";

export default class Order {
    id?: number;
    device?: string;
    date: number = 0;
    userId?: string;
    total: number = 0;
    lines?: OrderLine[];

    constructor(obj?: any) {
        if (Utils.isObject(obj)) {
            this.id = obj.id;
            this.device = obj.device;
            this.date = obj.date;
            this.userId = obj.userId;
            this.total = obj.total;
            this.lines = Utils.deserializeArray<OrderLine>(obj.lines, OrderLine);
        }
    }
}