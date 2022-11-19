import { FC, useState } from 'react';
import { SLayout } from '../../components/Layout/styles';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Configuration } from '../Configuracao/UseConfiguration';
import { DashBoard } from '../DashBoard/UseDashboard';
import { Map } from '../Mapa/useMap';
import { Previsoes } from '../Previsoes/previsoes';
import { Relatorio } from '../Relatorio/useRelatorio';
import Users from '../Usuarios/useUSers';

export const Dash: FC = () => {
    return <SLayout>
        <Sidebar />
        <DashBoard />
    </SLayout>;
};

export const Mapa: FC = () => {
    // const [camera, setCamera] = useState({});
    return <SLayout>
        <Sidebar />
        <Map />
        {/* <Map onCameraChange={(newCamera: object) => {
                                setCamera(newCamera);
                            }} /> */}
    </SLayout>;
};

export const User: FC = () => {
    return <SLayout >
        <Sidebar />
        <Users />
    </SLayout >;
};
export const Relatorios: FC = () => {
    return <SLayout >
        <Sidebar />
        <Relatorio />
    </SLayout >;
};

export const Previsao: FC = () => {
    return <SLayout >
        <Sidebar />
        <Previsoes />
    </SLayout >;
};

export const Configurations: FC = () => {
    return <SLayout >
        <Sidebar />
        <Configuration />
    </SLayout >;
};
