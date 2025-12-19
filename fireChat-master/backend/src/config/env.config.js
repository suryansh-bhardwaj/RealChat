
import dotenv from 'dotenv'

dotenv.config()            

const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
}

export default ENV;