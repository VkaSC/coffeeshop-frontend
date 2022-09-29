import { Utils } from "../libs/utils/utils.utils";
import Product from "./product.model";

export default class OrderLine {

    id?: string;
    productId: number = 0;
    product?: Product;
    requestId: number = 0;
    quantity: number = 0;
    total: number = 0;

    constructor(obj?: any){
        if(Utils.isObject(obj)){
            this.id = obj.id;
            this.productId = obj.productId;
            this.product = obj.product ? new Product(obj.product) : undefined;
            this.requestId = obj.requestId;
            this.quantity = obj.quantity;
            this.total = obj.total;
        }
    }

}