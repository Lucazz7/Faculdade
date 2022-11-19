export interface Fore {
  date: Date;
  temperatureMin: number;
  temperatureMax: number;
  rain: number;
  rainProbability: number;
  rainPrediction: string;
}

export interface Past {
  date: Date;
  rain: number;
  relativeHumidity: number;
  solarIrradiation: number;
  temperatureAverage: number;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
}

export interface Present {
  date: Date;
  rain: number;
  relativeHumidity: number;
  solarIrradiation: number;
  temperatureAverage: number;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
}

export interface Forecast {
  blockId: string;
  forecast: Fore[];
  name: string;
  past: Past[];
  present: Present[];
}
