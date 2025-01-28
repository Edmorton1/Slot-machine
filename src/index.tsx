import { createRoot } from "react-dom/client";
import Main from "./components/pages/Main";
import Store from "./components/store/store";
import { createContext } from "react";

const root = document.getElementById("root");

const store = new Store()

interface State {
    store: Store
}

export const Context = createContext({
    store,
})

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

container.render(
    <Context.Provider value={{store}}>
        <Main />
    </Context.Provider>
);
