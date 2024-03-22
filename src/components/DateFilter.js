import CommonFilter from './CommonFilter';

const DateFilter = ({ options, selectedOptions, onToggleOption }) => {
    return (
        <CommonFilter
            options={options}
            selectedOptions={selectedOptions}
            onToggleOption={onToggleOption}
        />
    )
};

export default DateFilter;