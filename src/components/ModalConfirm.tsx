import Modal from 'react-modal';

import { Button } from '../components/Button';
import '../styles/modal-confirm.scss';
import deleteImg from '../assets/images/delete.svg';
import closeImg from '../assets/images/close.svg';


type HeaderProps = {
  onCancel: () => void;
  onConfirm: () => void;

  modalIsOpen: boolean;
  modalTitle: string;
  modalSubtitle: string;
  modalActionLabel: string;
  icon: 'delete'|'close';
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  }
};

export function ModalConfirm({
  onCancel,
  onConfirm,

  modalIsOpen,
  modalTitle,
  modalSubtitle,
  modalActionLabel,
  icon,
}: HeaderProps) {

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCancel}
      style={customStyles}
      contentLabel={`Confirmação para ${modalActionLabel}`}
    >
      <div className="modal-confirm">
        {icon === 'close' &&
          <img src={closeImg} alt={modalTitle} />
        }
        {icon === 'delete' &&
          <img src={deleteImg} alt={modalTitle} />
        }

        <h2>{modalTitle}</h2>
        <p>{modalSubtitle}</p>

        <div className="btn-container">
          <Button className="btn-cancel" onClick={onCancel}>Cancelar</Button>
          <Button className="btn-confirm" onClick={onConfirm}>Sim, {modalActionLabel}</Button>
        </div>
      </div>
    </Modal>
  )
}