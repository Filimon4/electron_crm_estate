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
import AsyncSelect from "react-select/async";

const CreateEstateModal = ({ isOpen, onClose, refetch }: any) => {
  const [clientData, setClientData] = useState({
    price: "",
    flat: "",
    room_amount: "",
    floor: "",
    size: "",
    house_id: "",
  });
  const [houseInput, setHouseInput] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const isDataValid = () => {
    return (!clientData.price || !clientData.flat || !clientData.room_amount || !clientData.floor || !clientData.size || !clientData.house_id)
  }

  const handleSubmit = async () => {
    if (!isDataValid) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    //@ts-ignore
    const estate = await window.invokes.createFlat(clientData)
    if (estate) {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
      setClientData({
        price: "",
        flat: "",
        room_amount: "",
        floor: "",
        size: "",
        house_id: ""
      });
      onClose();
      refetch()
    } else {
      notifyConfig.error('Произошла ошибка при создании объекта', {
        autoClose: 3000,
      })
    }

  };

  const loadOptions = async (inputValue: string) =>
    await new Promise((resolve) => {
      //@ts-ignore
      // const houses = window.invokes.
      resolve([])
    });

  console.log(houseInput)

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
                name="flat"
                value={clientData.flat}
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
                name="room_amount"
                value={clientData.room_amount}
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
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                value={
                  clientData.house_id
                    ? { value: clientData.house_id, label: `Дом ${clientData.house_id}` }
                    : null
                }
                onChange={handleChange}
                onInputChange={(value) => setHouseInput(value)}
                placeholder="Выберите дом"
                noOptionsMessage={() => 'Нет доступных домов'}
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
