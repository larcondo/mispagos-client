import { RouterProvider } from 'react-router-dom';
import router from './router';

// CSS
import './css/Root.css';

// Contexts
import { UserProvider } from '@contexts/userDetails';

const App = () => {
  return(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;