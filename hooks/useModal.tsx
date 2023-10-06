import { useCallback, useState } from 'react';

export const useModal = (defaultVisible = false) => {
  const [visible, setVisible] = useState(defaultVisible);

  const open = useCallback(() => setVisible(true), [visible]);
  const close = useCallback(() => setVisible(false), [visible]);

  return [{ visible, open, close }];
};
