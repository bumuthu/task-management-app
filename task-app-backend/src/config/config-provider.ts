import dotenv from 'dotenv';
dotenv.config();

class ConfigProvider {
    private static instance: ConfigProvider;
    private config: Record<string, string | number | undefined>;

    private constructor() {
        this.config = {
            PORT: process.env.PORT || 3000,
            DATABASE_URL: process.env.DATABASE_URL,
            AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
            AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
            AWS_REGION: process.env.AWS_REGION,
            DATABASE_TYPE: process.env.DATABASE_TYPE || 'inmemory',
            EXTERNAL_DATA_SOURCE: process.env.EXTERNAL_DATA_SOURCE,
            TTL_MINUTES: process.env.TTL_MINUTES || 5,
            TASK_FILE_BUCKET: process.env.TASK_FILE_BUCKET
        };
        console.log("Configs: ", this.config);
        this.validateConfig();
    }

    public static getInstance(): ConfigProvider {
        if (!ConfigProvider.instance) {
            ConfigProvider.instance = new ConfigProvider();
        }
        return ConfigProvider.instance;
    }

    public static get(key: string): string | number {
        const value = this.getInstance().config[key];
        if (!value) {
            throw new Error(`Config value for key "${key}" is not defined`);
        }
        return value;
    }

    private validateConfig(): void {
        const requiredVariables: string[] = [];
        const missingVariables = requiredVariables.filter(
            (key) => !this.config[key]
        );

        if (missingVariables.length > 0) {
            throw new Error(
                `Missing required environment variables: ${missingVariables.join(', ')}`
            );
        }
    }
}

export default ConfigProvider;