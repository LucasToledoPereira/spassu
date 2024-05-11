import classNames from 'classnames';
import style from './card.module.scss';
import { UICardProps } from './card.props';

const Card = ({ children, className, onClick = () => {} }: UICardProps) => {
    return <div data-testid="ui-card" className={classNames(style['ui-card'], className)} onClick={() => onClick()}>{children}</div>
}

export { Card }