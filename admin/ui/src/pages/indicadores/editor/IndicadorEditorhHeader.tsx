import { Button, Tooltip, message } from 'antd';
import {
  ArrowCurveDownLeft24Regular,
  ArrowCircleLeft24Regular,
  ArrowUpRightFilled,
} from '@fluentui/react-icons';
import { SaveOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectTitulo,
  selectHasChanges,
  selectIsCreationMode,
  resetChanges,
  commitChanges,
  selectPostValues,
  validateEstadisticaFields,
} from '../EstadisticaFormSlice';
import { Link, useLocation } from 'react-router-dom';
import { resetPathUrl } from '../../../utils/url-utils';
import { useSaveEstadisticaMutation } from '../../../app/services/estadistica';
import Importar from './IndicadorEditorModalImport';
import validationsHelper from '../../../helpers/ValidationsHelper';
import { ESTADISTICA_FULL_FIELDS_DEF } from './EstadisticaFieldsDef';

const IndicadorEditorhHeader = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const dispath = useAppDispatch();
  const titulo = useAppSelector(selectTitulo);
  const hasChanges = useAppSelector(selectHasChanges);
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const postValues = useAppSelector(selectPostValues);

  const [saveEstadistica, { isLoading: isSaving }] =
    useSaveEstadisticaMutation(isCreationMode);
  const handleDescartarCambios = () => {
    dispath(resetChanges());
  };
  const showValidationErrorMessage = () => {
    messageApi.error({
      content: (
        <>
          <b>Campos con errores</b>, corrije los campos con errores e intenta
          nuevamente.
        </>
      ),
      style: {
        marginTop: '90px',
      },
    });
  };
  const showSuccessMessage = () => {
    messageApi.success({
      content: (
        <>
          <b>Guardado exitoso</b>, la estadística ha sido guardada
          correctamente.
        </>
      ),
      style: {
        marginTop: '90px',
      },
    });
  };
  const validFields = () => {
    return validationsHelper.validValues(
      ESTADISTICA_FULL_FIELDS_DEF,
      postValues
    );
  };
  const handleGuardarCambios = async () => {
    // Validar campos
    if (!validFields()) {
      dispath(validateEstadisticaFields());
      showValidationErrorMessage();
      return;
    }
    await saveEstadistica(postValues);
    dispath(commitChanges());
  };
  const urlIndicadores = resetPathUrl(location, 'indicadores');
  return (
    <>
      {contextHolder}
      <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2 items-center relative">
        <Link to={urlIndicadores} className="absolute top-3 left-2">
          <Tooltip title="Volver a la lista de indicadores">
            <Button type="text" icon={<ArrowCircleLeft24Regular />}></Button>
          </Tooltip>
        </Link>
        <div className="text-2xl md:text-2xl font-bold p-0">Indicador</div>
        <span className="flex-1"></span>
        <Importar />
        <Link
          to="https://aesa.bex.pe/anuario-estadistico/estadisticas/"
          target="_blank"
        >
          <Button
            icon={<ArrowUpRightFilled className="align-middle" />}
            type="text"
          >
            Visualizar estadística
          </Button>
        </Link>
        <Button
          type="text"
          icon={<ArrowCurveDownLeft24Regular className="w-5 align-middle" />}
          // disabled={!hasChanges}
          onClick={handleDescartarCambios}
        >
          Deshacer cambios
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          disabled={!hasChanges}
          onClick={handleGuardarCambios}
          shape="round"
          loading={isSaving}
        >
          <span>{isSaving ? 'Guardando ...' : 'Guardar'}</span>
        </Button>
      </div>
      <p className="block bg-custom-grey m-0 px-12 font-semibold text-sm pb-3 truncate">
        {titulo || 'Nombre indicador...'}
      </p>
    </>
  );
};

export default IndicadorEditorhHeader;
