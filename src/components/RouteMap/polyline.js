const decodePolyline = (encoded) => {
    let poly = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    try {
        while (index < encoded.length) {
            let b;
            let shift = 0;
            let result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            let point = { latitude: lat / 1e5, longitude: lng / 1e5 };
            poly.push(point);
        }
    } catch (error) {
        console.error('Error decoding polyline:', error);
        // Handle decoding error, e.g., return an empty array
        return [];
    }
    // setRouteCoordinates(decodedCoordinates);

    return poly;
};