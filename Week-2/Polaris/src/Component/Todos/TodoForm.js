import React from "react";
import { TextField,Frame, Modal } from "@shopify/polaris";

function TodoForm({ active, toggleActive, handleSubmit, value, handleChange }) {
  return (
    <div style={{ height: "500px" }}>
      <Frame>
        <Modal
          size="small"
          activator
          open={active}
          onClose={toggleActive}
          title="Create Todo"
          primaryAction={{
            content: "Add",
            onAction: toggleActive,
            onClick: handleSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleSubmit,
            },
          ]}
        >
          <Modal.Section>
            <TextField
              autoSize="200px"
              label="Title "
              value={value}
              onChange={handleChange}
              autoComplete="off"
            />
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

export default TodoForm;
