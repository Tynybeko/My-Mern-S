import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store, { persistor } from './Utils/redux/store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/Utils/ErrorPage';
import Posts from './components/Posts';
import { PersistGate } from 'redux-persist/integration/react';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Posts />,
        path: '/'
      }
    ]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router}></RouterProvider>
    </PersistGate>
  </Provider>
);