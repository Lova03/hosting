import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-range-slider-input/dist/style.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import { fetchUser, selectIsLoggedIn, selectUserLoading } from './features/user/userSlice';
import NotFound from './pages/NotFound';
import MinecraftProductsPage from './pages/MinecraftProductsPage';
import VPSProductsPage from './pages/VPSProductsPage';
import DiscordProductsPage from './pages/DiscordProductsPage';
import { selectSignInOpened } from './features/controls/controlsSlice';
import SignInModal from './components/SignInModal';
import { fetchProducts } from './features/products/productsSlice';
import ToolsPage from './pages/ToolsPage';
import LegalPage from './pages/LegalPage';
import TOSPage from './pages/TOSPage';
import PrivacyPage from './pages/PrivacyPage';
import SLAPage from './pages/SLAPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import BillingPage from './pages/BillingPage';
import FundsPage from './pages/FundsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
  }, [dispatch]);

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
  const signInModalOpened = useSelector(selectSignInOpened);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectUserLoading);

  return (
    <div className='text-white font-nunity bg-raisin-black'>
      {signInModalOpened && <SignInModal />}

      <div className='flex flex-col md:flex-row h-screen overflow-x-hidden'>
        <Navbar />

        {/* Page wrapper for navigation to work */}
        <div className='ml-0 w-full'>
          <Routes>
            {/* Main landing page */}
            <Route path='/' element={<Landing />} />

            <Route path='/products'>
              <Route index element={<Navigate to='/' />} />
              <Route path='minecraft' element={<MinecraftProductsPage />} />
              <Route path='discord' element={<DiscordProductsPage />} />
              <Route path='vps' element={<VPSProductsPage />} />
            </Route>

            <Route path='/tools'>
              <Route index element={<ToolsPage />} />
            </Route>

            <Route path='/legal'>
              <Route index element={<LegalPage />} />
              <Route path='terms-and-conditions' element={<TOSPage />} />
              <Route path='privacy-policy' element={<PrivacyPage />} />
              <Route path='service-level-agreement' element={<SLAPage />} />
            </Route>

            <Route
              path='/panel/dashboard'
              element={
                <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route path='/billing'>
              <Route
                index
                element={
                  <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                    <BillingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='cart'
                element={
                  <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='funds'
                element={
                  <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                    <FundsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
