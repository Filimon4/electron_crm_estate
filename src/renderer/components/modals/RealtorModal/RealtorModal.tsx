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
import { isEmailValid, isLettersOnly, isNumbersOnly } from "../../../shared/utils/form";

const CreateRealtorModal = ({ isOpen, onClose }: any) => {
  const [clientData, setClientData] = useState({
    firstName: "",
    sureName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const isDataValid = () => {
    return (!clientData.firstName || !clientData.email || !clientData.sureName || !clientData.lastName || !clientData.phone || clientData.phone.length !== 11)
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
      notifyConfig.success('Риелтор создан', {
        autoClose: 2000,
      })
    } else {
      notifyConfig.error('Произошла ошибка при сохдании риелтора', {
        autoClose: 3000,
      })
    }

    setClientData({
      firstName: "",
      sureName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    onClose();
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
                name="sureName"
                value={clientData.sureName}
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
                name="firstName"
                value={clientData.firstName}
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
                name="lastName"
                value={clientData.lastName}
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
                onChange={handleChange}
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
