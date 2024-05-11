export interface UIContainerProps {
    children?: React.ReactNode;
}

export interface UIMenuItemProps {
    text: string;
    path: string;
    match?: boolean;
    closeMenu?: () => void;
}