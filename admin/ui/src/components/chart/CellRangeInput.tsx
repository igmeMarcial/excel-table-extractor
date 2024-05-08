import { Field, Input, makeStyles } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { validateCellRange } from '../../utils/validateCellRange';

const useStyles = makeStyles({
  rangeInput: {
    width: '94px',
  },
});

interface CellRangeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CellRangeInput = ({ label, value, onChange }: CellRangeInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const styles = useStyles();
  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (validateCellRange(value)) {
      onChange(value);
    }
  };
  const isValidRange = validateCellRange(inputValue);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Field label={label} validationState={!isValidRange ? 'error' : 'none'}>
      <Input
        type="text"
        className={styles.rangeInput}
        onChange={(e, data) => handleInputChange(data.value)}
        value={inputValue}
      />
    </Field>
  );
};

export default CellRangeInput;
