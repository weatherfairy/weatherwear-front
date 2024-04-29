import CommonFilter from './CommonFilter';

const SatisfyFilter = ({ options, selectedOptions, onToggleOption }) => {
    return (
        <CommonFilter
            options={options}
            selectedOptions={selectedOptions}
            onToggleOption={onToggleOption}
        />
    )
};

export default SatisfyFilter;