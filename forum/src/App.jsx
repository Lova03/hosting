import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { fetchArticles } from './features/articles/articlesSlice';
import {
  fetchUser,
  selectIsLoggedIn,
  selectUserIsAdmin,
  selectUserIsContributor,
  selectUserLoading,
} from './features/user/userSlice';
import { selectSignInOpened } from './features/controls/controlsSlice';
import SignInModal from './components/SignInModal';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePage from './pages/CreatePage';
import MyArticlesPage from './pages/MyArticlesPage';
import ArticlePage from './pages/ArticlePage';
import EditPage from './pages/EditPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchArticles({ query: '', page: 1 }));
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
  const isContributor = useSelector(selectUserIsContributor);
  const isAdmin = useSelector(selectUserIsAdmin);
  const isLoading = useSelector(selectUserLoading);

  return (
    <div className='text-white font-nunity bg-raisin-black'>
      {signInModalOpened && <SignInModal />}

      <div className='flex flex-col md:flex-row h-screen overflow-x-hidden'>
        <div className='ml-0 w-full'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/create'
              element={
                <ProtectedRoute
                  redirectPath='/'
                  isLoading={isLoading}
                  isAllowed={isLoggedIn && (isContributor || isAdmin)}>
                  <CreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/my-articles'
              element={
                <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                  <MyArticlesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/edit/:id'
              element={
                <ProtectedRoute redirectPath='/' isLoading={isLoading} isAllowed={isLoggedIn}>
                  <EditPage />
                </ProtectedRoute>
              }
            />

            <Route path='articles'>
              <Route index element={<Navigate to='/' />} />
              <Route path=':id' element={<ArticlePage />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
