import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  CloseIcon,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonGroup,
  ButtonText,
  Text,
  Button,
} from '@gluestack-ui/themed';
import { REMOVE_TODO } from '../../graphql/todos/mutations';
import { useMutation } from '@apollo/client';
import { TTodo } from '../../types/todo';

type RemoveTodoModalProps = {
  item: TTodo | null;
  open?: boolean;
  onClose: () => void;
};

const RemoveTodoModal = ({ item, open, onClose }: RemoveTodoModalProps) => {
  const [removeTodo, { loading }] = useMutation(REMOVE_TODO);

  const onRemoveTodo = () => {
    removeTodo({
      variables: {
        id: item?.id,
      },
    });

    onClose();
  };

  return (
    <AlertDialog isOpen={open} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">Delete Todo</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">
            Are you sure you want to delete todo {item?.description}?
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button variant="outline" action="secondary" onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button bg="$error600" action="negative" onPress={onRemoveTodo}>
              <ButtonText>{loading ? 'Loading...' : 'Delete'}</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveTodoModal;
