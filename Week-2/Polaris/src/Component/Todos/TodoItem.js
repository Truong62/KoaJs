import React from "react";
import {
  InlineGrid,
  InlineStack,
  ResourceItem,
  Text,
  Badge,
  Button,
} from "@shopify/polaris";

function TodoItem({ id, name, isCompleted, completeOnClick, deleteOnClick }) {
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
          <Button onClick={() => completeOnClick(id)}>Complete</Button>
          <Button onClick={() => deleteOnClick(id)}>Delete</Button>
        </InlineStack>
      </InlineGrid>
    </ResourceItem>
  );
}

export default TodoItem;
