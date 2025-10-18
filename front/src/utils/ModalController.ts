import { useState } from "react";

const ModalController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return { isModalOpen, closeModal, openModal };
};

export default ModalController;
