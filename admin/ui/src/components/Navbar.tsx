import { makeStyles } from '@fluentui/react-components';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { text: 'Estadisticas', path: 'indicadores' },
  //{ text: 'Anuarios', path: 'anuarios' },
  { text: 'Configuracion', path: 'configuracion' },
  { text: '*Dev', path: 'dev' },
];

const useStyles = makeStyles({
  bar: {
    backgroundColor: '#2271B1',
  },
  item: {
    color: '#CFE4FA',
    ':hover': {
      color: '#FFFFFF',
    },
  },
  active: {
    fontWeight: 600,
    color: '#FFFFFF',
  },
});

export default function Navbar() {
  const classes = useStyles();
  // Get the current location params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('view');
  const getNewUrl = (view) => {
    queryParams.set('view', view);
    queryParams.delete('rid');
    return '?' + queryParams.toString();
  };
  return (
    <nav
      className={
        'flex justify-start items-center h-10 px-10 rounded-t ' + classes.bar
      }
    >
      {items.map((item) => {
        return (
          <NavLink
            to={getNewUrl(item.path)}
            key={item.path}
            className={
              `no-underline block px-2 ${classes.item}  ` +
              (currentTab === item.path ? classes.active : '')
            }
          >
            {item.text}
          </NavLink>
        );
      })}
    </nav>
  );
}
