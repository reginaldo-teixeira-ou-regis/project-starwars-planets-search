import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();
  const [dataPlanets, setDataPlanets] = useState({ results: [] });

  useEffect(() => {
    const url = 'https://swapi.dev/api/planets';

    const getInfoApi = async () => {
      const requestedApi = await makeFetch(url);
      requestedApi.results.forEach((el) => { delete el.residents; });
      setDataPlanets(requestedApi);
    };

    getInfoApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    isLoading, errors, dataPlanets,
  }), [isLoading, errors, dataPlanets]);

  if (errors) {
    return (<h1>{`Ops, algo de errado não está certo ${errors}`}</h1>);
  }

  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default TableProvider;
