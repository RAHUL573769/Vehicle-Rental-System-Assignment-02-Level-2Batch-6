declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;

        }
    }
}

export default {
    PORT: process.env.PORT,

};
