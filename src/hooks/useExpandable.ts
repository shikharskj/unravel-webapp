import { useState } from "react";

export const useExpandable = (initial: boolean = false) => {
  const [expanded, setExpanded] = useState(initial);
  const toggle = () => setExpanded((prev) => !prev);
  return { expanded, toggle };
};
