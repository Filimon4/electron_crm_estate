import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
} from "@chakra-ui/react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Подтверждение",
  body = "Вы уверены?",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  body?: string;
}) => {
  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onConfirm}>
              Да
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Нет
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default ConfirmationModal;