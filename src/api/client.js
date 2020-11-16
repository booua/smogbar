
const getUserIp = async () => {
    return await fetch('https://api.ipify.org?format=json').then(res => res.json())
}

export const getGeolocation = async () => {
    let userIp = await getUserIp()
    let location = await fetch(`http://ip-api.com/json/${userIp.ip}`).then(res => res.json())
    let geolocation = {
        lat: location.lat,
        lng: location.lon
    }
    return geolocation;
}