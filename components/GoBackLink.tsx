'use client';

import {useRouter} from 'next/navigation';

// Ports the predecessor site's `GoBackLink` (a "Powrót" button that called
// `navigate(-1)`). Needs the client router, hence `'use client'`.
export default function GoBackLink() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="btn btn-link arrow-link p-0 ms-auto ms-md-0 pb-3 text-decoration-none"
    >
      Powrót
    </button>
  );
}
