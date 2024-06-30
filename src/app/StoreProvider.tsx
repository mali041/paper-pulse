"use client";

import { Provider } from "react-redux";
import { initializeStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = initializeStore();
  return <Provider store={store}>{children}</Provider>;
}
