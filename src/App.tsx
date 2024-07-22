import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <Editor />
    </div>
  );
};

export default App;
