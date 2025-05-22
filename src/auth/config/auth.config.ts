import { registerAs } from "@nestjs/config"

export default  registerAs('authConfig', (()=>({
    sharedSecret: process.env.SECRET_KEY
})))