/** @format */

import { ComponentProps, FC, useRef } from 'react';
import isDivContainsMouse from '../hooks/isDivContainsMouse';

type Props = {
  exit: () => void;
  data: any;
};

const Modal: FC<
  Props &
    Omit<ComponentProps<'div'>, 'onClick'> & {
      bg: Omit<ComponentProps<'div'>, 'onClick'>;
    }
> = ({ exit, children, className, bg, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className: cl, ...bgProps } = bg;

  return (
    <div
      onClick={e => {
        e.preventDefault();
        if (!isDivContainsMouse(ref, e)) exit();
      }}
    >
      <div
        ref={ref}
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${bg.className}`}
        {...bgProps}
      >
        <div
          className={`relative w-auto my-6 mx-2 md:mx-auto max-w-3xl text-white rounded-2xl max-h-screen overflow-hidden  ${className}`}
          {...props}
        >
          {/*content*/}
          {children}
        </div>
      </div>
      <div className="opacity-70 fixed inset-0 z-20 bg-black"></div>
    </div>
  );
};

export default Modal;
