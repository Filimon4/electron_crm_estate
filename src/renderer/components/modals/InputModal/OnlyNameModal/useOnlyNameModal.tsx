import React, { useState } from "react";
import OnlyNameModal from "./OnlyNameModal"; // Assuming you have the modal as in your file

const useOnlyNameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(value: string) => void>(() => () => {});

  const askOnlyName = async (): Promise<string> => {
    setIsOpen(true);
    console.log('askOnlyName')
    return await new Promise<string>((resolve) => {
      setResolvePromise((name: string) => resolve(name));
    });
  };

  const handleConfirm = (name: string) => {
    setIsOpen(false);
    resolvePromise(name);
  };

  const handleClose = () => {
    setIsOpen(false);
    resolvePromise(null);
  };

  const OnlyNameModalWrapper = () => (
    <OnlyNameModal
      isOpen={isOpen}
      onClose={handleClose}
      onSave={handleConfirm}
    />
  );

  return { askOnlyName, OnlyNameModalWrapper };
};

export default useOnlyNameModal;