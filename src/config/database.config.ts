import {registerAs} from "@nestjs/config"

export default registerAs('database', (()=>({

     host:process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            name: process.env.DB_NAME,
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            synchronize: process.env.DB_SYNC === 'true' ? true : false,
            autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false
})))

