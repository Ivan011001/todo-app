import { Component } from 'react';
import { Backdrop, ModalContent } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escClickHandler);
  }

  escClickHandler = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') onClose();
  };

  backdropClickHandler = e => {
    const { onClose } = this.props;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <Backdrop onClick={this.backdropClickHandler}>
        <ModalContent>
          <h1>This is your modal</h1>
          {children}
        </ModalContent>
      </Backdrop>
    );
  }
}
