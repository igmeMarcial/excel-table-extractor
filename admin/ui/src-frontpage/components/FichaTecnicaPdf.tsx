import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Image,
} from '@react-pdf/renderer';

const logosinia = 'images/logo_sinia.png',
  logoMinan = 'images/LogoMinan.svg';

export const FichaTecnicaPdf = () => {
  return (
    <Document>
      <Page size="A4">
        <Image src={logosinia} />
        <Svg>
          <Image src={logoMinan} />
        </Svg>
        <View>
          {/* <Image src="https://sinia.minam.gob.pe/sites/default/files/nuevo_logo_sinia.png" /> */}
          {/* <Image style={styles.img} src={sinia} /> */}
        </View>
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
