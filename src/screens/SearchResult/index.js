    import React from 'react'
    import {View, Dimensions } from 'react-native'
    import { useRoute } from '@react-navigation/native'
    import BikeTypes from '../../components/BikeTypes'
    import RouteMap from '../../components/RouteMap'

    const SearchResults = ({route}) => {
        // const route= useRoute();
        // console.log(route.params)
        const {originCoords, destinationCoords } = route.params;


        return (
            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                <View style={{ height: Dimensions.get('window').height - 405 }}>
                <RouteMap origin={originCoords} destination={destinationCoords} />
                </View>


                <View style={{ height: 400 }}>
                <BikeTypes originCoords={originCoords} destinationCoords={destinationCoords} />
                </View>

            </View>
        )
    }

    export default SearchResults 