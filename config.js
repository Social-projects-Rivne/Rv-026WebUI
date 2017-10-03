const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = (message) => {
    console.info('********');
    console.info(message);
    console.info('********');
};

export default {
    port: env.PORT || 3090,
    host: env.HOST || 'localhost',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    },
};

export const ROLE_USER = 'user';
export const ROLE_COOK = 'cook';
export const ROLE_ADMIN = 'admin';
