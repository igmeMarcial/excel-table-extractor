import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { Button, makeStyles } from '@fluentui/react-components';
import { ArrowDownloadRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  deleteButton: {
    ':hover .fui-Button__icon': {
      color: '#2271B1',
    },
  },
});

function RowDownloadButton({ tooltip, onClick }) {
  const styles = useStyles();
  onClick = onClick || (() => {});

  return (
    <Button
      appearance="subtle"
      className={styles.deleteButton}
      icon={
        <Tooltip title={tooltip}>
          <ArrowDownloadRegular />
        </Tooltip>
      }
      onClick={onClick}
    />
  );
}
RowDownloadButton.PropTypes = {
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};
RowDownloadButton.defaultProps = {
  tooltip: 'Descargar',
  onClick: () => {},
};
export default RowDownloadButton;
