import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { TITULO_ANUARIO } from '../../src/config/constantes';

const logosinia =
    window.AesaInfo.pluginUrl +
    '/public/assets/images/sinia/logo-sinia-var3.png',
  logoMinam =
    window.AesaInfo.pluginUrl + '/public/assets/images/logo_minam_borde.jpg';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: '30px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingBottom: '60px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '29px',
    border: 'solid black 1px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgMinam: {
    width: '187px',
    height: '40px',
  },
  imgSinia: {
    width: '120px',
    height: '40px',
    paddingLeft: '12px',
  },
  keyText: {
    color: 'rgb(12, 113, 195)',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  infoText: {
    fontSize: '9px',
    textAlign: 'justify',
    fontWeight: 'normal',
  },
  section: {
    marginBottom: '12px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'black',
  },
  subTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
  },
});

export const FichaTecnicaPdf = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="portrait">
        <View style={styles.header}>
          <Image style={styles.imgMinam} src={logoMinam} />
          <Image style={styles.imgSinia} src={logosinia} />
        </View>
        <View style={{ marginBottom: '15px' }}>
          <Text style={styles.title}>{TITULO_ANUARIO}</Text>
        </View>
        <View style={{ marginBottom: '15px' }}>
          <Text style={styles.subTitle}>
            Ficha de Divulgación de Estadística Ambiental.
          </Text>
        </View>
        {data.map((item) => (
          <View style={styles.section} key={item.key}>
            <Text style={styles.keyText}>{item.key}</Text>
            <Text style={styles.infoText}>{item.value}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
