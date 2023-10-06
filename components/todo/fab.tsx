import { AddIcon, Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
import GeminiSportsTheme from '../../themes';

type AddTodoFabProps = {
  onPress: () => void;
};

export const AddTodoFab = ({ onPress }: AddTodoFabProps) => {
  return (
    <Fab
      size="lg"
      placement="bottom right"
      mb="$8"
      backgroundColor={GeminiSportsTheme.colors.primary}
      onPress={onPress}
    >
      <FabIcon
        as={AddIcon}
        mr="$1"
        color={GeminiSportsTheme.colors.secondary}
      />
      <FabLabel color={GeminiSportsTheme.colors.secondary}>Todo</FabLabel>
    </Fab>
  );
};
