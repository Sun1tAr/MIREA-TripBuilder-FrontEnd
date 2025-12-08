import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    AuthProvider,
    TripsProvider,
    TasksProvider,
    UIProvider
} from './context';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import MyTrips from './pages/MyTrips';
import TodoList from './pages/TodoList';
import Favorites from './pages/Favorites';
import Constructor from './pages/Constructor';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './theme/globals.css';

function App() {
  const basename =
    import.meta.env.DEV ? '/' : '/MIREA-TripBuilder-FrontEnd/';

  return (
    <AuthProvider>
      <TripsProvider>
        <TasksProvider>
          <UIProvider>
            <BrowserRouter basename={basename}>
              <Routes>
                <Route path="" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="my-trips" element={<MyTrips />} />
                  <Route path="todo" element={<TodoList />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="create" element={<Constructor />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UIProvider>
        </TasksProvider>
      </TripsProvider>
    </AuthProvider>
  );
}

export default App;
