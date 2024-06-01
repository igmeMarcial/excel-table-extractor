import { Button, Spinner } from '@fluentui/react-components';
import { useResetDatabaseMutation } from '../../app/services/devops';
function DbOps() {
  const [
    resetDatabase,
    { data: resetResponse, isLoading: isResetingDatabase },
  ] = useResetDatabaseMutation();
  const buttonIcon = isResetingDatabase ? <Spinner size="tiny" /> : null;
  return (
    <div className="flex py-2 gap-2 items-center">
      <Button onClick={() => resetDatabase()} className="m-5" icon={buttonIcon}>
        Reset db
      </Button>
      <div>
        {!isResetingDatabase && resetResponse === 'OK'
          ? 'Base de datos reseteada correctamente!'
          : ''}
      </div>
    </div>
  );
}
export default DbOps;
