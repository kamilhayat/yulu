import React, { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import BikeTypeRow from '../BikeTypeRow';
import typesData from '../../../assets/data/types';
import styles from './styles';


const calculateDistance = (originCoords, destinationCoords) => {
    const { latitude: lat1, longitude: lon1 } = originCoords;
    const { latitude: lat2, longitude: lon2 } = destinationCoords;

    // console.log('Origin Coords:', originCoords);
    // console.log('Destination Coords:', destinationCoords);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    const price = Math.round(distance); // Round distance to the nearest whole number

    console.log('Distance:', distance);
    console.log('Price:', price);

    return price;
};



const BikeTypes = ({ originCoords, destinationCoords }) => {
    const [distance, setDistance] = useState(0);
    const [selectedType, setSelectedType] = useState({});
    const [price, setPrice] = useState(0);


    useEffect(() => {
        const fetchDistance = async () => {
            if (originCoords && destinationCoords) {
                const calculatedDistance = calculateDistance(originCoords, destinationCoords);
                setDistance(calculatedDistance);
                // Assuming a simple pricing model: ₹10 per kilometer
                const calculatedPrice = calculatedDistance * 5; // Adjust as per your pricing strategy
                setPrice(calculatedPrice);
            }
        };

        fetchDistance();
    }, [originCoords, destinationCoords]);


    const confirm = () => {
        console.warn(selectedType, 'confirm');
        // console.warn('Distance:', distance);
        // console.warn('Price:', price);
    }
    return (
        <View style={styles.container}>
            {typesData.map((type) => (
                <BikeTypeRow
                    type={type}
                    key={type.id}
                    isSelected={type.type === selectedType}
                    onPress={() => setSelectedType(type.type)}
                    price={price}
                    distance={distance}

                />
            ))}
            <Pressable onPress={confirm} style={{
                backgroundColor: 'black',
                padding: 10,
                margin: 10,
                alignItems: 'center',
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Confirm Yulu
                </Text>
            </Pressable>
        </View>
    );
};

export default BikeTypes;
