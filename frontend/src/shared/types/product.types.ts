export interface Product {
    id : number;
    name : string,
    description : string,
    basePrice : number,
    brand : string,
    category : string,
    material : string,
    variants : Variant[];
}

export interface Variant {
    id : number;
    color : string;
    size : string;
    stock : number;
    imagenUrl : string;
    finalPrice : number;
}

