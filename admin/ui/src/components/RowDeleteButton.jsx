import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { Button, makeStyles } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  deleteButton: {
    ':hover .fui-Button__icon': {
      color: '#F44336',
    },
  },
});

function RowDeteteButton({ onClick, tooltip }) {
  const styles = useStyles();
  onClick = onClick || (() => {});

  return (
    <Button
      appearance="subtle"
      className={styles.deleteButton}
      icon={
        <Tooltip title={tooltip}>
          <DeleteRegular />
        </Tooltip>
      }
      onClick={onClick}
    />
  );
}
RowDeteteButton.propTypes = {
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};
RowDeteteButton.defaultProps = {
  tooltip: 'Eliminar',
  onClick: () => {},
};
export default RowDeteteButton;
