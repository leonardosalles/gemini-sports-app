import { useQuery } from '@apollo/client';
import { LIST_TODOS } from '../graphql/todos/queries';
import {
  Box,
  FlatList,
  HStack,
  Text,
  CheckIcon,
  EditIcon,
  Button,
  ButtonIcon,
  TrashIcon,
  CalendarDaysIcon,
  InfoIcon,
  Icon,
} from '@gluestack-ui/themed';
import { AddTodoFab } from '../components/todo/fab';
import AddTodoModal from '../components/todo';
import { useState } from 'react';
import { useModal } from '../hooks/useModal';
import RemoveTodoModal from '../components/todo/remove';
import { TTodo } from '../types/todo';

const WelcomeScreen = () => {
  const [addTodoModal] = useModal();
  const [removeTodoModal] = useModal();

  const [actualItem, setActualItem] = useState<TTodo | null>(null);

  const { loading, error, data, refetch } = useQuery(LIST_TODOS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  const toggleModal = (
    modalName: 'add' | 'remove',
    item?: TTodo | null,
    close?: boolean,
  ) => {
    if (item) {
      setActualItem(item);
    }

    if (modalName === 'add') {
      addTodoModal[addTodoModal.visible ? 'close' : 'open']();
    }

    if (modalName === 'remove') {
      removeTodoModal[removeTodoModal.visible ? 'close' : 'open']();
    }

    if (close) {
      setActualItem(null);
      refetch();
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            '@base': {
              height: 32,
              backgroundColor: '#dedede',
            },
          }}
        >
          <HStack justifyContent="space-between" px="$4" py="$1">
            <Text color="$coolGray800" fontWeight="$bold">
              Description
            </Text>
          </HStack>
        </Box>
        {data && data?.todos.length === 0 && (
          <Box height={230} justifyContent="center" alignItems="center">
            <Icon as={InfoIcon} m="$2" w="$12" h="$12" color="$orange400" />
            <Text>No items try add a Todo!</Text>
          </Box>
        )}
        <FlatList
          height={'100%'}
          data={data.todos}
          renderItem={({ item }: any) => (
            <Box borderBottomWidth="$1" borderColor="$trueGray800" py="$2">
              <HStack
                space="md"
                justifyContent="space-between"
                alignItems="center"
                px="$4"
                py="$2"
              >
                <HStack alignItems="center">
                  {item.isDone ? (
                    <CheckIcon size="xl" color="$green600" mr="$2" />
                  ) : (
                    <CalendarDaysIcon size="xl" color="$coolGray400" mr="$2" />
                  )}
                  <Text
                    fontWeight="bold"
                    color="$coolGray800"
                    sx={{
                      _dark: {
                        color: '$warmGray100',
                      },
                    }}
                  >
                    {item.description}
                  </Text>
                </HStack>

                <HStack>
                  <Button
                    size="lg"
                    variant="solid"
                    action="primary"
                    mr="$4"
                    onPress={() => toggleModal('add', item)}
                  >
                    <ButtonIcon as={EditIcon} />
                  </Button>

                  <Button
                    size="lg"
                    variant="solid"
                    action="negative"
                    onPress={() => toggleModal('remove', item)}
                  >
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                </HStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item: any) => item.id}
        />
      </Box>
      <AddTodoModal
        open={addTodoModal.visible}
        onClose={() => toggleModal('add', null, true)}
        item={actualItem}
      />
      <RemoveTodoModal
        open={removeTodoModal.visible}
        onClose={() => toggleModal('remove', null, true)}
        item={actualItem}
      />
      <AddTodoFab onPress={() => toggleModal('add')} />
    </>
  );
};

export default WelcomeScreen;
