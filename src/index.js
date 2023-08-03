// Import required dependencies and components
import { ColorModeScript } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

// Get the container element where the React application will be rendered
const container = document.getElementById('root');
// Create a new React root using the container element
const root = ReactDOM.createRoot(container);

// Render the main application using the Chakra-UI ColorModeScript, Redux Provider,
// and Redux PersistGate for handling the store and persistence.
root.render(
  <Provider store={store}>
    {/* The PersistGate is used to delay rendering the application until the persisted state is retrieved */}
    <PersistGate loading={null} persistor={persistor}>
      {/* The ColorModeScript is required for Chakra-UI to properly manage color modes */}
      <ColorModeScript />

      {/* Render the main App component */}
      <App />
    </PersistGate>
  </Provider>
);
