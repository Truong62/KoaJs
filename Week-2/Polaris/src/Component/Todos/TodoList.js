import React from "react";
import { useTodoCrud } from "./TodoCrud";
import {
  ResourceList,
  ResourceItem,
  Text,
  Page,
  Button,
  LegacyCard,
  Badge,
  InlineGrid,
  InlineStack,
  Modal,
  Frame,  
  TextField,
} from "@shopify/polaris";
import useFetchApi from "../../Hook/useFetchApi";
import { useState, useCallback } from "react";

function TodoList() {
  const { datas, setLoading, loadin, setDatas } = useFetchApi(
    "http://localhost:5001/api/todolist/"
  );

  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "Todo",
    plural: "Todos",
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
    {
      content: "Incomplate",
      onAction: () => console.log("Todo: implement bulk 2"),
    },
    {
      content: "Dalete",
      onAction: () => console.log("Todo: implement bulk 3"),
    },
  ];

  function renderItem(datas) {
    const { id, name, isCompleted } = datas;

    return (
      <ResourceItem id={id} accessibilityLabel={name}>
        <InlineGrid columns={2}>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {name}
          </Text>
          <InlineStack align="end" blockAlign="center" gap={200} columns={3}>
            {isCompleted ? (
              <Badge tone="success">Complete</Badge>
            ) : (
              <Badge tone="attention">Incomplate</Badge>
            )}
            <Button
              onClick={() => {
                const newData = updateTodo(id);
                setDatas(newData);
              }}
            >
              Complete
            </Button>
            <Button onClick={() => {
             const newData =  deleteTodo(id)
              setDatas((prev) => [newData, ...prev]);
            }}>Delete</Button>
          </InlineStack>
        </InlineGrid>
      </ResourceItem>
    );
  }
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const { addTodo, deleteTodo, updateTodo } = useTodoCrud();
  const handleSubmit = async () => {
    if (value.length > 0) {
      const dataNew = await addTodo(value);
      setDatas((prev) => [dataNew, ...prev]);
      setActive(!active);
      return;
    }
    if (!value) {
      return;
    }
  };
  const handleCheckbox = useCallback((value) => setChecked(value), []);
  return (
    <Page
      title="Todos"
      primaryAction={
        <Button variant="primary" onClick={toggleActive}>
          Create
        </Button>
      }
    >
      <LegacyCard>
        <ResourceList
          resourceName={resourceName}
          items={datas}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
        />
      </LegacyCard>
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
              onClick: () => handleSubmit(),
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
    </Page>
  );
}

export default TodoList;
