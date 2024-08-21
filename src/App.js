import logo from './logo.svg';
import './App.css';
import RootLayout from './pages/RootLayout';
import FirstFloor from './pages/FirstFloor';
import SecondFloor from './pages/SecondFloor';
import ThirdFloor from './pages/ThirdFloor';
import Allocation from './pages/Allocation';
import DetailsPage from './pages/DetailsPage';
import All from './pages/All';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router=createBrowserRouter(
  [
    {
      path : "/",
      element : <RootLayout/>,
    },
    {
      path : "/1",
      element: <FirstFloor/>,
    },
    {
      path : "/2",
      element: <SecondFloor/>,
    },
    {
      path : "/3",
      element: <ThirdFloor/>,
    },
    {
      path : "/allocation",
      element: <Allocation/>,
    },
    {
      path : "/all",
      element: <All/>,
    },
    {
      path : "/details/:id",
      element : <DetailsPage />
    }
]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
