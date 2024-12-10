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
import { isNumbersOnly } from "../../../shared/utils/form";

const CreateEstateModal = ({ isOpen, onClose }: any) => {
  const [clientData, setClientData] = useState({
    price: "",
    flat_num: "",
    rooms: "",
    floor: "",
    size: "",
    house: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const isDataValid = () => {
    return (!clientData.price || !clientData.flat_num || !clientData.rooms || !clientData.floor || !clientData.size || !clientData.house)
  }

  const handleSubmit = async () => {
    if (!isDataValid) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    //@ts-ignore
    const estate = await window.context.createEstate(clientData)
    if (estate) {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
    } else {
      notifyConfig.error('Произошла ошибка при создании объекта', {
        autoClose: 3000,
      })
    }

    setClientData({
      price: "",
      flat_num: "",
      rooms: "",
      floor: "",
      size: "",
      house: ""
    });
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
                type='number'
                placeholder="Введите цену квартиры"
                name="price"
                value={clientData.price}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Номер квартиры</FormLabel>
              <Input
                type='number'
                placeholder="Введите номер квартиры"
                name="flat_num"
                value={clientData.flat_num}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Кол-во комнат</FormLabel>
              <Input
                type='number'
                placeholder="Введите кол-во комнат"
                name="rooms"
                value={clientData.rooms}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Этаж</FormLabel>
              <Input
                type='number'
                placeholder="Введите этаж квартиры"
                name="floor"
                value={clientData.floor}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Размер{'(кв.м.)'}</FormLabel>
              <Input
                type='number'
                placeholder="Введите размер квартиры"
                name="size"
                value={clientData.size}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Дом</FormLabel>
              <Input
                type='number'
                placeholder="Введите дом квартиры"
                name="house"
                value={clientData.house}
                onChange={handleChange}
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

export default CreateEstateModal;
