/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useMemo, useState } from "react";
import SceneView from "@arcgis/core/views/SceneView";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";
import type Camera from "@arcgis/core/Camera";
import Graphic from "@arcgis/core/Graphic";
import Mapa from "@arcgis/core/Map";
import Search from "@arcgis/core/widgets/Search";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { Polygon } from "@arcgis/core/geometry";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import type Point from "@arcgis/core/geometry/Point";

import "./mapa.scss";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DashState } from "../../Redux/redux-DashBoard";
import { getBlocksTreeIdLatLongRequestData } from "../Temporario/moock";
import { RootState } from "../../Redux/store";
import { useAppDispatch } from "../../hooks/useTypeSelector";
import { getAllBlocksMap } from "../../services/dashboard-services";
import { ContainerMap } from "./styledMap";
import { LoadingIcon } from "../../Loading/loading";
import { ContainerRelatorio, IframesLooker } from "../Relatorio/relatorioStyle";


// const cameraToWgs84 = (camera: Camera): Camera => {
//   const cameraClone = camera.clone();
//   const wgs84Position = webMercatorUtils.webMercatorToGeographic(camera.position, false) as Point;
//   cameraClone.position = wgs84Position;
//   return cameraClone;
// };

// interface MapProps {
//   onCameraChange: (args: object) => void;
// }

// export const  Map = ({ onCameraChange }: MapProps) => {

type MapProps = {
  // geometry: Props[];
  dateState: DashState;
};

export const Map = () => {
  const dispatch = useAppDispatch();

  // const location = useLocation();
  // const geometry = location.state as Props;

  const { dateState } = useSelector<RootState, MapProps>(state => (
    {
      // geometry: state.dashboardMap.mapProps,
      dateState: state.dashboardMap,
    }
  ));

  const [timeGenerationMap, setTimeGenerationMap] = useState<boolean>(true)
  const [temp, setTemp] = useState<"cloudy" | "sunny" | "snowy" | "rainy">();

  useEffect(() => {
    dispatch(getAllBlocksMap())
  }, [dispatch])

  const dataBoulds = useMemo(() => {
    return dateState.blocksMap.map(item => item.bounds);
  }, [dateState]);


  // const lastBlockSelect = geometry[geometry.length - 1];

  // função para pegar o centroids do Mapa
  const getCentroidId = useMemo(() => {
    const centroId: number[] = [];

    dateState.blocksMap.forEach((block, index) => {
      if (index === 0 && index <= 4) {
        centroId.push(...block.centroid);
      }
    });

    return centroId;
  }, [dateState]);

  //Condição para verificar o clima para retornar no mapa
  const temperature = useMemo(() => {
    dateState.blocksMap.map((block) => {
      block.data.rain > 0
        ? setTemp("rainy")
        : block.data.solarIrradiation < 100.411004 &&
          block.data.temperature < 12
          ? setTemp("cloudy")
          : block.data.temperature > 37
            ? setTemp("sunny")
            : "";
    });
    return temp
  }, [dateState, temp]);

  const mapDiv = useRef(null);

  const map = new Mapa({
    basemap: "hybrid",
  });

  //Condição que valida se os talhões do mapa veio de um bloco ou veio direto para o mapa com todos os talhões
  const filterBlocks = useMemo(() => {
    if (dateState.blocksMap.length === 0) {
      return dateState.blocks.filter((item, index) => {
        return index > 0 && item.length > 4;
      });
    } else {
      return dataBoulds;
    }
  }, [dataBoulds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeGenerationMap(dateState.loading)
    }, 3000);
    return () => clearTimeout(timer);

  }, [dateState]);

  //UseEffect que controla/carrega o mapa e sua funções, onde se configura o mapa parâmetros e etc.
  useEffect(() => {
    const polygon = new Polygon({
      // hasZ: true,
      // hasM: true,
      rings: filterBlocks,
      // spatialReference: { wkid: 4326 }
    });

    if (mapDiv.current) {
      // Create the map:
      const view = new SceneView({
        container: mapDiv.current,
        //Qualidade do mapa
        qualityProfile: "medium",
        //Definições do mapa por exemplo, Hibrido, se é 3d ou 2d etc
        map: map,
        //Parametros de clima
        environment: {
          weather: {
            type: temperature,
            cloudCover: 0.2,
            precipitation: 0.4,
            snowCover: "enabled",
            // autocasts as new RainyWeather({ cloudCover: 0.8, precipitation: 0.3 })
          },
        },
        //Posição central do mapa quando carregado
        center:
          dateState.blocksMap.length > 0
            ? [-50.422708, -17.829117]
            : [getCentroidId[0], getCentroidId[1]],
        // Camera Posição angulo altura e etc.    
        camera:
          dateState.blocksMap.length > 0
            ? {
              // autocasts as new Camera()
              position: {
                // autocasts as new Point()
                x: getCentroidId[0],
                y: getCentroidId[1],
                z: 1999,
              },
              heading: 0.01386677512863,
              tilt: -69.90434758179448,
              fov: 70,
            }
            :
            {
              position: {
                // autocasts as new Point()
                x: -50.422708,
                y: -17.785008,
                z: 101010,
              },

              fov: 70,
            },
      });

      // Poput ao clicar do mapa falta validar e mudar condições
      const popupTemplate = {
        title: "{Name}",
        content: "{Description}",
      };
      const attributes = {
        Name: "Graphic",
        Description: "I am a polygon",
      };

      // Para ver a posição da camera pelo console falta corrigir gráfico 3d
      // view.when(() => {

      //   view.watch('camera', (camera: Camera) => {
      //     onCameraChange(cameraToWgs84(camera));
      //     console.log(view.camera);
      //   });

      //   onCameraChange(cameraToWgs84(view.camera)); // call once!

      // });

      //Add os Polygon no mapa, aplica a função ao mapa
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      ;//Configura parâmeros do polygon cor formato largura da linha etc.
      const fillSymbol = {
        type: "cross", // autocasts as new SimpleFillSymbol()
        color: [227, 139, 79, 0.139],
        cancelIdleCallback: true,
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2,
        },
      };

      //click no polygon
      const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate,
      });

      graphicsLayer.add(polygonGraphic);
    }
  }, [filterBlocks, map]);

  //Div Map
  return (
    <>
      {
        dateState.blocksMap.length === 0 || dateState.lookerMapOrMap ? <ContainerRelatorio>
          <IframesLooker
            src="https://zeusagrolooker.cloud.looker.com/login/embed/%2Fembed%2Fdashboards%2F8?nonce=%22doy8IJ0vSf6gpJem%22&time=1665106129&session_length=900&external_user_id=%2257%22&permissions=%5B%22see_user_dashboards%22%2C%22see_lookml_dashboards%22%2C%22access_data%22%2C%22see_looks%22%5D&models=%5B%22thelook%22%5D&access_filters=%7B%7D&first_name=%22Zeus%20Minerva%20Project%22&last_name=%22Zeus%20Minerva%20Project%22&group_ids=%5B4%5D&external_group_id=%22awesome_engineers%22&user_attributes=%7B%7D&force_logout_login=false&signature=CoAaKh3pWGxgYseCvckZV57CJPo%3D"
            frameBorder="0">
          </IframesLooker>
        </ContainerRelatorio > : <ContainerMap>
          {
            !timeGenerationMap ?
              <div className="Map" ref={mapDiv}></div>
              : <LoadingIcon />
          }
        </ContainerMap >}
    </>
  );
};
