import Modal from 'react-modal';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Container>
      <h2>Cadastrar transação</h2>

        <input
          placeholder='Título'
        />

        <input
          placeholder='Valor'
          type='number'
        />

        <input
          placeholder='Categoria'
        />

        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  )
}