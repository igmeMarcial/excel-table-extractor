import React, { useEffect, useState } from 'react';

function SelectAnidados() {
  const [componentes, setComponentes] = useState([]);
  const [selectedComponente, setSelectedComponente] = useState(null);
  const [subComponentes, setSubComponentes] = useState([]);
  const [selectedSubComponente, setSelectedSubComponente] = useState(null);
  const [temasEstadisticos, setTemasEstadisticos] = useState([]);

  const componenteUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/componentes';

  const subComponentesUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/subcomponentes';

  const temasEstadisticosUrl =
    'http://localhost:85/index.php?rest_route=/aesa/v1/mdea/temas-estadisticos';

  useEffect(() => {
    // Obtener datos del primer nivel (componentes)
    fetch(componenteUrl)
      .then((response) => response.json())
      .then((data) => setComponentes(data.data))
      .catch((error) => console.error('Error fetching componentes:', error));
  }, []);

  useEffect(() => {
    // Obtener datos del segundo nivel (subcomponentes) cuando se selecciona un componente
    if (selectedComponente) {
      fetch(`${subComponentesUrl}?componenteId=${selectedComponente.id}`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) =>
          console.error('Error fetching subcomponentes:', error)
        );
    }
  }, [selectedComponente]);

  useEffect(() => {
    // Obtener datos del tercer nivel (temas estadísticos) cuando se selecciona un subcomponente
    if (selectedSubComponente) {
      fetch(
        `${temasEstadisticosUrl}?subcomponenteId=${selectedSubComponente.id}`
      )
        .then((response) => response.json())
        .then((data) => setTemasEstadisticos(data.data))
        .catch((error) =>
          console.error('Error fetching temas estadísticos:', error)
        );
    }
  }, [selectedSubComponente]);

  return <div></div>;
}
export default SelectAnidados;
