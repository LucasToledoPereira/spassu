import { UIContentHeaderProps } from "./content-header.props";

const ContentHeader = ({label, action}: UIContentHeaderProps) => {
    return <div className="flex justify-between ps-8 lg:ps-0 flex-col lg:flex-row gap-4 items-center">
        <div className="text-4xl font-bold">{label}</div>
        {action}
    </div>
}

export { ContentHeader }