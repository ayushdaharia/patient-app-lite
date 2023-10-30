import React from "react";
import { Modal } from "react-native";

function CustomModalWrapper(props) {
  const { isVisible, modalCustomStyle, onCloseModel = () => {}, ...rest } = props;
  const _handleModal = () => {
    onCloseModel();
  };

  return (
    <Modal
      isVisible={isVisible}
      style={[modalCustomStyle]}
      backdropColor={"white"}
      onBackdropPress={_handleModal}
      {...rest}>
      {props?.children}
    </Modal>
  );
}
CustomModalWrapper.defaultProps = {
  title: "",
  buttonText: "",
  rightIcon: true,
  isVisible: false,
  modalCustomStyle: {},
  onCloseModel: () => {},
  customViewEnable: false,
  onPressButton: () => {},
  renderCustomContent: () => {},
};

export default React.memo(CustomModalWrapper);
