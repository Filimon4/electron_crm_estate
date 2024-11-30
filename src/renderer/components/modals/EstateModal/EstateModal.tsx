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

const CreateEstateModal = ({ isOpen, onClose }: any) => {
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
          <ModalHeader>Создание нового объекта</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Цена</FormLabel>
              <Input
                placeholder="Введите цену квартиры"
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Номер квартиры</FormLabel>
              <Input
                placeholder="Введите номер квартиры"
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Кол-во комнат</FormLabel>
              <Input
                placeholder="Введите кол-во комнат"
                name="name"
                value={clientData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Этаж</FormLabel>
              <Input
                type="email"
                placeholder="Введите этаж квартиры"
                name="email"
                value={clientData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Размер{'(кв.м.)'}</FormLabel>
              <Input
                type="tel"
                placeholder="Введите номер телефона"
                name="phone"
                value={clientData.phone}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Дом</FormLabel>
              <Input
                type="tel"
                placeholder=""
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

export default CreateEstateModal;
