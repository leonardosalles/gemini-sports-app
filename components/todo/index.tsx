import { useMutation } from '@apollo/client';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ButtonText,
  CloseIcon,
  Icon,
  Input,
  InputField,
  Switch,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import { Formik } from 'formik';
import { boolean, object, string } from 'yup';
import { CREATE_TODO, UPDATE_TODO } from '../../graphql/todos/mutations';
import { SwitchChangeEvent } from 'react-native';
import { TTodo } from '../../types/todo';

type AddTodoModalProps = {
  item: TTodo | null;
  open?: boolean;
  onClose: () => void;
};

const AddTodoModal = ({ item, open, onClose }: AddTodoModalProps) => {
  const [createTodo, { loading: isLoadingCreate }] = useMutation(CREATE_TODO);
  const [updateTodo, { loading: isLoadingUpdate }] = useMutation(UPDATE_TODO);

  const validationSchema = object().shape({
    description: string()
      .label('Description')
      .required('Description is required'),
    isDone: boolean(),
  });

  const onAddTodo = (values: TTodo) => {
    const todo = {
      variables: {
        description: values?.description,
        isDone: values?.isDone ?? false,
      },
    };
    createTodo(todo);
    onClose();
  };

  const onEditTodo = (values: TTodo) => {
    const todo = {
      variables: {
        id: item?.id,
        description: values?.description,
        isDone: values?.isDone ?? false,
      },
    };
    updateTodo(todo);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{item?.description ? 'Edit' : 'Add'} Todo</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <Formik
          initialValues={
            {
              description: item?.description ?? '',
              isDone: item?.isDone ?? false,
            } as any
          }
          onSubmit={item?.description ? onEditTodo : onAddTodo}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
          }: any) => (
            <>
              <ModalBody>
                <VStack>
                  <Input variant="outline" size="md">
                    <InputField
                      placeholder="Description"
                      value={values?.description}
                      onChangeText={handleChange('description')}
                    />
                  </Input>
                  {errors.description ? (
                    <Text color="$red600">{errors.description}</Text>
                  ) : (
                    <></>
                  )}
                </VStack>

                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  pt="$4"
                >
                  <Text>Is Done?</Text>
                  <Switch
                    size="md"
                    value={values?.isDone}
                    onChange={(e: SwitchChangeEvent) => {
                      setFieldValue('isDone', e.nativeEvent.value);
                    }}
                  />
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={onClose}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button size="sm" borderWidth="$0" onPress={handleSubmit}>
                  <ButtonText>
                    {isLoadingCreate || isLoadingUpdate ? 'Loading...' : 'Save'}
                  </ButtonText>
                </Button>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddTodoModal;
