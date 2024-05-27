import React, { useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.76666,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [newRegion, setNewRegion] = useState<any>()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingTop:10,
          }}>
          <Section title="Maybank">
            <Text style={styles.highlight}>Google Autocomplete with redux </Text>
          </Section>
          <View style={[styles.sectionContainer]}>
            <GooglePlacesAutocomplete
              placeholder='Search'
              onPress={(data, details = null) => {
                console.log(data, details);

                mapRef.current.animateToRegion({
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003
                })
              }}
              query={{
                key: 'AIzaSyASwyiLs7UmIZXwf7TnKTn2Zg8cocyybaM',
                language: 'en',
              }}
              fetchDetails={true}
              styles={styles.autocomplete}
            />
          </View>

          <View style={[styles.containerMapMain]}>
            <View style={[styles.containerMapSub]}>
              <MapView
                ref={mapRef}
                // onRegionChangeComplete={onRegionChange}
                initialRegion={region}
                zoomEnabled={true}
                scrollEnabled={true}
                showsScale={true}
                zoomControlEnabled={true}
                zoomTapEnabled={true}
                // mapType={'satellite'}
                rotateEnabled={true}
                loadingEnabled={true}
                showsCompass={false}
                style={styles.map}
              />
            </View>
          </View>
          
          <Section title="See Your History">
            <View 
              style={{
                borderWidth:1,
                borderRadius:15,
                borderColor:'grey',
                height: Dimensions.get('window').height/5.5,  
                width: Dimensions.get('window').width/1.14,             
                padding:10,
              }}
            >
              <Text>sasasa</Text>
              <Text>sasasa</Text>
              <Text>sasasa</Text>
              <Text>sasasa</Text>
            </View>
          </Section>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerMapMain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMapSub: {
    // ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height/2.5,
    width: Dimensions.get('window').width/1.14,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    overflow:'hidden',
    marginBottom:30,
    borderWidth:0.8,
    borderColor:'grey',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionContainer: {
    marginBottom: 30,
    paddingHorizontal: 24,
    flex:1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  autocomplete:{
    textInputContainer: {
      // backgroundColor: 'grey',
      borderWidth:1,
      borderRadius:15,
      borderColor:'blue',
      overflow:'hidden'
    },
    textInput: {
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    listView:{
      borderLeftWidth:0.5,
      borderRightWidth:0.5,
      borderBottomWidth:0.5,
      borderColor:'grey'
    }
  }
});

export default App;
