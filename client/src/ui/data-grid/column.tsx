import classNames from 'classnames';
import styles from './grid.module.scss';
import { UIColumnProps } from './grid.props';

const Column = ({ name, label, children, className = '' }: UIColumnProps) => {
  const _css = classNames(styles['ui-data-grid__column'], className);
  return (
    <div
      className={_css}
      style={{ '--ui-data-grid-column-name': name } as React.CSSProperties}
    >
      {label && <div className="fw-normal fs-7">{label}</div>}
      {children}
    </div>
  );
};

export { Column };
