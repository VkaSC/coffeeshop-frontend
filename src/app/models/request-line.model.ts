import { Utils } from "../libs/utils/utils.utils";

export default class RequestLine {

    id?: string;
    productId: number = 0;
    requestId: number = 0;
    quantity: number = 0;
    total: number = 0;

    constructor(obj?: any){
        if(Utils.isObject(obj)){
            this.id = obj.id;
            this.productId = obj.productId;
            this.requestId = obj.requestId;
            this.quantity = obj.quantity;
            this.total = obj.total;
        }
    }

}