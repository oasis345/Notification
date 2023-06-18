import { Suspense, lazy, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function AnyView() {
  const location = useLocation();

  const ViewComponent = useMemo(() => {
    const currentPath = `${location.pathname.substring(1)}`;
    const viewComponent = lazy(() => import(`./${currentPath}`));

    return viewComponent;
  }, [location.pathname]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewComponent />
    </Suspense>
  );
}
