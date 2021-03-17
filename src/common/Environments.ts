export default {
    SERVER: {
        PORT: process.env.SERVER_PORT,
        LOG_LEVEL: process.env.SERVER_LOG_LEVEL
    },
    DATABASE: {
        TYPE: process.env.DATABASE_TYPE,
        HOST: process.env.DATABASE_HOST,
        PORT: parseInt(process.env.DATABASE_PORT),
        USERNAME: process.env.DATABASE_USERNAME,
        PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE: process.env.DATABASE_DATABASE,
        SYNCRONIZE: process.env.DATABASE_SYNCRONIZE === "true" ? true : false
    },
    SECURITY: {
        ISS: process.env.SECURITY_ISS,
        API_SECRET: process.env.SECURITY_API_SECRET
    },
    MAIL: {
        HOST: process.env.MAIL_HOST,
        PORT: parseInt(process.env.MAIL_PORT),
        AUTH: {
            USER: process.env.MAIL_USER,
            PASS: process.env.MAIL_PASS
        }
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: parseInt(process.env.REDIS_PORT),
        PASSWORD: process.env.REDIS_PASSWORD
    }
};