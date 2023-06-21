const { default: axios } = require("axios");

const getRandomName = async () => {

    const randomNumber = Math.floor(Math.random() * 81) + 1;
    const url = `https://swapi.dev/api/people/${randomNumber}`;

    try {
        const response = await axios.get(url);
        return response.data.name;
    } catch (error) {
        return '';
    }
    // const { data } = await axios.get(url);
    // return data.name;

    // return fetch(url)
    // .then(response =>{
    //     return response.json();
    // })
    // .then(data =>{
    //     console.log({ msg: 'getRandomName', data });
    //     return data.name;
    // })
};

module.exports = { getRandomName };