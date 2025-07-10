import React, { Suspense, lazy, useEffect, useState } from 'react';

function loadRemoteEntry(remoteUrl, scope) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-remote="${scope}"]`);
    if (existing) return resolve();

    const script = document.createElement('script');
    script.src = remoteUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-remote', scope);

    script.onload = () => {
      console.log(`${scope} remote loaded`);
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load remote: ${remoteUrl}`));
    };

    document.head.appendChild(script);
  });
}

// Dynamically import the federated App from the remote
const AccessReportApp = lazy(() => import('accessReport/App'));

export default function DoorAccess() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadRemoteEntry('http://localhost:5174/remoteEntry.js', 'accessReport')
      .then(() => setReady(true))
      .catch(console.error);
  }, []);

  if (!ready) return <div>Loading remote app...</div>;

  return (
    <Suspense fallback={<div>Loading Access Report...</div>}>
      <AccessReportApp />
    </Suspense>
  );
}