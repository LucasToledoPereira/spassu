'use client'
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { JSXElementConstructor, ReactElement, useState } from 'react';

import { UIContainerProps } from "./menu.props"
import style from './menu.module.scss';

const Menu = ({children}: UIContainerProps) => {
    const [open, setOpen] = useState(false);
    const _style = classNames(style['ui-menu'], 'lg:flex', open ? 'flex absolute z-10' : 'hidden');
    const _items = React.Children.toArray(children).map((el) =>
        React.cloneElement(
          el as ReactElement<any, string | JSXElementConstructor<any>>,
          {
            closeMenu: () => setOpen(false),
          }
        )
      );
    return (
        <>
            <div className='flex lg:hidden absolute z-10 text-xl font-bold pt-2.5' onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={_style}>{_items}</div>
        </>
    )
}

export { Menu }