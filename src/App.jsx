import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskView from './components/TaskView';
import styled, { ThemeProvider } from 'styled-components';
import useTaskStore from './store/useTaskStore';
import { GlobalStyle, lightTheme, darkTheme } from '../styles/globalStyles';

const AppContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 1rem;
`;

export const App = () => {
  const themeMode = useTaskStore((s) => s.themeMode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <TaskForm />
        <TaskView />
      </AppContainer>
    </ThemeProvider>
  );
};
