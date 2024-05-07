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
interface RowDeteteButtonProps {
  onClick: () => void;
  tooltip?: string;
}
function RowDeteteButton({
  onClick,
  tooltip = 'Eliminar',
}: RowDeteteButtonProps) {
  const styles = useStyles();
  onClick =
    onClick ||
    (() => {
      console.log('click en borrar el id ');
    });

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
export default RowDeteteButton;
