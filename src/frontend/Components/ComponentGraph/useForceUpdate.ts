import { useState } from 'react';

export default function useForceUpdate() {
  const [, setValue] = useState<number>(0);
  return () => setValue(value => value + 1); // Arbitrarily update state to force re-render
}