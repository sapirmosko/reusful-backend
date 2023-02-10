export interface ProductInterface{
    id:number,
    productName:string,
    productDescription:string,
    productPrice:number,
    productStatus:string,
    productDate:Date,
    productImage :string,
    categorieId:number,
    userId:number,
    imageUrl:string,
    username?:string,
    categorieName?:string
}