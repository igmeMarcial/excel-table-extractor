import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { makeStyles, shorthands, Select } from '@fluentui/react-components';

const urls = {
  componenteUrl:
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/componentes',
  subComponentesUrl:
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/subcomponentes',
  temasEstadisticosUrl:
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/temas-estadisticos',
};

const useStyles = makeStyles({
  selectInput: {
    width: '25em',
  },
});

function SelectAnidados() {
  const styles = useStyles();
  const [componentes, setComponentes] = useState([]);
  const [selectedComponente, setSelectedComponente] = useState(null);
  const [subComponentes, setSubComponentes] = useState([]);
  const [selectedSubcomponente, setSelectedSubcomponente] = useState(null);
  const [temasEstadisticos, setTemasEstadisticos] = useState(null);
  const [selectedTemaEstadistico, setSelectedTemaEstadistico] = useState(null);

  const {
    data: componentData,
    isPending: isComponente,
    error: errorComponent,
  } = useFetch(urls.componenteUrl);

  const {
    data: subComponentData,
    isPending: isSubComponente,
    error: errorSubComponent,
  } = useFetch(urls.subComponentesUrl);

  const {
    data: temasEstadisticoData,
    isPending: isTemaEstadisctico,
    error: errorTemaStadisctico,
  } = useFetch(urls.temasEstadisticosUrl);

  let componentesOrganizados = [];
  if (componentData && subComponentData && temasEstadisticoData) {
    componentesOrganizados = componentData.data.map((componente) => {
      const subcomponentes = subComponentData.data.filter(
        (subcomponente) => subcomponente.componenteId === componente.id
      );
      const subcomponentesOrganizados = subcomponentes.map((subcomponente) => {
        const temasEstadisticos = temasEstadisticoData.data.filter(
          (tema) => tema.subcomponenteId === subcomponente.id
        );
        return {
          ...subcomponente,
          temasEstadisticos: temasEstadisticos.map((tema) => tema.nombre),
        };
      });
      return {
        ...componente,
        subcomponentes: subcomponentesOrganizados,
      };
    });
  }

  useEffect(() => {
    if (componentData && componentData.data) {
      setComponentes(componentData.data);
    }
  }, [componentData]);

  const handleComponenteChange = (event) => {
    const selectedId = event.target.value;
    const selectedComponente = componentes.find(
      (comp) => comp.id === selectedId
    );
    setSelectedComponente(selectedComponente);
    setSubComponentes(
      componentesOrganizados.find((item) => item.id === selectedComponente.id)
        .subcomponentes
    );
    setSelectedSubcomponente(null);
    setSelectedTemaEstadistico(null);
  };

  const handleSubcomponenteChange = (event) => {
    const selectedId = event.target.value;
    const selectedSubcomponente = subComponentes.find(
      (subcomp) => subcomp.id === selectedId
    );

    const buscarSubComponente = componentesOrganizados.find(
      (item) => item.id === selectedComponente.id
    );

    const buscarTemaEstadis = buscarSubComponente.subcomponentes.find(
      (item) => item.id === selectedSubcomponente.id
    );
    const temasEstadisticosConvertidos =
      buscarTemaEstadis.temasEstadisticos.map((tema) => ({
        nombre: tema,
      }));
    setTemasEstadisticos(temasEstadisticosConvertidos);
    setSelectedSubcomponente(selectedSubcomponente);
    // setSelectedTemaEstadistico(null);
  };

  const handleTemaEstadisticoChange = (event) => {
    const selectedId = event.target.value;
    setSelectedTemaEstadistico(selectedId);
  };

  return (
    <>
      <tr>
        <th scope="row">
          <label htmlFor="componente">Componente</label>
        </th>
        <td>
          <Select
            onChange={handleComponenteChange}
            value={selectedComponente?.id || ''}
            name="componente"
            id="componente"
            className={styles.selectInput}
            appearance="outline"
          >
            <option value="">Seleccione un componente</option>
            {componentes.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.nombre}
              </option>
            ))}
          </Select>
        </td>
      </tr>
      {selectedComponente && (
        <tr>
          <th scope="row">
            <label htmlFor="subComponente">Sub componente</label>
          </th>
          <td>
            <Select
              onChange={handleSubcomponenteChange}
              value={selectedSubcomponente?.id || ''}
              name="subComponente"
              id="subComponente"
              className={styles.selectInput}
              appearance="outline"
            >
              <option value="">Seleccione un subcomponente</option>
              {subComponentes.map((subcomp) => (
                <option key={subcomp.id} value={subcomp.id}>
                  {subcomp.nombre}
                </option>
              ))}
            </Select>
          </td>
        </tr>
      )}
      {selectedSubcomponente && (
        <tr>
          <th scope="row">
            <label htmlFor="temaEstadistico">Tema estadístico</label>
          </th>
          <td>
            <Select
              onChange={handleTemaEstadisticoChange}
              value={selectedTemaEstadistico || ''}
              name="temaEstadistico"
              id="temaEstadistico"
              className={styles.selectInput}
              appearance="outline"
            >
              <option value="">Seleccione un t es</option>
              {temasEstadisticos.map((tema) => (
                <option key={tema.nombre} value={tema.nombre}>
                  {tema.nombre}
                </option>
              ))}
            </Select>
          </td>
        </tr>
      )}
    </>
  );
}
export default SelectAnidados;
