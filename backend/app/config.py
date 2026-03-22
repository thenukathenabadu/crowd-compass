from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    DATABASE_URL: str = 'postgresql+asyncpg://crowd:crowd@localhost:5432/crowdcompass'
    GOOGLE_PLACES_API_KEY: str = ''
    OPENWEATHER_API_KEY: str = ''
    ADMIN_TOKEN: str = 'changeme'


settings = Settings()
