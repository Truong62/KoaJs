import React, { useState, useCallback } from "react";
import useFetchApi from "../../Hook/useFetchApi";
import {
  Page,
  LegacyCard,
  ResourceList,
  Button,
} from "@shopify/polaris";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { useTodoCrud } from "./TodoCrud";

function TodoList() {
  const { datas, setDatas } = useFetchApi(
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
      onAction: async () => {
        const newData = await updateTodo(selectedItems, "complete");
        setDatas(newData);
        setSelectedItems([]);
      },
    },
    {
      content: "Incomplate",
      onAction: async () => {
        const newData = await updateTodo(selectedItems, "incomplate");
        setDatas(newData);
        setSelectedItems([]);
      },
    },
    {
      content: "Delete",
      onAction: async () => {
        const dataNew = await deletes(selectedItems);
        setDatas(dataNew);
        setSelectedItems([]);
      },
    },
  ];

  const { addTodo, deleteTodo, updateTodo, deletes } = useTodoCrud();

  const handleComplete = async (id) => {
    const newData = await updateTodo(id, "complete");
    setDatas(newData);
  };

  const handleDelete = async (id) => {
    const req = await deleteTodo(id);
    setDatas(req);
  };

  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleSubmit = async () => {
    if (value.length > 0) {
      const dataNew = await addTodo(value);
      setDatas(dataNew);
      setActive(!active);
      setValue("");
      return;
    }
    if (!value) {
      return;
    }
  };

  const renderItem = (data) => {
    const { id, name, isCompleted } = data;
    return (
      <TodoItem
        key={id}
        id={id}
        name={name}
        isCompleted={isCompleted}
        completeOnClick={() => handleComplete(id)}
        deleteOnClick={() => handleDelete(id)}
      />
    );
  };

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
      <TodoForm
        active={active}
        toggleActive={toggleActive}
        handleSubmit={handleSubmit}
        value={value}
        handleChange={handleChange}
      />
    </Page>
  );
}

export default TodoList;
