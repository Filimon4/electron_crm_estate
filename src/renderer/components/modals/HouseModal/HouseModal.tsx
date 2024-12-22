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
import { isLettersOnly, isNumbersOnly } from "../../../shared/utils/form";
import { useAtom } from "jotai";
import { readUser } from "../../../shared/store";
import AsyncSelect from "react-select/async";

const CreateHouseModal = ({ isOpen, onClose, refetch }: any) => {
  const [user,] = useAtom(readUser)
  const [houseData, setHouseData] = useState({
    street: '',
    house_number: '',
    complex_id: '',
    complex_label: '',
  });
  const [houseInput, setHouseInput] = useState('')
  const [disable, setDisable] = useState(false)

  const isDataValid = () => {
    return (!houseData.street || !houseData.house_number || !houseData.complex_id)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHouseData((prev) => ({ ...prev, [name]: value }));
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
    const house = await window.invokes.createHouse({
      complex_id: houseData.complex_id,
      street: houseData.street,
      house_number: houseData.house_number
    })
    if (house) {
      notifyConfig.success('Пользователь создан', {
        autoClose: 2000,
      })
      setHouseData({ street: '', house_number: '', complex_id: '', complex_label: '' });
      onClose();
      refetch()
    } else {
      notifyConfig.error('Произошла ошибка при создании клиента', {
        autoClose: 3000,
      })
    }
    setDisable(false)

  };

  const loadComplexes = async (): Promise<any[]> => {
    if (houseInput.length === 0) return []
    try {
      console.log(houseInput)
      //@ts-ignore
      const response = await window.invokes.searchComplex(houseInput)
      console.log(response)
      return response.map((client: any) => ({
        label: `${client.name}, ${client.city}, ${client.district}`,
        value: +client.id,
      }));
      return []
    } catch (error) {
      return [];
    }
  }

  const handleComplexChange = (e: any) => {
    const { label, value } = e;
    setHouseData((prev) => ({ ...prev, complex_id: value, complex_label: label }))
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание нового дома</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Улица</FormLabel>
              <Input
                placeholder="Введите название комплекса"
                name={'street'}
                value={houseData.street}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Номер дома</FormLabel>
              <Input
                placeholder="Введите название города"
                name={'house_number'}
                value={houseData.house_number}
                onChange={(e) => {
                  (isNumbersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Комплекс</FormLabel>
              <AsyncSelect
                cacheOptions
                loadOptions={loadComplexes}
                defaultOptions
                value={
                  houseData.complex_id
                    ? { value: houseData.complex_id, label: `Комплекс ${houseData.complex_label}` }
                    : null
                }
                onChange={handleComplexChange}
                onInputChange={(value) => setHouseInput(value)}
                placeholder="Выберите комплекс"
                noOptionsMessage={() => 'Нет доступных комплексов'}
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

export default CreateHouseModal;
