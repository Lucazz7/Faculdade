import './index.css'
import { ArcoOne, ArcoTwo, BordStyledOne, BordStyledTwo, ContentLogin, SpinneBox } from './styledLogin'
import logo from '../Image/logozeusNome.png'

export const LoadingIcon = () => {

    return (
        <ContentLogin>
            <SpinneBox>
                <BordStyledOne>
                    <ArcoOne>
                        <img src={logo} />
                    </ArcoOne>
                </BordStyledOne>
                <BordStyledTwo>
                    <ArcoTwo>
                        <img src={logo} />
                    </ArcoTwo>
                </BordStyledTwo>
            </SpinneBox>
        </ContentLogin>
    )
}