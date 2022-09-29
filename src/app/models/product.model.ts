import { Utils } from "../libs/utils/utils.utils";
import Allergen from "./allergen-model";

export default class Product {

    id?: number;
    name: string = '';
    type: 'Grupo 1' | 'Grupo 2' | 'Grupo 3' = 'Grupo 1';
    category: 'Cafe' | 'Desayunos' | 'Refrescos' | 'Bocadillos' = 'Cafe';
    details: string = '';
    price: number = 0;
    allergens?: Allergen[] = []

    constructor(obj?: any){
        if(Utils.isObject(obj)){
            this.id = obj.id;
            this.name = obj.name;
            this.type = obj.type;
            this.category = obj.category;
            this.details = obj.details;
            this.price = obj.price;
            this.allergens = obj.allergens;
        }
    }

}