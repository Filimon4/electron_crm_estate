import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react';

const WarningAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showWarning = () => {
    onOpen();
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="999">
      <Alert status="warning" display={isOpen ? "flex" : "none"} mb={3}>
        <AlertIcon />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>This is a warning notification.</AlertDescription>
        <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
      </Alert>
    </Box>
  );
};

export const triggerWarningAlert = (onOpen: () => void) => {
  onOpen();
};

export default WarningAlert;
