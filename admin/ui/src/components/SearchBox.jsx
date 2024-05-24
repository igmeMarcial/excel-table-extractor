import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import debounceTime from '../utils/debounceTime';

function SearchBox(props) {
  const { placeholder, debounce, onChange } = props;
  const [value, setValue] = useState('');
  // Aplicar un tiempo de espera
  const debouncedSearch = useMemo(
    () => debounceTime(onChange, debounce),
    [onChange, debounce]
  );
  // Notificar cambios
  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    debouncedSearch(value);
  };
  // Limpiar la caja de busqueda
  const handleClear = () => {
    setValue('');
    debouncedSearch('');
  };
  return (
    <Input
      prefix={
        <SearchOutlined
          style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.6)' }}
        />
      }
      placeholder={placeholder}
      className="w-60"
      onChange={handleChange}
      value={value}
      suffix={
        value ? (
          <CloseOutlined
            onClick={handleClear}
            style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.6)' }}
          />
        ) : null
      }
    />
  );
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  debounce: PropTypes.number,
  onChange: PropTypes.func,
};
SearchBox.defaultProps = {
  placeholder: 'Buscar...',
  debounce: 0,
  onChange: () => {},
};
export default SearchBox;
