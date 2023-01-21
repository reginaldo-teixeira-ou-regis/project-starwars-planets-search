import PropTypes from 'prop-types';

function PlanetFilter({ nameFilter: { nameFilter, setNameFilter } }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar planetas"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
      {/* <button type="submit">Filtrar</button> */}
    </div>
  );
}

PlanetFilter.propTypes = {
  nameFilter: PropTypes.shape().isRequired,
};

export default PlanetFilter;
