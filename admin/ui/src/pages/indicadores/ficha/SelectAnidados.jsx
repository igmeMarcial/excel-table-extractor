import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
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

function SelectAnidados({ onSelectChange }) {
  const styles = useStyles();
  const [formSelect, setFormSelect] = useState(null);
  const [selectionLevels, setSelectionLevels] = useState({
    componente: '',
    subComponente: '',
    temaEstadistico: '',
  });

  const { data: componentApiData } = useFetch(urls.componenteUrl);
  const { data: subComponentApiData } = useFetch(urls.subComponentesUrl);
  const { data: temasEstadisticoApiData } = useFetch(urls.temasEstadisticosUrl);

  useEffect(() => {
    setFormSelect(selectionLevels);
  }, [selectionLevels]);

  const handleSelectChange = (event, level) => {
    const selectedId = event.target.value;
    const selectValue = event.target[event.target.selectedIndex].text;

    setSelectionLevels((prevLevels) => ({
      ...prevLevels,
      [level]: selectedId,
    }));

    let selectedName = '';
    // console.log(selectionLevels);
    // console.log(level);
    console.log(selectedId);
    // console.log(selectValue);
    // console.log(componentApiData);
    if (level === 'componente') {
      const selectedComponent = componentApiData.data.find(
        (comp) => comp.id === selectedId
      );
      console.log(selectedComponent);
      selectedName = selectedComponent ? selectedComponent.nombre : '';
    } else if (level === 'subComponente') {
      const selectedSubComponent = subComponentApiData.data.find(
        (subcomp) => subcomp.id === selectedId
      );
      console.log(selectedSubComponent);
      selectedName = selectedSubComponent ? selectedSubComponent.nombre : '';
    } else if (level === 'temaEstadistico') {
      selectedName = selectedId;
    }
    onSelectChange(event.target.name, selectedName);

    setFormSelect((prevFormSelect) => ({
      ...prevFormSelect,
      [level]: selectValue,
    }));
  };

  return (
    <>
      <tr>
        <th scope="row">
          <label htmlFor="componente">Componente</label>
        </th>
        <td>
          <Select
            onChange={(e) => handleSelectChange(e, 'componente')}
            value={selectionLevels.componente}
            name="componente"
            id="componente"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione un componente</option>
            {componentApiData?.data?.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.nombre}
              </option>
            ))}
          </Select>
        </td>
      </tr>

      <tr>
        <th scope="row">
          <label htmlFor="subComponente">Sub componente</label>
        </th>
        <td>
          <Select
            onChange={(e) => handleSelectChange(e, 'subComponente')}
            value={selectionLevels.subComponente}
            name="subComponente"
            id="subComponente"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione un subcomponente</option>
            {subComponentApiData?.data
              ?.filter((x) => x.componenteId === selectionLevels.componente)
              .map((subcomp) => (
                <option key={subcomp.id} value={subcomp.id}>
                  {subcomp.nombre}
                </option>
              ))}
          </Select>
        </td>
      </tr>

      <tr>
        <th scope="row">
          <label htmlFor="temaEstadistico">Tema estadístico</label>
        </th>
        <td>
          <Select
            onChange={(e) => handleSelectChange(e, 'temaEstadistico')}
            value={selectionLevels.temaEstadistico}
            name="temaEstadistico"
            id="temaEstadistico"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione tema estadístico</option>
            {temasEstadisticoApiData?.data
              ?.filter(
                (x) => x.subcomponenteId === selectionLevels.subComponente
              )
              .map((tema) => (
                <option key={tema.nombre} value={tema.nombre}>
                  {tema.nombre}
                </option>
              ))}
          </Select>
        </td>
      </tr>
    </>
  );
}
export default SelectAnidados;
