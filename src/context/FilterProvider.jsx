import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext({});

function FilterProvider({ children }) {
  const [planetsFilter, setPlanetsFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [buttonFilter, setButtonFilter] = useState({});

  const values = useMemo(() => ({
    planetsFilter,
    setPlanetsFilter,
    columnFilter,
    setColumnFilter,
    operatorFilter,
    setOperatorFilter,
    valueFilter,
    setValueFilter,
    buttonFilter,
    setButtonFilter,
  }), [planetsFilter, columnFilter, operatorFilter, valueFilter, buttonFilter]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default FilterProvider;
