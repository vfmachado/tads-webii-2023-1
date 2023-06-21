const { default: axios } = require("axios");

const getCityAndWeather = async (cep) => {

    const brasilApiUrl =  `https://brasilapi.com.br/api/cep/v2/${cep}`
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    // primeira chamada para brasil api para recuperar dados da cidade e latitude longitude
    try {
        const responseBrasilApi = await axios.get(brasilApiUrl);
        const cityData = responseBrasilApi.data;

        const { coordinates } = cityData.location;

        if (coordinates?.longitude) {
            
            const params = new URLSearchParams();
            params.append('lat', coordinates.latitude);
            params.append('lon', coordinates.longitude);
            params.append('appid', 'SUA CHAVE AQUI');
            
            const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`; //?lat={lat}&lon={lon}&appid={API key}`

            const openWeatherResponse = await axios.get(openWeatherApiUrl, {
                params: params
            });

            const weatherData = openWeatherResponse.data;

            return { cityData, weatherData }
        }

        return {
            cityData
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { getCityAndWeather }