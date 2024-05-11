import styles from './skeleton.module.scss';
import { SkeletonProps } from './skeleton.props';

const Skeleton = ({ width, height, radius }: SkeletonProps) => {
  return (
    <div
      className={styles['ui-skeleton']}
      style={{
        width: width ?? '100%',
        height: height ?? '30px',
        borderRadius: radius ?? '5px',
      }}
    ></div>
  );
};

export { Skeleton };
