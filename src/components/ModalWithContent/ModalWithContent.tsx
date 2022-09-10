import classNames from "classnames";
import useModalWithData from "../../hooks/useModal/useModalWithData";
import Modal from "../Modal/Modal";

type ModalWithContentProps = {
  modalTitle: string;
  buttonTitle?: string;
  options?: ModalOptions;
  buttonClassName?: string;
  children: React.ReactNode;
};

type ModalOptions = {
  asButton: boolean;
};

const ModalWithContent = ({
  modalTitle,
  buttonTitle,
  options,
  buttonClassName,
  children,
}: ModalWithContentProps) => {
  const { modalOpen, setModalOpen, setModalState, setSelected } =
    useModalWithData();

  const asButton = options?.asButton;

  return (
    <div>
      <Modal
        title={modalTitle}
        isActive={modalOpen}
        handleClose={() => setModalOpen(!modalOpen)}
      >
        {children}
      </Modal>
      {buttonTitle && (
        <button
          type="button"
          onClick={() => {
            setSelected(children);
            setModalState(!modalOpen);
          }}
          className={classNames(
            { "bg-blue-100 px-4 py-2": asButton },
            "rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
            buttonClassName
          )}
        >
          {buttonTitle}
        </button>
      )}
    </div>
  );
};

export default ModalWithContent;
