import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAllowed, isLoading = false, redirectPath = '/', children }) {
  if (isLoading) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-[6px] border-white/10 border-t-flame-900'></div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
