import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { makeStyles, Select } from '@fluentui/react-components';

const urls = {
  componenteUrl: `${AesaInfo.apiUrl}/mdea/componentes`,
  subComponentesUrl: `${AesaInfo.apiUrl}/mdea/subcomponentes`,
  temasEstadisticosUrl: `${AesaInfo.apiUrl}/mdea/temas-estadisticos`,
};

const useStyles = makeStyles({
  selectInput: {
    width: '25em',
  },
});

function SelectAnidados() {
  const styles = useStyles();
  const [componente, setComponente] = useState(null);
  const [subComponentData, setSubComponentData] = useState(null);
  const [temasEstadisticoData, setTemasEstadisticoData] = useState(null);
  const [subComponentes, setSubComponentes] = useState(null);
  const [temasEstadisticos, setTemasEstadisticos] = useState(null);
  const [selectedComponente, setSelectedComponente] = useState('');
  const [selectedSubcomponente, setSelectedSubcomponente] = useState('');
  const [selectedTemaEstadistico, setSelectedTemaEstadistico] = useState('');

  const { data: componentApiData } = useFetch(urls.componenteUrl);
  const { data: subComponentApiData } = useFetch(urls.subComponentesUrl);
  const { data: temasEstadisticoApiData } = useFetch(urls.temasEstadisticosUrl);

  useEffect(() => {
    setComponente(componentApiData?.data ?? []);
    setSubComponentData(subComponentApiData?.data ?? []);
    setTemasEstadisticoData(temasEstadisticoApiData?.data ?? []);
  }, [subComponentApiData, temasEstadisticoApiData]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedComponente(selectedId);
    const subComponentesFiltrados = subComponentData.filter(
      (x) => x.componenteId === selectedId
    );
    setSubComponentes(subComponentesFiltrados);
    // setSelectedSubcomponente('');
    // setSelectedTemaEstadistico('');
  };
  const handleSelectChangeT = (event) => {
    const selectedId = event.target.value;
    setSelectedTemaEstadistico(selectedId);
  };
  const handleSelectChangeSubC = (event) => {
    const selectedId = event.target.value;
    setSelectedSubcomponente(selectedId);
    const temasEstadisticosFiltrados = temasEstadisticoData.filter(
      (x) => x.subcomponenteId === selectedId
    );
    setTemasEstadisticos(temasEstadisticosFiltrados);
    // setSelectedTemaEstadistico('');
  };

  return (
    <>
      <tr>
        <th scope="row">
          <label htmlFor="componente">Componente</label>
        </th>
        <td>
          <Select
            onChange={handleSelectChange}
            value={selectedComponente}
            name="componente"
            id="componente"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione un componente</option>
            {componente && componente !== undefined ? (
              componente.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.nombre}
                </option>
              ))
            ) : (
              <option>No hay datos</option>
            )}
          </Select>
        </td>
      </tr>

      <tr>
        <th scope="row">
          <label htmlFor="subComponente">Sub componente</label>
        </th>
        <td>
          <Select
            onChange={handleSelectChangeSubC}
            value={selectedSubcomponente}
            name="subComponente"
            id="subComponente"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione un subcomponente</option>
            {subComponentes && subComponentes !== undefined ? (
              subComponentes.map((subcomp) => (
                <option key={subcomp.id} value={subcomp.id}>
                  {subcomp.nombre}
                </option>
              ))
            ) : (
              <option>no hay datos</option>
            )}
          </Select>
        </td>
      </tr>

      <tr>
        <th scope="row">
          <label htmlFor="temaEstadistico">Tema estadístico</label>
        </th>
        <td>
          <Select
            onChange={handleSelectChangeT}
            value={selectedTemaEstadistico}
            name="temaEstadistico"
            id="temaEstadistico"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione tema estadístico</option>

            {temasEstadisticos && temasEstadisticos !== undefined ? (
              temasEstadisticos.map((tema) => (
                <option key={tema.nombre} value={tema.nombre}>
                  {tema.nombre}
                </option>
              ))
            ) : (
              <option>no hay datos</option>
            )}
          </Select>
        </td>
      </tr>
    </>
  );
}
export default SelectAnidados;
