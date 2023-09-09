import { Backdrop, ModalContent } from './Modal.styled';

export default function Modal({ children }) {
  return (
    <Backdrop>
      <ModalContent>
        <h1>This is your modal</h1>
        {children}
      </ModalContent>
    </Backdrop>
  );
}
