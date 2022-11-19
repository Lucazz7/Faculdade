import { ContainerRelatorio, IframesLooker } from './relatorioStyle';

export const Relatorio = () => {

    return (
        <ContainerRelatorio>
            <IframesLooker
                src="https://zeusagrolooker.cloud.looker.com/login/embed/%2Fembed%2Fdashboards%2F4?nonce=%22doy8IJ0vSf6gpJem%22&time=1665106129&session_length=900&external_user_id=%2257%22&permissions=%5B%22see_user_dashboards%22%2C%22see_lookml_dashboards%22%2C%22access_data%22%2C%22see_looks%22%5D&models=%5B%22thelook%22%5D&access_filters=%7B%7D&first_name=%22Zeus%20Minerva%20Project%22&last_name=%22Zeus%20Minerva%20Project%22&group_ids=%5B4%5D&external_group_id=%22awesome_engineers%22&user_attributes=%7B%7D&force_logout_login=false&signature=CoAaKh3pWGxgYseCvckZV57CJPo%3D"
                frameBorder="0">
            </IframesLooker>
        </ContainerRelatorio >
    );
};