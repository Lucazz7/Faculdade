/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerInput, Content, Divmain, InputValue, LoginButton, SenhaTitle, TitleEmail, Titulo, VideoBackground } from './loginStyle';
import video from '../../Video/fundo.mp4';
import video2 from '../../Video/matobrabo.mp4';
import video3 from '../../Video/nascerSol.mp4';
import logo from '../../Image/Fundo.png';
import { AlertContainer, alert } from 'react-custom-alert';
import { Authentication } from '../../services/login-services';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import '../../Alerts/alert.css'
import { AuthenticationState } from '../../Redux/redux-authentication';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { auth } from '../../firebaseConfig/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


export interface AuthVerification {
    loginEmail: string;
    loginPassword: string;
}

interface AuthProps {
    authProp: AuthenticationState;
}

export const Login = () => {

    const { authProp } = useSelector<RootState, AuthProps>(state => (
        {
            authProp: state.propsAuthentication,
        }
    ));


    const history = useNavigate();
    const dispatch = useAppDispatch();


    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [logonClick, setLogonClick] = useState<boolean>(false);

    const videos = useMemo(() => {
        return [video, video2, video3]
    }, []);

    const alertError = () => alert({ message: 'Senha incorreta', type: 'error' });
    const alertSuccess = () => alert({ message: 'success', type: 'success' });


    const indexVideos = useMemo(() => {
        const arr = [0, 1, 2];
        return arr[Math.floor(Math.random() * arr.length)];
    }, [])

    //Falta ajustes
    const login = async () => {
        dispatch(Authentication({
            loginEmail,
            loginPassword
        }))
        setLogonClick(true)
    };


    //Falta ajustes

    useEffect(() => {
        if (logonClick && authProp.valid) {
            history('/dashboard');
            alertSuccess();
            setLogonClick(false)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('user', 'true');
                } else {
                    localStorage.removeItem('user');
                }
            });
        } else if (logonClick && authProp.error !== undefined) {
            alertError();
            localStorage.removeItem('user');
        }

    }, [logonClick, authProp, auth]);

    return (
        <Divmain>
            <AlertContainer floatingTime={5000} />
            <VideoBackground src={videos[indexVideos]} autoPlay loop muted />
            <Content>
                <ContainerInput>
                    <Titulo src={logo} />
                    <TitleEmail>E-mail</TitleEmail>
                    <InputValue
                        type='text'
                        placeholder='Digite seu e-mail' onChange={(e) => setLoginEmail(e.target.value)} />
                    <SenhaTitle>Senha</SenhaTitle>
                    <InputValue
                        type='password'
                        placeholder='Digite sua senha' onChange={(e) => setLoginPassword(e.target.value)} />
                    <LoginButton onClick={() => login()}>Login</LoginButton>
                </ContainerInput>
            </Content>
        </Divmain>
    );

};

