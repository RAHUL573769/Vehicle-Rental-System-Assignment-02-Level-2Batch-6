declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            POSTGRES_DB:string


            
        }
    }
}

export default {
    PORT: process.env[PORT],
    POSTGRES_DB:process.env.POSTGRES_DB
};
