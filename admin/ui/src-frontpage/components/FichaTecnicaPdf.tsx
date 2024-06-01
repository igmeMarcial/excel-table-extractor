import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

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
    width: '227px',
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
    fontSize: '10px',
    fontWeight: 'normal',
  },
  section: {
    marginBottom: '12px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'black',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
  },
});
const getImageUrl = (imgRelativePath: string) => {
  if (window.AesaInfo.devMode) {
    return imgRelativePath;
  }
  return window.AesaInfo.pluginUrl + '/public/assets/' + imgRelativePath;
};
export const FichaTecnicaPdf = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="portrait">
        <View style={styles.header}>
          <Image
            style={styles.imgMinam}
            src={getImageUrl('images/pdf-ficha-tecnica/logo-minam.png')}
          />
          <Image
            style={styles.imgSinia}
            src={getImageUrl('images/pdf-ficha-tecnica/logo-sinia.png')}
          />
        </View>
        <View style={{ marginBottom: '15px' }}>
          <Text style={styles.title}>Ficha técnica del indicador</Text>
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
