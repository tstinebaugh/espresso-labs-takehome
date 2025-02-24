// App.tsx
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AgentList } from "../components/AgentList";
import { AgentForm } from "../components/AgentForm";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Agent Management System</h1>
        <AgentForm />
        <AgentList />
      </div>
    </Provider>
  );
};

export default App;
