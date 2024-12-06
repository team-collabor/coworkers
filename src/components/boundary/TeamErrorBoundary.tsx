'use client';

import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function TeamBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>123</div>}>
      <Suspense
        fallback={
          <div className="flex h-[50rem] items-center justify-center">
            <Loader className="animate-spin size-20 text-icon-brand" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
