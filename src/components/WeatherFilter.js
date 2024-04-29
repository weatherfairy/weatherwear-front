import CommonFilter from './CommonFilter';

const WeatherFilter = ({ options, selectedOptions, onToggleOption }) => {
    return (
        <CommonFilter
            options={options}
            selectedOptions={selectedOptions}
            onToggleOption={onToggleOption}
        />
    )
};

export default WeatherFilter;