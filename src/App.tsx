import "./App.css";
import { UserCreateForm } from "./components/UserCreateForm";
import { UserInfo } from "./components/UserInfo";
import { UserList } from "./components/UserList";


function App() {
  return (
    <>
      <UserList />
      <UserInfo />
      <UserCreateForm />
    </>
  );
}

export default App;
