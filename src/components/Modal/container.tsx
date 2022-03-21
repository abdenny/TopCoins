import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

const Container: React.FC<{
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  closeModal: () => void;
  isOpen?: boolean;
}> = ({ children, closeOnClickOutside = true, closeOnEsc = true, closeModal, isOpen = true }) => {
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (closeOnEsc && isOpen && e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [closeOnEsc, closeModal, isOpen]);

  const container = useRef<HTMLDivElement>(null);
  const onBackdropClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) closeModal();
  };

  return (
    <div
      className={classNames(
        'fixed inset-0 z-10 p-8 text-white bg-gray-400/70',
        `${isOpen ? 'visible' : 'invisible'}`
      )}
      onClick={closeOnClickOutside ? onBackdropClick : undefined}
    >
      <div className="relative w-full max-w-sm md:max-w-lg mx-auto mt-8" ref={container}>
        <button
          className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-600 cursor-pointer shadow-xl"
          onClick={() => closeModal()}
        >
          <span className="text-2xl leading-7 select-none">&times;</span>
        </button>
        <div className="overflow-hidden bg-white rounded shadow-xl">{children}</div>
      </div>
    </div>
  );
};

export default Container;
