export interface BrandModel {
    id:number,
    name:string,
    modelCars:Model[]
}
export interface Model {
    id:number,
    name:string,
    cars: null,
    brandId:number
}