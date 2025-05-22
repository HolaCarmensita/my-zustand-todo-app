import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import DateInputWithPicker from './components/DateInputWithPicker';

export const App = () => {
  return (
    <>
      <Header></Header>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
    </>
  );
};
