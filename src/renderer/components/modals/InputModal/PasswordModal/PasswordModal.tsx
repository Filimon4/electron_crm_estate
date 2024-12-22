import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
  FormErrorMessage,
} from "@chakra-ui/react";
import { isLettersOnly, isPasswordOnly } from "../../../../shared/utils/form";
import { CustomFormInput } from "../../../global/FormInput/FormInput";

const PasswordModal = ({ isOpen, onClose, onSave}: { isOpen: boolean; onClose: () => void, onSave: (name: string) => void }) => {
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!password.trim()) {
      return;
    }
    onSave(password);
    setPassword("");
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Введите пароль</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomFormInput regexCheck={isPasswordOnly} value={password} setValue={(input: string) => setPassword(input)}  id='password' inputType='password' name='Пароль' />
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={!password.trim() && password.length <= 4} colorScheme="blue" mr={3} onClick={handleSubmit}>
              Сохранить
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default PasswordModal;
