import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
const ConfirmModal = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Are you sure you want to Delete?',
              // content: 'Bla bla ...',
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
        >
          Open Modal Confirm
        </Button>
      </Space>
      
    </>
  );
};
export default ConfirmModal;