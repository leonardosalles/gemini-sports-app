import { gql } from '@apollo/client';

export const LIST_TODOS = gql`
  query {
    todos {
      id
      description
      isDone
    }
  }
`;

export const GET_TODO = gql`
  query GetTodo($id: String!) {
    todo(id: $id) {
      id
      description
      isDone
    }
  }
`;
