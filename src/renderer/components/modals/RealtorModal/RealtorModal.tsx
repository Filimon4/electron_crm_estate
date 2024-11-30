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

const CreateRealtorModal = ({ isOpen, onClose }: any) => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!clientData.name || !clientData.email || !clientData.phone) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    notifyConfig.success('Пользователь создан', {
      autoClose: 2000,
    })

    setClientData({ name: "", email: "", phone: "" });
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
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Имя</FormLabel>
              <Input
                placeholder="Введите имя"
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Отчество</FormLabel>
              <Input
                placeholder="Введите отчество"
                name="name"
                value={clientData.name}
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
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
