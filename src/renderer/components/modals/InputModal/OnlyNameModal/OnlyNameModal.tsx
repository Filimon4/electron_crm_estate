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
import { isLettersOnly } from "../../../../shared/utils/form";

const OnlyNameModal = ({ isOpen, onClose, onSave}: { isOpen: boolean; onClose: () => void, onSave: (name: string) => void }) => {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isLettersOnly(value) || value === "") {
      setName(value);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }
    onSave(name);
    setName("");
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Введите название</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Название</FormLabel>
              <Input
                placeholder="Введите название"
                value={name}
                onChange={handleChange}
                autoFocus={true}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isDisabled={!name.trim()} colorScheme="blue" mr={3} onClick={handleSubmit}>
              Сохранить
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

export default OnlyNameModal;
