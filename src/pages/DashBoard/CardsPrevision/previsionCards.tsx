import { Blocks } from "../../../Model/blocksModel";
//! Icones
import chuva from "../../../Image/chuvaAnim2.jpg";
import sol from "../../../Image/sol.jpg";
import nublado from "../../../Image/nublado.jpg";
import IconRain from "../../../Image/iconsSvg/rain.svg";
import IconTemperature from "../../../Image/iconsSvg/allIconsTemp/temperature.svg";
import IconTemperatureMax from "../../../Image/iconsSvg/allIconsTemp/temperatureMax.svg";
import IconTemperatureMin from "../../../Image/iconsSvg/allIconsTemp/temperatureMin.svg";
import IconChuvaNublado from "../../../Image/iconsSvg/allIconsTemp/chuvaNublado.svg";
import IconHumidity from "../../../Image/iconsSvg/allIconsTemp/humidity.svg";
import IconWind from "../../../Image/iconsSvg/allIconsTemp/wind.svg";
import IconWindAnimate from "../../../Image/iconsSvg/allIconsTemp/windAnimate.svg";
import ClearDay from "../../../Image/iconsSvg/allIconsTemp/clear-day.svg";
import ClearDayStatic from "../../../Image/iconsSvg/allIconsTemp/clear-day-static.svg";
import RainProb from "../../../Image/iconsSvg/allIconsTemp/rainProb.svg";
import { Forecast, Past } from "../../../Model/forCast";

interface Prevision {
    prevision: string;
    date: number | string;
    icons: JSX.Element;
    type: string;
    name: string;
};

export const PrevisionPresent = (blockSelected: Blocks[]) => {
    const temperature: Prevision[] = [];
    blockSelected.forEach(item => {
        temperature.push({
            prevision: "mm",
            date: item.data.rain,
            icons:
                item.data.rain > 0 ? (
                    <img className="icon-temp" src={IconRain} />
                ) : (
                    <img className="icon-temp" src={IconChuvaNublado} />
                ),
            type: 'rain',
            name: 'Chuva',
        });
        temperature.push({
            prevision: "ºC",
            date: item.data.temperature,
            icons: <img className="icon-temp" src={IconTemperature} />,
            type: 'temperature',
            name: 'Temperatura'
        });
        temperature.push({
            prevision: "Km/h",
            date: item.data.windSpeed,
            icons: item.data.windSpeed > 0 ? (
                <img className="icon-temp" src={IconWindAnimate} />
            ) : (
                <img className="icon-temp" src={IconWind} />
            ),
            type: 'windSpeed',
            name: 'V. Vento'
        });
        temperature.push({
            prevision: "Wh/m²",
            date: item.data.solarIrradiation,
            icons: item.data.solarIrradiation > 0 ? (
                <img className="icon-temp" src={ClearDay} />
            ) : (
                <img className="icon-temp" src={ClearDayStatic} />),
            type: 'solarIrradiation',
            name: 'Radiação'
        });
        temperature.push({
            prevision: "%",
            date: item.data.relativeHumidity,
            icons: <img className="icon-temp" src={IconHumidity} />,
            type: 'relativeHumidity',
            name: 'Umidade'
        });
    })
    return temperature;
}

export const PrevisionFuture = (foreCasts: Forecast[]) => {
    const temperatureForeCast: Prevision[] = [];

    if (foreCasts.length > 0) {
        foreCasts.forEach(item => {
            temperatureForeCast.push({
                prevision: "mm",
                date: Math.round(item.forecast[0].rain),
                icons:
                    item.forecast[0].rain > 0 ? (
                        <img className="icon-temp" src={IconRain} />
                    ) : (
                        <img className="icon-temp" src={IconChuvaNublado} />
                    ),
                type: 'rain',
                name: 'Chuva',
            })

            temperatureForeCast.push({
                prevision: "ºC - Max",
                date: Math.round(item.forecast[0].temperatureMax),
                icons: <img className="icon-temp" src={IconTemperatureMax} />,
                type: 'temperatureMax',
                name: 'Temperatura +',

            });
            temperatureForeCast.push({
                prevision: "ºC - Min",
                date: Math.round(item.forecast[0].temperatureMin),
                icons: <img className="icon-temp" src={IconTemperatureMin} />,
                type: 'temperatureMin',
                name: 'Temperatura - min',
            });
            temperatureForeCast.push({
                prevision: "mm",
                date: item.forecast[0].rainProbability.toFixed(2),
                icons: <img className="icon-temp" src={RainProb} />,
                type: 'rainProbability',
                name: 'Probabilidade de Chuva',
            });
            temperatureForeCast.push({
                prevision: "",
                date: item.forecast[0].rainPrediction,
                icons: <img className="icon-temp" src={IconChuvaNublado} />,
                type: 'rainPrediction',
                name: 'Previsão de chuva'
            });
        });
    }
    return temperatureForeCast;

}

export const PrevisionPast = (foreCasts: Forecast[]) => {
    const temperaturePresent: Prevision[] = [];
    foreCasts.forEach(item => {
        if (item.past.length > 0) {
            temperaturePresent.push({
                prevision: "mm",
                date: 200,
                icons:
                    item.past[0].rain > 0 ? (
                        <img className="icon-temp" src={IconRain} />
                    ) : (
                        <img className="icon-temp" src={IconChuvaNublado} />
                    ),
                type: 'rain',
                name: 'Chuva'
            });
            temperaturePresent.push({
                prevision: "ºC",
                date: item.past[0].temperatureMax,
                icons: <img className="icon-temp" src={IconTemperature} />,
                type: 'temperatureMax',
                name: 'Temperatura'
            });
            temperaturePresent.push({
                prevision: "Km/h",
                date: item.past[0].windSpeed,
                icons: <img className="icon-temp" src={IconWind} />,
                type: 'windSpeed',
                name: 'V-Vento'
            });
            temperaturePresent.push({
                prevision: "Wh/m²",
                date: item.past[0].solarIrradiation,
                icons: <img className="icon-temp" src={ClearDay} />,
                type: 'solarIrradiation',
                name: 'Radiação'
            });
            temperaturePresent.push({
                prevision: "%",
                date: item.past[0].relativeHumidity,
                icons: <img className="icon-temp" src={IconHumidity} />,
                type: 'relativeHumidity',
                name: 'Umidade'
            });
        }
    });
    return temperaturePresent;
}

