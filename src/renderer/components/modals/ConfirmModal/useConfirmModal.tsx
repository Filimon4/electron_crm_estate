import React, { useState } from "react";
import ConfirmationModal from "./ConfirmModal"; // Assuming you have the modal as in your file

const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => () => {});
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const askConfirmation = async (title: string, body: string): Promise<boolean> => {
    setTitle(title)
    setBody(body)
    setIsOpen(true);
    return await new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    resolvePromise(false);
  };

  const ConfirmationModalWrapper = () => (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={title ?? "Подтверждение"}
      body={body ?? "Вы уверены?"}
    />
  );

  return { askConfirmation, ConfirmationModalWrapper };
};

export default useConfirmationModal;