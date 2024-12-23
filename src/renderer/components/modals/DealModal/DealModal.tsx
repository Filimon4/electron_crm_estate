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
import AsyncSelect from "react-select/async";
import { useAtom } from "jotai";
import { readUser } from "../../../shared/store";

const CreateDealModal = ({ isOpen, onClose, refetch }: any) => {
  const [dealData, setDealData] = useState({
    flat_id: '',
    flat_label: '',
    client_id: '',
    client_label: '',
  });
  const [flatInput, setFlatInput] = useState('')
  const [clientInput, setClientInput] = useState('')
  const [user,] = useAtom(readUser)
  const [disable, setDisable] = useState(false)

  const handleFlatChange = (e: any) => {
    const { label, value } = e;
    setDealData((prev) => ({ ...prev, flat_id: value, flat_label: label }))
  };
  
  const handleClientChange = (e: any) => {
    const { label, value } = e;
    setDealData((prev) => ({ ...prev, client_id: value, client_label: label }))
  }

  const isDataValid = () => {
    return (!dealData.client_id || !dealData.flat_id)
  }

  const handleSubmit = async () => {
    if (!isDataValid) {
      notifyConfig.error('Пожалуйста заполните все поля', {
        autoClose: 3000,
      })
      return;
    }

    setDisable(true)
    //@ts-ignore
    const estate = await window.invokes.createDeal(user.id, {
      client_id: dealData.client_id,
      flat_id: dealData.flat_id
    })
    if (estate) {
      notifyConfig.success('Сделка создана', {
        autoClose: 2000,
      })
      setDealData({
        flat_id: '',
        flat_label: '',
        client_id: '',
        client_label: '',
      });
      onClose();
      refetch()
    } else {
      notifyConfig.error('Произошла ошибка при создании объекта', {
        autoClose: 3000,
      })
    }
    setDisable(false)
  };

  const loadClients = async (): Promise<any[]> => {
    if (clientInput.length === 0) return []
    try {
      //@ts-ignore
      const response = await window.invokes.searchClients(clientInput)
      // Преобразуем результаты в формат, подходящий для react-select
      console.log(response)
      return response.map((client: any) => ({
        label: `${client.first_name} ${client.sure_name} ${client.last_name}`,
        value: +client.id,
      }));
    } catch (error) {
      return [];
    }
  };

  const loadFlats = async (): Promise<any[]> => {
    if (flatInput.length === 0) return []
    try {
      //@ts-ignore
      const response = await window.invokes.searchFlats(flatInput)
      console.log(response)
      return response.map((flat: any) => ({
        label: `ул. ${flat.street} д. ${flat.house_number} кв. ${flat.flat} этаж ${flat.floor}`,
        value: +flat.id,
      }));
    } catch (error) {
      return [];
    }
  }

  const handleClose = () => {
    setDealData({
      flat_id: '',
      flat_label: '',
      client_id: '',
      client_label: '',
    });
    onClose()
  }

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание новой сделки</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4} isRequired>
              <FormLabel>Клиент</FormLabel>
              <AsyncSelect
                cacheOptions
                loadOptions={loadClients}
                defaultOptions
                value={
                  dealData.client_id
                    ? { value: dealData.client_id, label: `Клиент ${dealData.client_label}` }
                    : null
                }
                onChange={handleClientChange}
                onInputChange={(value) => setClientInput(value)}
                placeholder="Выберите клиента по почте или телефону"
                noOptionsMessage={() => 'Нет доступных клиентов'}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Квартира</FormLabel>
              <AsyncSelect
                cacheOptions
                loadOptions={loadFlats}
                defaultOptions
                value={
                  dealData.flat_id
                    ? { value: dealData.flat_id, label: `Квартира ${dealData.flat_label}` }
                    : null
                }
                onChange={handleFlatChange}
                onInputChange={(value) => setFlatInput(value)}
                placeholder="Выберите квартиру"
                noOptionsMessage={() => 'Нет доступных квартир'}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={isDataValid() || disable} colorScheme="blue" mr={3} onClick={handleSubmit}>
              Создать
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default CreateDealModal;
