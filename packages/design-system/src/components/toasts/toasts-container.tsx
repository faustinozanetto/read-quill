'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToastContext } from '../../hooks/use-toast-context';
import Toast from './toast';

const ToastsContainer: React.FC = () => {
  const { state } = useToastContext();

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[999] flex flex-col">
      <ul className="mx-auto max-w-xl">
        <AnimatePresence initial={false}>
          {state.toasts
            ? state.toasts.map((toast) => {
                return <Toast key={toast.id} toast={toast} />;
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ToastsContainer;
