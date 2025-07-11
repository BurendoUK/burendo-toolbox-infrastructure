import React, { Suspense } from 'react';

const RemoteDoorAccessApp = React.lazy(() =>
  import('accessReport/App')
);

export default function DoorAccess() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="p-4 text-center">Loading Door Access...</div>}>
        <RemoteDoorAccessApp />
      </Suspense>
    </div>
  );
}
