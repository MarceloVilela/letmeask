import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
      <div className={`container-theme ${theme}`}>
        <BrowserRouter>
          <AuthContextProvider>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/rooms/new" component={NewRoom} exact />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
