import { SetMetadata } from "@nestjs/common"

export const AllowAnonymous = ()=>{
    // return (target:any, propertyKey:string, propertyDescriptor: PropertyDescriptor)=>{
    //     console.log('allow anonymous' + propertyKey)
    // } this is the custom decorator signature

    return SetMetadata('isPublic', true)
}