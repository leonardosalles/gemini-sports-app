import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $description: String!, $isDone: Boolean!) {
    updateTodo(data: { id: $id, description: $description, isDone: $isDone }) {
      id
    }
  }
`

export const CREATE_TODO = gql`
  mutation CreateTodo($description: String!, $isDone: Boolean!) {
    createTodo(data: { description: $description, isDone: $isDone }) {
      id
    }
  }
`

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id) {
      id
    }
  }
`
