import React from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { If } from '../../operators';


type Props = {
    modalTitle: string;
    modalDescription?: string;
    onToggle(): void;
    isOpen: boolean;
    onSubmit(): void;
    buttonSubmitText: string;
    buttonSubmitDisabled?: boolean;
    children: React.ReactElement;
    size?: string;
    labelledBy?: string;
    className?: string;
    keyboard?: boolean;
    modalName?: string;
    modalEmail?: string;
    modalSenha?: string;
    modalTelefone?: string;
};

const ModalInput: React.FC<Props> = ({
    modalTitle,
    modalDescription,
    modalName,
    modalEmail,
    modalSenha,
    modalTelefone,
    isOpen,
    onToggle,
    onSubmit,
    buttonSubmitText,
    buttonSubmitDisabled,
    children,
    size,
    labelledBy,
    className,
    keyboard,
}: Props) => {
    return (
        <Modal
            size={size}
            className={className}
            isOpen={isOpen}
            toggle={onToggle}
            labelledBy={labelledBy}
            keyboard={keyboard === undefined || !!keyboard}
            scrollable
        >
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
                <If condition={!!modalDescription}>
                    <div>
                        <Input placeholder="text" type="text">{modalName}</Input>
                        <Input placeholder="email" type="email">{modalEmail}</Input>
                        <Input placeholder="Senha" type="password">{modalSenha}</Input>
                        <Input placeholder="telefone" type="text">{modalTelefone}</Input>
                    </div>
                </If>
                {children}
            </ModalBody>
            <ModalFooter className="flex-row-reverse justify-content-between">
                <Button
                    color="success"
                    onClick={onSubmit}
                    disabled={buttonSubmitDisabled}
                >
                    {buttonSubmitText}
                </Button>
                <Button color="danger" onClick={onToggle}>
                    cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalInput;
