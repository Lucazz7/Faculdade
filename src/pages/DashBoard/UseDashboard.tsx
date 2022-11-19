import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { Blocks } from "../../Model/blocksModel";
import { DashState, getIdBlocks, getLookerBlock } from "../../Redux/redux-DashBoard";
import Moment from 'moment';

import { If } from "../operators";
import chuva from "../../Image/chuvaAnim2.jpg";
import sol from "../../Image/sol.jpg";
import nublado from "../../Image/nublado.jpg";
import './animations.css';


import {
  Container,
  ButtonStyle,
  DivIconsBlocks,
  DivIconsTemp,
  TitleBlocks,
  DivIconsPrevision,
  DivIconsHistory,
  ContainerTitleBt,
  TitleBLocks,
  Left,
  DayBox,
  H3Styled,
  PStyled,
  BackPrevision,
  ReturnButton,
  IconsHistory,
  LiHistory,
} from "./dashboardStyled";

import "./estilo.scss";
import "./estiloHexagoHistory.scss";
import {
  BsCaretLeftFill,
  BsCaretRightFill,

  BsCloudLightningRainFill,
  BsListUl,
  BsSunFill,
  BsXLg,
} from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { FaTemperatureHigh } from "react-icons/fa";
import { VscDebugStepBack } from "react-icons/vsc";
import { TbHexagons } from "react-icons/tb";
import { RootState } from "../../Redux/store";
import { useAppDispatch } from "../../hooks/useTypeSelector";
import { getBlocks, getBlocksMap, getForeCast } from "../../services/dashboard-services";
import { PrevisionFuture, PrevisionPast, PrevisionPresent } from "./CardsPrevision/previsionCards";

// Type para gerenciar os ícones de previsões
interface Prevision {
  prevision: string;
  date: number | string;
  icons: JSX.Element;
  type: string;
  name: string;
  inforPrev?: {
    infodate: number;
    name: string;
    icons: JSX.Element;
  }
};

// Type de importações de estados do redux
interface DashProps {
  dashProps: DashState;
}

// Type refente o gerenciador de histórico 
interface HistoryBlocks {
  name: string;
  id: string;
}

export const DashBoard = () => {
  // importação do dispatch para fazer as chamadas do redux
  const dispatch = useAppDispatch();



  //Gerenciamento de estado do Redux
  const { dashProps } = useSelector<RootState, DashProps>(state => (
    {
      dashProps: state.dashboardMap,
    }
  ));

  //UseEffect disparando a chamadas dos blocos para o dashboard
  useEffect(() => {
    dispatch(getBlocks())
  }, [dispatch])


  // Array com imagens de fundo do hexágonos
  const fundo = [nublado, sol, chuva];

  // useStates / Gerenciamento de estados
  //! UseStates / Gerenciamento de estados tentar encontrar uma forma de diminuir a quantidade de useState.
  const [historyBlocks, setHistoryBlocks] = useState<HistoryBlocks[]>([])
  const [notGetHistory, setNotGetHistory] = useState<boolean>(true);
  const [listOrHexagon, setlistOrHexagon] = useState<boolean>();
  const [selectedLasBlock, setSelectedLasBlock] = useState("");
  const [temp, setTemp] = useState("");
  const [blockIdHistory, setBlockIdHistory] = useState("");
  const [selectedTalhãoGeneration, setSelectedTalhãoGeneration] = useState("");
  const [blockNivelName, setBlockNivelName] = useState("Clientes");
  const [lefParent, setParent] = useState<boolean>(false);
  const [blocksState, setBlocksState] = useState<Blocks[]>([]);
  const [blockCLicked, setBlockCLicked] = useState<string>('0');
  const [indexForeCast, setIndexForeCast] = useState<number | undefined>();
  const [forCastFront, setForCastFront] = useState('+10');
  const [forCastBack, setForCastBack] = useState('-10');

  // dispatch redux / navigate routers
  const navigate = useNavigate();


  // Chamadas dos dados mocados
  const blocks = dashProps.data;
  const foreCasts = dashProps.forCast;
  // useEffect para percorrer o Array e verificar as temperaturas && setar o estado inicial
  // para carregar apenas blocos com blockParent 0 como incio.
  useEffect(() => {
    setBlocksState(blocks.filter((item) => item.blockParent === "0"));
  }, [blocks]);

  // condição para verificar se esta no primeiro block parent
  // para ocultar botão de voltar
  const initialBlock = useMemo(() => {
    let inicialBlock = false;

    blocksState?.forEach((item) => {
      if (item.blockParent !== "0") {
        inicialBlock = true;
      } else {
        setBlockNivelName("Clientes");
      }
    });

    return inicialBlock;
  }, [blocksState]);

  useEffect(() => {
    const history: HistoryBlocks[] = [];
    if (blockNivelName !== 'Clientes') {
      if (notGetHistory) {
        history.push({
          name: blockNivelName,
          id: blockIdHistory,
        })
        setHistoryBlocks(obj => obj.concat(history));
      }

    } else {
      history.push({
        name: 'Incio',
        id: '0',
      })
      setHistoryBlocks(history)
    }

  }, [blockNivelName, blockIdHistory, notGetHistory])

  //Select Temp
  const selectTemp = useMemo(() => {
    const blockSelected = blocksState.filter(item => item.blockId === blockCLicked);
    //TODO: Temperatura atual
    const temperature = PrevisionPresent(blockSelected);
    //TODO: Temperatura proximo 10 dias
    const temperatureForeCast = PrevisionFuture(foreCasts);
    //TODO: Temperatura 10 dias anteriores
    const temperaturePast = PrevisionPast(foreCasts);

    const allStateTemp = [temperature, temperaturePast, temperatureForeCast]

    if (dashProps.forCast.length === 0) {
      setForCastFront("+10")
      setForCastBack("-10");
    }
    return allStateTemp;
  }, [blocksState, blockCLicked, dashProps, foreCasts]);

  // Função para entrar nas folhas e percorrer e verificar se e lefParent ou não e seta o nome do nível do bloco.
  const selectBlock = useCallback(
    (blockId: string, leafParent: boolean, blockName: string) => {
      setNotGetHistory(true)
      setParent(leafParent);
      setBlockNivelName(blockName);
      setBlockIdHistory(blockId)
      if (!leafParent) {
        setSelectedLasBlock(blockId);
        setBlocksState(blocks.filter((item) => item.blockParent === blockId));
      } else {
        setSelectedTalhãoGeneration(blockId);
        dispatch(getIdBlocks({ getId: blockId }))
      }
    },
    [blocks, dispatch]
  );

  // UseEffect para verificar se é lefParent e tem dados e enviar eles para a tela do mapa pelo redux
  useEffect(() => {
    if (blocksState.length > 0) {
      setBlockCLicked(blocksState[0].blockId);
    }
    blocksState?.forEach((block) => {
      block.data.rain > 0
        ? setTemp("rainy")
        : block.data.solarIrradiation < 100.411004 &&
          block.data.temperature < 12
          ? setTemp("cloudy")
          : block.data.temperature > 37
            ? setTemp("sunny")
            : "";
    });

    if (
      lefParent &&
      selectedTalhãoGeneration.length > 0
    ) {
      dispatch(getBlocksMap(selectedTalhãoGeneration));
      dispatch(getLookerBlock({ isMapLookerOrMap: false }))
      navigate("/map");
    }
  }, [
    selectedTalhãoGeneration,
    temp,
    lefParent,
    selectedTalhãoGeneration,
    blocksState,
  ]);

  // função para voltar para as folhas filho do bloco e seta o nome do nível do bloco
  const blocksSelect = useCallback(() => {
    setNotGetHistory(false)

    setHistoryBlocks(historyBlocks.splice(historyBlocks.length - 1, 1));


    blocksState?.forEach((block) => {
      const filtro = blocks.filter((item) => {
        if (block.blockParent === item.blockId) {
          blocks.filter((name) =>
            name.blockId === item.blockParent
              ? setBlockNivelName(name.name)
              : ""
          );
        }
        return block.blockParent === item.blockId;
      });
      filtro.forEach((block) => {
        setBlocksState(
          blocks.filter((item) => item.blockParent === block.blockParent)
        );
      });
    });
  }, [blocks, blocksState, selectedLasBlock]);


  //! Corrigir Nome da Função
  const backEspecificBlocks = useCallback((id: string, indexSelect: number) => {

    setHistoryBlocks(historyBlocks.filter((item, index) => {
      if (index <= indexSelect) {
        return item
      }
    }));

    setBlocksState(blocks.filter((item) => item.blockParent === id));
  }, [blocks, historyBlocks])


  //! Função para gerenciar o comportamento dos botões de foreCast Depois Procurar maneira de melhorar e diminuir o numero de Linhas
  const foreCast = useCallback((moreOrLess: string) => {
    if (dashProps.forCast.length > 0) {
      if (moreOrLess === 'front' && indexForeCast === 0) {
        setForCastBack('atual')
      }
      if (moreOrLess === 'front' && indexForeCast === 1) {
        setForCastFront('+10')
      }
      if (moreOrLess === 'back' && indexForeCast === 0) {
        setForCastFront('atual')
      }
      if (moreOrLess === 'back' && indexForeCast === 2) {
        setForCastBack('-10')
      }
    }
  }, [dispatch, blockCLicked, indexForeCast, dashProps]);

  useEffect(() => {
    dispatch(getForeCast(blockCLicked))

  }, [dispatch, blockCLicked])


  return (
    <Container>
      <div className="blocksGeneration">
        <DivIconsBlocks>
          <ContainerTitleBt>
            <If condition={initialBlock}>
              <ReturnButton>
                <VscDebugStepBack
                  className="buttonReturn"
                  onClick={() => blocksSelect()}
                />
              </ReturnButton>
            </If>

            <TitleBLocks>
              <Input
                className="text-input"
                type="text"
                placeholder={blockNivelName}
              />
            </TitleBLocks>

          </ContainerTitleBt>
          <div
            className="hex-grid">
            {/* <div className="hex-grid"> */}

            <div className="container-hexagon" >
              {blocksState?.map((item) => (
                <div ng-repeat="item in app.items" className="grid-item repeat-animation" style={blockCLicked === item.blockId ? { filter: 'drop-shadow(0 0 8px #ED5400)' } : null}>

                  <div className="inner"  >

                    <ButtonStyle className="inner-inner"
                      onClick={() => setBlockCLicked(item.blockId)}
                      onDoubleClick={() =>
                        selectBlock(item.blockId, item.leafParent, item.name)
                      }
                      style={
                        item.data.rain > 0
                          ? { background: `url(${fundo[2]})` }
                          : item.data.solarIrradiation < 100.411004
                            ? { background: `url(${fundo[1]})` }
                            : { background: `url(${fundo[0]})` }
                      }
                    >
                      <h1 className="text-block">{item.abrv}</h1>


                      <div className="demo2">

                        {/* <div className="inner-text"> */}
                        <p className="infobc">
                          <BsCloudLightningRainFill style={{ fontSize: '18px', margin: "2px" }} /> <a> {Math.round(item.data.rain)} mm</a>
                        </p>
                        <p className="infobc">
                          <FaTemperatureHigh style={{ fontSize: '18px', margin: "2px" }} /> <a> {Math.round(item.data.temperature)} ºC</a>
                        </p >
                        <p className="infobc">
                          <BsSunFill style={{ fontSize: '18px', margin: "2px" }} /> <a> {Math.round(item.data.solarIrradiation)} Wh/m²</a>
                        </p>
                        {/* </div> */}
                      </div>

                    </ButtonStyle>

                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* </div> */}
        </DivIconsBlocks >
        <div className="container-history">
          <DivIconsHistory>
            <TitleBlocks>
              <div className="title-history">
                <IconsHistory>
                  {listOrHexagon ? <TbHexagons className="bt-list" onClick={() => setlistOrHexagon(!listOrHexagon)} /> : <BsListUl className="bt-list" onClick={() => setlistOrHexagon(!listOrHexagon)} />}
                </IconsHistory>
                <TitleBLocks style={{ marginRight: '30px' }} >
                  Histórico
                </TitleBLocks>

              </div>
              <div className="honeycomb">
                <div className="container">
                  {!listOrHexagon ? <div >{historyBlocks.map((item, index) =>
                    <div className="hexa" onClick={() => backEspecificBlocks(item.id, index)}>
                      <div className="hexagontent" >{item.name} </div>
                    </div>
                  )}</div> : <div >{historyBlocks.map((item, index) =>
                    <LiHistory onClick={() => backEspecificBlocks(item.id, index)}>
                      <li className="li-history" >{item.name} </li>
                    </LiHistory>
                  )}</div>}
                </div>
              </div>
            </TitleBlocks>
          </DivIconsHistory  >
        </div>
      </div >
      <div className="blocksTemp">
        <DivIconsPrevision>

          <div className="slider-container">
            <div className="slider">
              <div className="slides">

                {indexForeCast !== undefined && selectTemp[1].length > 0 ?
                  <div className="slide" id="slides__1">
                    {selectTemp[1].map((item) => (
                      <DivIconsTemp>
                        <DayBox>
                          <div className="content">
                            <Left>
                              <div className="topTime"></div>
                              <div className="inner">
                                <div className="temp">
                                  <p>{Math.round(item.date as number)}{item.prevision}</p>

                                </div>
                                <div className="weatherNow">
                                  {item.icons}
                                </div>
                                <div className="info">
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            </Left>

                            <div className="right">
                              {foreCasts.map((infoTempList) =>
                                infoTempList.past.map((info =>

                                  <div className="weatherList">
                                    <H3Styled>{Moment(info.date).format('DD/MM')}</H3Styled>
                                    <p className="iconsList">{item.icons}</p>
                                    <PStyled>{Math.round(info[item.type])}</PStyled>
                                  </div>
                                )
                                ))}
                            </div>
                          </div>
                        </DayBox>
                      </DivIconsTemp>
                    ))}
                    {/* <a className="slide__prev" href="#slides__0" title="Next" onClick={() => setIndexForeCast(0)}></a> */}
                    <a className="btFront" href={dashProps.forCast.length > 0 ? "#slides__0" : undefined} onClick={() => setIndexForeCast(0)}>
                      <BackPrevision onClick={() => foreCast('front')}>
                        {dashProps.forCast.length === 0 ? <BsXLg style={{ fontSize: '40px', color: 'red' }} /> : <div>
                          {forCastBack === 'atual' ? '' : <p className="text-if">{forCastFront}</p>}
                          <BsCaretRightFill style={{ fontSize: '40px', color: "inherit" }} />
                        </div>}
                      </BackPrevision>
                    </a>
                  </div> : ''}
                <div className="slide" id="slides__0">
                  <a className="btFront" href={dashProps.forCast.length > 0 ? "#slides__1" : undefined} onClick={() => setIndexForeCast(1)}>
                    <BackPrevision onClick={() => foreCast('back')}>
                      {dashProps.forCast.length === 0 ? <BsXLg style={{ fontSize: '40px', color: 'red' }} /> : <div>
                        {forCastFront === 'atual' ? '' : <p className="text-if">{forCastBack}</p>}
                        <BsCaretLeftFill style={{ fontSize: '40px', color: "inherit" }} />
                      </div>}
                    </BackPrevision>
                  </a>
                  {selectTemp[0].map((item) => (
                    <DivIconsTemp>
                      <DayBox>
                        <div className="content">
                          <Left>
                            <div className="topTime"></div>
                            <div className="inner">
                              <div className="temp">
                                <p>{Math.round(item.date as number)}{item.prevision}</p>

                              </div>
                              <div className="weatherNow">
                                {item.icons}
                              </div>
                              <div className="info">
                                <p>{item.name}</p>
                              </div>
                            </div>
                          </Left>

                          <div className="right">
                            {blocksState.map(infoTempList =>
                              <div className="weatherList">
                                <H3Styled>{infoTempList.abrv}</H3Styled>
                                <p className="iconsList">{item.icons}</p>
                                <PStyled>{Math.round(infoTempList.data[item.type])} {item.prevision}</PStyled>
                              </div>
                            )}
                          </div>
                        </div>
                      </DayBox>
                    </DivIconsTemp>
                  ))}
                  <a className="btFront" href={dashProps.forCast.length > 0 ? "#slides__2" : undefined} onClick={() => setIndexForeCast(2)}>
                    <BackPrevision onClick={() => foreCast('front')}>
                      {dashProps.forCast.length === 0 ? <BsXLg style={{ fontSize: '40px', color: 'red' }} /> : <div>
                        {forCastBack === 'atual' ? '' : <p className="text-if">{forCastFront}</p>}
                        <BsCaretRightFill style={{ fontSize: '40px', color: "inherit" }} />
                      </div>}
                    </BackPrevision>
                  </a>
                </div>
                {indexForeCast !== undefined && selectTemp[2].length > 0 ?

                  <div className="slide" id="slides__2">
                    <a className="btFront" href={dashProps.forCast.length > 0 ? "#slides__0" : undefined} onClick={() => setIndexForeCast(0)}>
                      <BackPrevision onClick={() => foreCast('back')}>
                        {dashProps.forCast.length === 0 ? <BsXLg style={{ fontSize: '40px', color: 'red' }} /> : <div>
                          {forCastFront === 'atual' ? '' : <p className="text-if">{forCastBack}</p>}
                          <BsCaretLeftFill style={{ fontSize: '40px', color: "inherit" }} />
                        </div>}
                      </BackPrevision>
                    </a>
                    {selectTemp[2].map((item) => (
                      <DivIconsTemp>
                        <DayBox>
                          <div className="content">
                            <Left>
                              <div className="topTime"></div>
                              <div className="inner">
                                <div className="temp">
                                  <p>{item.date}{item.prevision}</p>

                                </div>
                                <div className="weatherNow">
                                  {item.icons}
                                </div>
                                <div className="info">
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            </Left>
                            <div className="right">
                              {foreCasts.map((infoTempList) =>
                                infoTempList.forecast.map((info =>

                                  <div className="weatherList">

                                    <H3Styled>{Moment(info.date).format('DD/MM')}</H3Styled>
                                    <p className="iconsList">{item.icons}</p>
                                    <PStyled>{typeof info[item.type] == "string" ? info[item.type] : info[item.type].toFixed(1)}</PStyled>

                                  </div>

                                )

                                ))}
                            </div>
                          </div>
                        </DayBox>
                      </DivIconsTemp>
                    ))}

                    {/* <a className="slide__prev" href="#slides__0" title="Next" onClick={() => setIndexForeCast(0)}></a> */}
                    {/* <a className="slide__next" href="#slides__4" title="Next"></a> */}
                  </div>
                  : ''}
              </div>
            </div>
          </div>
        </DivIconsPrevision>
      </div >


    </Container >
  );
};
