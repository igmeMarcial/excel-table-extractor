import React from 'react';
import { Button, Input } from '@fluentui/react-components';
import { Search24Regular, ArrowUpload24Regular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../hooks/usePathRoute';
import Modal from './ModalPlantilla';

function ToolbarPlantilla() {
  return (
    <div className="flex px-4 pt-6 pb-4 gap-2">
      <Input
        contentBefore={<Search24Regular />}
        placeholder="Buscar.."
        type="search"
      />
      <span className="flex-1"></span>
      <Modal />
    </div>
  );
}

export default ToolbarPlantilla;
