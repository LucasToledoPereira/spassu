import classNames from 'classnames';
import { UIContainerProps } from "./menu.props"
import style from './menu.module.scss';

const Menu = ({children}: UIContainerProps) => {
    const _style = classNames(style['ui-menu'], 'hidden lg:flex');
    return (
        <div className={_style}>{children}</div>
    )
}

export { Menu }