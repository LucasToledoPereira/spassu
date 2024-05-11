import styles from './loader-with-backdrop.module.scss';
import { LoaderBackdropProps } from './loader-with-backdrop.props';

const LoaderBackdrop = ({ text }: LoaderBackdropProps) => {
  return <div className={styles['ui-loader-backdrop']}>{text}</div>;
};

export { LoaderBackdrop };
