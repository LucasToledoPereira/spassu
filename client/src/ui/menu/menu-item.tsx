'use client'
import Link from 'next/link'
import classNames from 'classnames';
import { usePathname } from 'next/navigation'

import { UIMenuItemProps } from "./menu.props";
import style from './menu.module.scss';


const MenuItem = ({text, path, match, closeMenu = () => {}}: UIMenuItemProps) => {
    const pathname = usePathname();
    const isActive = match ? pathname === path : pathname.startsWith(path);
    const _css = classNames(
        style['ui-menu__item'],
        isActive ? style['ui-menu__item--active'] : ''
    )
    return (
        <Link className={_css} href={path} onClick={() => closeMenu()}>{text}</Link>
    );
}

export {MenuItem}