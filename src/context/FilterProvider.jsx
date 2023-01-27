import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TableContext } from './TableProvider';

export const FilterContext = createContext({});

function FilterProvider({ children }) {
  const { dataPlanets } = useContext(TableContext);
  const [planetsFilter, setPlanetsFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [multipleFilters, setMultipleFilters] = useState([]);
  const [newState, setNewState] = useState([]);

  useEffect(() => {
    const filterUseEffect = () => {
      setNewState(dataPlanets.results);
    };
    filterUseEffect();
  }, [dataPlanets.results]);

  const inputsFilter = () => {
    const newFilterState = newState.filter((infoData) => {
      if (operatorFilter === 'maior que') {
        return +infoData[columnFilter] > +valueFilter;
      }
      if (operatorFilter === 'menor que') {
        return +infoData[columnFilter] < +valueFilter;
      }
      return +infoData[columnFilter] === +valueFilter;
    });
    setNewState(newFilterState);
  };

  const values = useMemo(() => ({
    planetsFilter,
    setPlanetsFilter,
    columnFilter,
    setColumnFilter,
    operatorFilter,
    setOperatorFilter,
    valueFilter,
    setValueFilter,
    multipleFilters,
    setMultipleFilters,
    inputsFilter,
    newState,
    setNewState,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [planetsFilter, columnFilter, operatorFilter,
    valueFilter, multipleFilters, newState]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default FilterProvider;
