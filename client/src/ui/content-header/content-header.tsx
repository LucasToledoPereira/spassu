import { UIContentHeaderProps } from "./content-header.props";

const ContentHeader = ({label, action}: UIContentHeaderProps) => {
    return <div className="flex justify-between">
        <div className="text-4xl font-bold">{label}</div>
        {action}
    </div>
}

export { ContentHeader }