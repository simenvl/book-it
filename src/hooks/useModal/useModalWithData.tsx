import { ReactNode, useState } from "react";
import useModal from "./useModal";

const useModalWithData = (initialMode = false, initialSelected = null) => {
  const [modalOpen, setModalOpen] = useModal(initialMode);
  const [selected, setSelected] = useState<ReactNode>(initialSelected);

  const setModalState = (state: boolean) => {
    setModalOpen(state);

    if ((state = false)) {
      setSelected(null);
    }
  };
  return { modalOpen, setModalOpen, selected, setSelected, setModalState };
};

export default useModalWithData;
