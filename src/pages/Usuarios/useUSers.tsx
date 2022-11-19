/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/jsx-key */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { Input } from 'reactstrap';
import uuid from 'react-uuid';
import { UsersType } from '../../Model/blocksModel';
import { getUsersRequestData } from '../Temporario/moock';
import ModalInput from './Modal/modal';
import { BtNewUser, ContainerUser, DivNewUser, ImgUser, TableUser, TdUser, ThUser, TitleUser } from './userStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { UsersState } from '../../Redux/redux-Users';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { createUsers, deleteUsers, editUsers, getUsers } from '../../services/users-services';

export type CreateUser = {
    id?: string;
    email: string;
    phone: string;
    displayName: string;
    photoURL: string
}


type UserProps = {
    usersState: UsersState;
};


export const Users = () => {

    const dispatch = useAppDispatch();


    const { usersState } = useSelector<RootState, UserProps>(state => (
        {
            usersState: state.duckUsers,
        }
    ));


    const [openModal, setOpenModal] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [useEdit, setUseEdit] = useState<UsersType>();
    const [phoneUsers, setPhoneUsers] = useState('');
    const [editOrCreated, setEditOrCreated] = useState<boolean>();
    const [imagem, setImagem] = useState<File | null>(null);

    const newUserToggle = useCallback(() => {
        setOpenModal(!openModal);
        setEditOrCreated(true);
    }, []);

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    const editItemToggle = useCallback((editUser: UsersType) => {
        setOpenModal(!openModal);
        setUseEdit(editUser);
        setNameUser(editUser.displayName);
        setEmailUser(editUser.email);
        setPhoneUsers(editUser.phone);
        setEditOrCreated(false);
    }, []);

    const deleteUserToggle = useCallback((id: string) => {
        dispatch(deleteUsers(id));

    }, [dispatch]);

    useEffect(() => {
        if (usersState.action) {
            dispatch(getUsers());
        }
    }, [usersState, dispatch])

    const createUserToggle = useCallback(() => {

        dispatch(createUsers({
            id: uuid(),
            displayName: nameUser,
            email: emailUser,
            phone: phoneUsers,
            photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCumtO5MnRJWTtdw6-7RVWBi298qT4btvPTEcF0HMMx-OatsCFj2RtfVKxmTx1sGCgYmU&usqp=CAU',
        }))

        setOpenModal(!openModal);

    }, [uuid, nameUser, emailUser, phoneUsers, imagem, dispatch]);

    const editUserToggle = useCallback(() => {
        if (useEdit?.id) {
            dispatch(editUsers({
                id: useEdit?.id,
                displayName: nameUser,
                email: emailUser,
                phone: phoneUsers,
                photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCumtO5MnRJWTtdw6-7RVWBi298qT4btvPTEcF0HMMx-OatsCFj2RtfVKxmTx1sGCgYmU&usqp=CAU',
            }))
        }
        setOpenModal(!openModal);
    }, [dispatch, uuid, nameUser, emailUser, phoneUsers, imagem]);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <ContainerUser>
            <DivNewUser>
                <TitleUser> Gerenciamento de Usuários</TitleUser>
                <BtNewUser onClick={() => newUserToggle()}>Novo usuário</BtNewUser>
            </DivNewUser>
            <>
                {editOrCreated === false ? <ModalInput
                    modalTitle="Editar Usuário"
                    isOpen={openModal}
                    buttonSubmitText="Editar"
                    onToggle={() => setOpenModal(!openModal)}
                    onSubmit={editUserToggle}
                >
                    <div>
                        <a>Nome</a>
                        <Input placeholder="Nome" type="text" value={nameUser} onChange={e => setNameUser(e.target.value)}></Input>
                        <a>E-mail</a>
                        <Input placeholder="E-mail" type="email" value={emailUser} onChange={(e) => setEmailUser(e.target.value)}>E-mail</Input>
                        <a>Telefone</a>
                        <Input placeholder="telefone" type="tel" value={phoneUsers} onChange={(e) => setPhoneUsers(e.target.value)}>telefone</Input>
                        <a>Imagem</a>
                        <Input type='file' onChange={selecionarArquivo} />
                    </div>
                </ModalInput> : <ModalInput
                    modalTitle="Novo Usuário"
                    isOpen={openModal}
                    buttonSubmitText="Criar"
                    onToggle={() => setOpenModal(!openModal)}
                    onSubmit={createUserToggle}
                >
                    <div>
                        <a>Nome</a>
                        <Input placeholder="Nome" type="text" value={nameUser} onChange={e => setNameUser(e.target.value)}>Nome</Input>
                        <a>E-mail</a>
                        <Input placeholder="E-mail" type="email" value={emailUser} onChange={(e) => setEmailUser(e.target.value)}>E-mail</Input>
                        <a>Senha</a>
                        <Input placeholder="Senha" type="password" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)}>modalSenha</Input>
                        <a>Telefone</a>
                        <Input placeholder="telefone" type="tel" value={phoneUsers} onChange={(e) => setPhoneUsers(e.target.value)}>telefone</Input>
                        <a>Imagem</a>
                        <Input type="file" onChange={selecionarArquivo} />
                    </div>
                </ModalInput>
                }

                <TableUser>
                    <thead>
                        <tr>
                            <ThUser >Imagem</ThUser>
                            <ThUser >Nome</ThUser>
                            <ThUser >Email</ThUser>
                            <ThUser >Telefone</ThUser>
                        </tr>
                    </thead>
                    <tbody>
                        {usersState.data.map(user => (
                            <tr key={user.id}>
                                <ImgUser src={user.photoURL} />
                                <TdUser>{user.displayName}</TdUser>
                                <TdUser>{user.email}</TdUser>
                                <TdUser>{user.phone}</TdUser>
                                <AiOutlineEdit style={{ marginRight: '10px' }} values={user.id} onClick={() => editItemToggle(user)} />
                                <AiFillDelete values={user.id} onClick={() => deleteUserToggle(user.id)} />
                            </tr>
                        ))}
                    </tbody>
                </TableUser>
            </>
        </ContainerUser>
    );
};

export default Users;
