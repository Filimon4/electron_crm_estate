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
} from "@chakra-ui/react";
import { notifyConfig } from "../../../shared/events/notifies.config";

const CreateClientModal = ({ isOpen, onClose }: any) => {
  const [clientData, setClientData] = useState({
    firstName: "",
    sureName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const validData = () => {
    if (!clientData.firstName || !clientData.sureName || !clientData.lastName || !clientData.email || !clientData.phone || clientData.phone.length !== 11) return false
    return true
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value)
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!validData) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    notifyConfig.success('Пользователь создан', {
      autoClose: 2000,
    })

    //@ts-ignore
    window.context.createClient(clientData)
    setClientData({ firstName: "", lastName: "", sureName: "", email: "", phone: "" });
    onClose();
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
                name={'sureName'}
                value={clientData.sureName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Имя</FormLabel>
              <Input
                placeholder="Введите имя"
                name={'firstName'}
                value={clientData.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Отчество</FormLabel>
              <Input
                placeholder="Введите отчество"
                name={'lastName'}
                value={clientData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Почта</FormLabel>
              <Input
                type="email"
                placeholder="Введите почту"
                name="email"
                value={clientData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Номер телефона</FormLabel>
              <Input
                type="tel"
                placeholder="Введите номер телефона"
                name="phone"
                value={clientData.phone}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={!validData()} colorScheme="blue" mr={3} onClick={handleSubmit}>
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
