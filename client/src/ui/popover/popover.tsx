/* eslint-disable react/display-name */
'use client';

import {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { UIPopoverProps } from './popover.props';
import { findByType } from '../../operators';
import innerStyles from './popover.module.scss';
import classNames from 'classnames';

const hide = (ref: HTMLDivElement | null) => {
  if (ref) {
    ref.style.visibility = 'hidden';
    ref.style.opacity = '0';
  }
};

const show = (ref: HTMLDivElement | null) => {
  if (ref) {
    ref.style.visibility = 'visible';
    ref.style.opacity = '1';
  }
};

const zIndex = (ref: HTMLDivElement | null, value: string) => {
  if (ref) {
    ref.style.zIndex = value;
  }
};

const PopoverRef = ({ children }: PropsWithChildren) => {
  return <div className="w-100 h-100">{children}</div>;
};

const PopoverContent = ({ children }: PropsWithChildren) => {
  return children;
};

const Popover = forwardRef(
  (
    {
      placement = 'auto',
      backdrop = 'none',
      trigger = 'hover',
      background,
      color,
      children,
    }: UIPopoverProps,
    ref: any
  ) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const [referenceElement, setReferenceElement] =
      useState<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const refComponent = cloneElement(
      findByType(children, PopoverRef) as ReactElement
    );
    const content = findByType(children, PopoverContent);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: placement,
      strategy: 'fixed',
    });

    const showPopover = useCallback(() => {
      show(popperElement);
      show(backdropRef.current);
      zIndex(referenceElement, '10');
    }, [popperElement, backdropRef, referenceElement]);

    const hidePopover = useCallback(() => {
      hide(popperElement);
      hide(backdropRef.current);
      zIndex(referenceElement, '0');
    }, [popperElement, backdropRef, referenceElement]);

    useImperativeHandle(ref, () => {
      return {
        show: () => showPopover(),
        hide: () => hidePopover(),
      };
    });

    const _backdropCss = classNames(
      innerStyles['ui-popover__backdrop'],
      innerStyles[`ui-popover__backdrop--${backdrop}`]
    );

    const addHoverListeners = useCallback(() => {
      if (referenceElement && trigger === 'hover') {
        referenceElement.addEventListener('mouseenter', () => showPopover());
        referenceElement.addEventListener('mouseleave', () => hidePopover());
      }
    }, [referenceElement, trigger, showPopover, hidePopover]);

    const addClickListeners = useCallback(() => {
      if (trigger !== 'click') return;

      if (referenceElement) {
        referenceElement.addEventListener('click', (e: MouseEvent) => {
          showPopover();
          e.stopPropagation();
        });
      }

      if (backdropRef?.current) {
        backdropRef.current?.addEventListener('click', (e: MouseEvent) => {
          hidePopover();
          e.stopPropagation();
        });
      }
    }, [referenceElement, trigger, showPopover, hidePopover]);

    useEffect(() => {
      addHoverListeners();
      addClickListeners();
    }, [addHoverListeners, addClickListeners]);

    const renderContent = () => {
      return (
        <div
          className={innerStyles['ui-popover']}
          ref={setPopperElement}
          style={
            {
              ...styles.popper,
              '--ui-popover-color': color,
              '--ui-popover-background-color': background,
            } as CSSProperties
          }
          {...attributes.popper}
        >
          {content}
        </div>
      );
    };

    return (
      <>
        <div
          className={innerStyles['ui-popover__reference']}
          ref={setReferenceElement}
        >
          {refComponent}

          {trigger === 'hover' ? renderContent() : null}
        </div>
        <div className={_backdropCss} ref={backdropRef}></div>
        {trigger === 'click' ? renderContent() : null}
      </>
    );
  }
);

export { Popover, PopoverRef, PopoverContent };
