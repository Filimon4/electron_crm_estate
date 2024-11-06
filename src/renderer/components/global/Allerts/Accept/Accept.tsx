import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react';

const AcceptAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showAccept = () => {
    onOpen();
  };

  return (
    <Box position="fixed" bottom="70px" right="20px" zIndex="999">
      <Alert status="success" display={isOpen ? "flex" : "none"}>
        <AlertIcon />
        <AlertTitle>Accepted!</AlertTitle>
        <AlertDescription>Your action has been accepted.</AlertDescription>
        <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
      </Alert>
    </Box>
  );
};

export const triggerAcceptAlert = (onOpen: () => void) => {
  onOpen();
};

export default AcceptAlert;