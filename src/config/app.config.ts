// export const appConfig=()=>{
//     return {
//         environment: process.env.NODE_ENV || 'production',

import { registerAs } from "@nestjs/config";

        
//     }
        
    
// }


export default registerAs('appConfig', (()=>({
    environment: process.env.NODE_ENV || 'production'
})))