import React from "react";
import s from './NumberInput.module.scss';
import PropTypes from "prop-types";
import {ReactComponent as ArrowDownSVG} from "../../../../../../../../assets/images/arrowDownNumberInput.svg";
import {ReactComponent as ArrowUpSVG} from "../../../../../../../../assets/images/arrowUpNumberInput.svg";

const NumberInput = (props) => {
    const {
        placeholder,
        value,
        setValue,
        dataElem
    } = props;


    const handleOnChangeInput = (event) => {
        const inputValue = event.target.value;
        const regex = /^[0-9\b]+$/; // только числа и backspace
        if (inputValue === "" || regex.test(inputValue)) {
            setValue(inputValue);
        }
    }

    const handleIncreaseValue = () => {
        !isNaN(value) ? setValue(+value + 1) : setValue(0);
    }

    const handleDecreaseValue = () => {
        value ? value <= 0 ? setValue(+value) : setValue(value - 1) : setValue(+0);
    }

    return (
        <div className={s.NumberInput}>
            <div className={s.NumberInput_input}>
                <input
                    type='text'
                    value={value}
                    placeholder={placeholder}
                    onChange={handleOnChangeInput}
                    inputMode='numeric'
                    data-elem={dataElem}
                />
                <div className={s.NumberInput_input_controls}>
                    <div className={s.NumberInput_input_control} onClick={handleIncreaseValue}>
                        <ArrowUpSVG/>
                    </div>
                    <div className={s.NumberInput_input_control} onClick={handleDecreaseValue}>
                        <ArrowDownSVG/>
                    </div>
                </div>
            </div>
        </div>
    )
}

NumberInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    dataElem: PropTypes.string.isRequired,
}

export default NumberInput;