import React from 'react'
import { View, TextInput, SafeAreaView, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './styles.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const API_KEY = 'pk.1e7d05bd54091e3fa470945698290b45';



const DestinationResult = () => {

   
    const [originInput, setOriginInput] = useState('');
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationInput, setDestinationInput] = useState('');
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [originCoords, setOriginCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);

    
    const navigation = useNavigation(); 


    useEffect(() => {
        fetchCurrentLocation(); // Fetch current location when component mounts
    }, []);

    const fetchCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') { 
                const location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const address = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                    if (address && address.length > 0) {
                        setOriginInput(`${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].postalCode}, ${address[0].country}`);
                        setOriginCoords({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error getting current location:', error);
        }
    };

    const fetchSuggestions = (text, setSuggestions, inputType) => {
        fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${text}&limit=8`)
            .then(response => response.json())
            .then(data => {
                if (inputType === 'origin') {
                    setOriginSuggestions(data);
                } else if (inputType === 'destination') {
                    setDestinationSuggestions(data);
                }
            })
            .catch(error => console.error('Error fetching suggestions:', error));
    };

    const handleInputChange = (text, setInput, setSuggestions, inputType) => {
        setInput(text);
        fetchSuggestions(text, setSuggestions, inputType);
    };

    const handleSelection = async (place, setInput, setSuggestions, inputType) => {
        setInput(place.display_name);
        setSuggestions([]);

        try {
            const location = await Location.geocodeAsync(place.display_name);
            if (location && location.length > 0) {
                if (inputType === 'origin') {
                    setOriginCoords({
                        latitude: location[0].latitude,
                        longitude: location[0].longitude,
                    });
                } else if (inputType === 'destination') {
                    setDestinationCoords({
                        latitude: location[0].latitude,
                        longitude: location[0].longitude,
                    });
                    if (originInput) {
                        navigation.navigate('SearchResult', {
                            originInput,
                            destinationInput: place.display_name,
                            originCoords,
                            destinationCoords: {
                                latitude: location[0].latitude,
                                longitude: location[0].longitude,
                            },
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
    };

    
    

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput style={styles.textInput}
                    placeholder="current location"
                    onChangeText={(text) => handleInputChange(text, setOriginInput, setOriginSuggestions,'origin' )}
                    value={originInput}
                />
                {originSuggestions.length > 0 && (
                    <FlatList
                        style={styles.suggestionList} data={originSuggestions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelection(item, setOriginInput, setOriginSuggestions,'origin')}>
                                <FontAwesome name="map-marker" size={20} color="gray" style={styles.mapIcon} />

                                <Text style={styles.suggestionItem}>{item.display_name}</Text>

                            </TouchableOpacity>

                        )}
                        keyExtractor={(item, index) => `${item.place_id}_${index}`}
                        />
                )}

                <TextInput style={styles.textInput}
                    placeholder="Where to?"
                    onChangeText={(text) => handleInputChange(text, setDestinationInput, setDestinationSuggestions , 'destination')}
                    value={destinationInput}
                    styles={{
                        textInput: styles.textInput,
                        container: styles.autocompleteContainer,
                        listView: styles.listView,
                        separator: styles.separator,
                    }}
                />

                {destinationSuggestions.length > 0 && (
                    <FlatList
                        style={styles.suggestionList} data={destinationSuggestions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelection(item, setDestinationInput, setDestinationSuggestions,  'destination')}>
                                <FontAwesome name="map-marker" size={20} color="gray" style={styles.mapIcon} />

                                <Text style={styles.suggestionItem}>{item.display_name}</Text>

                            </TouchableOpacity>

                        )}
                        keyExtractor={(item, index) => `${item.place_id}_${index}`}
                        />
                )}
                
                <View style={styles.circle} />

                <View style={styles.line} />

                <View style={styles.square} />
            </View>
        </SafeAreaView>
    );
};


export default DestinationResult