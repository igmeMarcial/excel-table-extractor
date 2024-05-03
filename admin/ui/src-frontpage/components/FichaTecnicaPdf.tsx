import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const logosinia = 'images/logo_sinia.png',
  logoMinan = 'images/logo_minan2.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '29px',
    alignItems: 'center',
  },
  img: {
    maxWidth: '35%',
    maxHeight: '40px',
  },
  imgSinia: {
    maxWidth: '144px',
    maxHeight: '65px',
  },
  key: {
    color: 'rgb(12, 113, 195)',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  info: {
    fontSize: '12px',
    textAlign: 'justify',
    fontWeight: 'normal',
  },
  section: {
    marginBottom: '15px',
  },
});

export const FichaTecnicaPdf = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="portrait">
        <View style={styles.header}>
          <Image style={styles.img} src={logoMinan} />
          <Image style={styles.imgSinia} src={logosinia} />
        </View>

        <View>
          {data.map((item) => (
            <View style={styles.section} key={item.key}>
              <Text style={styles.key}>{item.key}</Text>
              <Text style={styles.info}>{item.value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
