interface AW_Location {
  ID: string;
  LocalizedName: string;
}

export interface AW_LocationData {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: AW_Location;
  AdministrativeArea: AW_Location;
}

export interface AW_Current {
  "LocalObservationDateTime": string;
  "EpochTime": number;
  "WeatherText": string;
  "WeatherIcon": number;
  "HasPrecipitation": boolean;
  "PrecipitationType": AW_PrecipitationType | null;
  "IsDayTime": boolean;
  "Temperature": {
    "Metric": UnitValue;
    "Imperial": UnitValue;
  },
  "MobileLink": string;
  "Link": string;
}

export type AW_PrecipitationType = "Rain" | "Snow" | "Ice" | "Mixed";

export interface UnitValue {
  "Value": number;
  "Unit": string;
  "UnitType": number;
}

export interface AW_DayStatus {
  "Icon": number;
  "IconPhrase": string;
  "HasPrecipitation": boolean;
  "PrecipitationType": AW_PrecipitationType | null;
  "PrecipitationIntensity": string;
}

export interface AW_DailyForecast {
  "Date": string;
  "EpochDate": number;
  "Temperature": {
    "Minimum": UnitValue;
    "Maximum": UnitValue;
  },
  "Day": AW_DayStatus;
  "Night": AW_DayStatus;
  "Sources": string[];
  "MobileLink": string;
  "Link": string;
}

export interface AW_Forecast {
  "Headline": {
    "EffectiveDate": string;
    "EffectiveEpochDate": number;
    "Severity": number;
    "Text": string;
    "Category": string;
    "EndDate": string;
    "EndEpochDate": number;
    "MobileLink": string;
    "Link": string;
  };
  "DailyForecasts": AW_DailyForecast[];
}
