import { useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { useLazyGetEstadisticaQuery } from '../../app/services/estadistica';
function EstadisticaLoader() {
  const [estadisticaId, setEstadisticaId] = useState(1);
  const [resetDatabase, { data: estadistica, isFetching: isResetingDatabase }] =
    useLazyGetEstadisticaQuery();
  const buttonIcon = isResetingDatabase ? <Spinner size="tiny" /> : null;
  return (
    <div>
      <div className="flex gap-2 items-center">
        <input
          value={estadisticaId}
          type="number"
          onChange={(e) => setEstadisticaId(+e.target.value)}
        />
        <Button
          onClick={() => resetDatabase(estadisticaId)}
          className="m-5"
          icon={buttonIcon}
        >
          Load estadistica
        </Button>
      </div>
      <div className="mt-2 border">
        <textarea
          disabled
          className="w-full h-40 p-4 box-border"
          value={JSON.stringify(estadistica || {}, null, 2)}
        ></textarea>
      </div>
    </div>
  );
}

export default EstadisticaLoader;
