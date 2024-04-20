import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer
        position='bottom-right'
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme='colored'
      />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <div className='text-white font-nunity bg-raisin-black'>
      <div className='flex flex-col md:flex-row h-screen overflow-x-hidden'>
        {/* <Navbar /> */}

        <div className='ml-0 w-full'>
          <Routes></Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
