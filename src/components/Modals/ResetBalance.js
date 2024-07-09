import React from "react";
import { Button, Modal } from "antd";

function ResetBalanceModal({
  isResetModalVisible,
  handleResetCancel,
  handleResetBalance,
}) {
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Reset Balance"
      visible={isResetModalVisible}
      onCancel={handleResetCancel}
      footer={null}
    >
      <p>Are you sure you want to reset all balances to zero?</p>
      <Button
        className="btn btn-blue"
        type="primary"
        onClick={handleResetBalance}
      >
        Reset Balance
      </Button>
    </Modal>
  );
}

export default ResetBalanceModal;
