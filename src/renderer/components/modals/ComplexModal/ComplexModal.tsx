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
import { isLettersOnly } from "../../../shared/utils/form";
import { useAtom } from "jotai";
import { readUser } from "../../../shared/store";

const CreateComplexModal = ({ isOpen, onClose, refetch }: any) => {
  const [user,] = useAtom(readUser)
  const [complexData, setComplexData] = useState({
    name: '',
    district: '',
    city: ''
  });
  const [disable, setDisable] = useState(false)

  const isDataValid = () => {
    return (!complexData.name || !complexData.district || !complexData.city)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setComplexData((prev) => ({ ...prev, [name]: value }));
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
    const client = await window.invokes.createComplex(complexData)
    if (client) {
      notifyConfig.success('Комплекс создан', {
        autoClose: 2000,
      })
      setComplexData({ name: '', district: '', city: '' });
      onClose();
      refetch()
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
          <ModalHeader>Создание нового комплекса</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Название</FormLabel>
              <Input
                placeholder="Введите название комплекса"
                name={'name'}
                value={complexData.name}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Город</FormLabel>
              <Input
                placeholder="Введите название города"
                name={'city'}
                value={complexData.city}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Район</FormLabel>
              <Input
                placeholder="Введите название района"
                name={'district'}
                value={complexData.district}
                onChange={(e) => {
                  (isLettersOnly(e.target.value)) && handleChange(e)
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

export default CreateComplexModal;
