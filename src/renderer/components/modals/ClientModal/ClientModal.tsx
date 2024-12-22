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
import { notifyConfig } from "../../../shared/events/notifies.config";
import { isEmailValid, isEnglishEmailOnly, isLettersOnly, isNumbersOnly, isPhoneValid } from "../../../shared/utils/form";
import { useAtom } from "jotai";
import { readUser } from "../../../shared/store";

const CreateClientModal = ({ isOpen, onClose, refetch }: any) => {
  const [user,] = useAtom(readUser)
  const [clientData, setClientData] = useState({
    first_name: "",
    sure_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [disable, setDisable] = useState(false)
  

  const isDataValid = () => {
    return (!clientData.first_name || !clientData.sure_name || !clientData.last_name || !clientData.email || !clientData.phone || clientData.phone.length !== 11 || !isEmailValid(clientData.email))
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!isDataValid) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    setDisable(true)
    //@ts-ignore
    const client = await window.invokes.createClient(user.id, clientData)
    if (client) {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
      refetch()
      setClientData({ first_name: "", last_name: "", sure_name: "", email: "", phone: "" });
      onClose();
    } else {
      notifyConfig.error('Произошла ошибка при создании клиента', {
        autoClose: 3000,
      })
    }
    setDisable(false)
    
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание нового клиента</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Фамилия</FormLabel>
              <Input
                placeholder="Введите фамилию"
                name={'sure_name'}
                value={clientData.sure_name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Имя</FormLabel>
              <Input
                placeholder="Введите имя"
                name={'first_name'}
                value={clientData.first_name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired >
              <FormLabel>Отчество</FormLabel>
              <Input
                placeholder="Введите отчество"
                name={'last_name'}
                value={clientData.last_name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl mt={4} isRequired isInvalid={!isEmailValid(clientData.email)}>
              <FormLabel>Почта</FormLabel>
              <Input
                type="email"
                placeholder="Введите почту"
                name="email"
                value={clientData.email}
                onChange={(e) => {(isEnglishEmailOnly(e.target.value)) && handleChange(e)}}
              />
              {!isEmailValid(clientData.email) &&
                <FormErrorMessage>Неверный формат почты</FormErrorMessage>
              }
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Номер телефона</FormLabel>
              <Input
                type="tel"
                placeholder="Введите номер телефона"
                name="phone"
                value={clientData.phone}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
              
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={isDataValid() || disable} colorScheme="blue" mr={3} onClick={handleSubmit}>
              Создать
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

export default CreateClientModal;
