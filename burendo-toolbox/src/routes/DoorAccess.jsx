import React from 'react';

export default function DoorAccess() {
  return (
    <div className="w-full h-[calc(100vh-5rem)] overflow-hidden">
      <iframe
        src="http://door-access-control.s3-website.eu-west-2.amazonaws.com/"
        title="Door Access Control"
        className="w-full h-full border-none"
      />
    </div>
  );
}
