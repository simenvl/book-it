import useModalWithData from "../../hooks/useModal/useModalWithData";
import Modal from "../Modal/Modal";

type ModalWithContentProps = {
  modalTitle: string;
  buttonTitle: string;
  children: React.ReactNode;
};

const ModalWithContent = ({
  modalTitle,
  buttonTitle,
  children,
}: ModalWithContentProps) => {
  const { modalOpen, setModalOpen, setModalState, setSelected } =
    useModalWithData();

  return (
    <div>
      <Modal
        title={modalTitle}
        isActive={modalOpen}
        handleClose={() => setModalOpen(!modalOpen)}
      >
        {children}
      </Modal>
      <button
        type="button"
        onClick={() => {
          setSelected(children);
          setModalState(!modalOpen);
        }}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default ModalWithContent;
