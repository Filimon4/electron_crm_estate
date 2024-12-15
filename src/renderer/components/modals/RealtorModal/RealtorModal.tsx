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

const CreateRealtorModal = ({ isOpen, onClose, refetch }: any) => {
  const [clientData, setClientData] = useState({
    first_name: "",
    sure_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const isDataValid = () => {
    return (!clientData.first_name || !clientData.email || !clientData.sure_name || !clientData.last_name || !clientData.phone || clientData.phone.length !== 11 || !clientData.password)
  }

  const handleSubmit = async () => {
    if (!isDataValid) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    //@ts-ignore
    const realtor = await window.context.createRealtor(clientData)
    if (realtor) {
      setClientData({
        first_name: "",
        sure_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
      });
      onClose();
      refetch();
    }
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание нового риелтора</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Фамилия</FormLabel>
              <Input
                type='text'
                pattern="^[a-zA-Z]+$"
                placeholder="Введите фамилию"
                name="sure_name"
                value={clientData.sure_name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Имя</FormLabel>
              <Input
                type='text'
                pattern="^[a-zA-Z]+$"
                placeholder="Введите имя"
                name="first_name"
                value={clientData.first_name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Отчество</FormLabel>
              <Input
                type='text'
                pattern="^[a-zA-Z]+$"
                placeholder="Введите отчество"
                name="last_name"
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
                onChange={(e) => {
                  (isEnglishEmailOnly(e.target.value)) &&handleChange(e)
                }}
              />
              {!isEmailValid(clientData.email) &&
                <FormErrorMessage>Неверный формат почты</FormErrorMessage>
              }
            </FormControl>
            <FormControl mt={4} isRequired isInvalid={!isPhoneValid(clientData.phone)}>
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
              {!isPhoneValid(clientData.phone) &&
                <FormErrorMessage>Неверный формат номера телефона</FormErrorMessage>
              }
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input
                placeholder="Введите пароль"
                name="password"
                value={clientData.password}
                onChange={(e) => {
                  handleChange(e)
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={isDataValid()} colorScheme="blue" mr={3} onClick={handleSubmit}>
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

export default CreateRealtorModal;
