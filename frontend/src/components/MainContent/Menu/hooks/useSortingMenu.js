import { useState } from 'react';

export const useSortingMenu = () => {
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);

  const toggleSortingMenu = () => setIsSortingMenuOpen((prev) => !prev);

  return [isSortingMenuOpen, toggleSortingMenu];
};
