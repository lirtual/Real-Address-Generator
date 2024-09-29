export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const country = searchParams.get('country') || getRandomCountry();
  let address, name, gender, phone;

  try {
    for (let i = 0; i < 100; i++) {
      const location = getRandomLocationInCountry(country);
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`;

      const response = await fetch(apiUrl, {
        headers: { 'User-Agent': 'Cloudflare Pages' }
      });
      const data = await response.json();

      if (data && data.address && data.address.house_number && data.address.road && (data.address.city || data.address.town)) {
        address = formatAddress(data.address, country);
        break;
      }
    }

    if (!address) {
      throw new Error('Failed to retrieve detailed address');
    }

    const userData = await fetch('https://randomuser.me/api/');
    const userJson = await userData.json();
    if (userJson && userJson.results && userJson.results.length > 0) {
      const user = userJson.results[0];
      name = `${user.name.first} ${user.name.last}`;
      gender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
      phone = getRandomPhoneNumber(country);
    } else {
      name = getRandomName();
      gender = "Unknown";
      phone = getRandomPhoneNumber(country);
    }

    return new Response(JSON.stringify({ name, gender, phone, address }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in address generation:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve detailed address, please refresh the interface （检索详细地址失败，请刷新界面）' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function getRandomCountry() {
  const countries = ["US", "UK", "FR", "DE", "CN", "TW", "HK", "JP", "IN", "AU", "BR", "CA", "RU", "ZA", "MX", "KR", "IT", "ES", "TR", "SA", "AR", "EG", "NG", "ID"];
  return countries[Math.floor(Math.random() * countries.length)];
}

function getRandomLocationInCountry(country) {
  const countryCoordinates = {
    "US": [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
    "UK": [{ lat: 51.5074, lng: -0.1278 }, { lat: 53.4808, lng: -2.2426 }],
    "FR": [{ lat: 48.8566, lng: 2.3522 }, { lat: 45.7640, lng: 4.8357 }],
    "DE": [{ lat: 52.5200, lng: 13.4050 }, { lat: 48.1351, lng: 11.5820 }],
    "CN": [{ lat: 39.9042, lng: 116.4074 }, { lat: 31.2304, lng: 121.4737 }],
    "TW": [{ lat: 25.0330, lng: 121.5654 }, { lat: 22.6273, lng: 120.3014 }],
    "HK": [{ lat: 22.3193, lng: 114.1694 },{ lat: 22.3964, lng: 114.1095 }],
    "JP": [{ lat: 35.6895, lng: 139.6917 }, { lat: 34.6937, lng: 135.5023 }],
    "IN": [{ lat: 28.6139, lng: 77.2090 }, { lat: 19.0760, lng: 72.8777 }],
    "AU": [{ lat: -33.8688, lng: 151.2093 }, { lat: -37.8136, lng: 144.9631 }], 
    "BR": [{ lat: -23.5505, lng: -46.6333 }, { lat: -22.9068, lng: -43.1729 }], 
    "CA": [{ lat: 43.651070, lng: -79.347015 }, { lat: 45.501690, lng: -73.567253 }], 
    "RU": [{ lat: 55.7558, lng: 37.6173 }, { lat: 59.9343, lng: 30.3351 }], 
    "ZA": [{ lat: -33.9249, lng: 18.4241 }, { lat: -26.2041, lng: 28.0473 }], 
    "MX": [{ lat: 19.4326, lng: -99.1332 }, { lat: 20.6597, lng: -103.3496 }], 
    "KR": [{ lat: 37.5665, lng: 126.9780 }, { lat: 35.1796, lng: 129.0756 }], 
    "IT": [{ lat: 41.9028, lng: 12.4964 }, { lat: 45.4642, lng: 9.1900 }], 
    "ES": [{ lat: 40.4168, lng: -3.7038 }, { lat: 41.3851, lng: 2.1734 }], 
    "TR": [{ lat: 41.0082, lng: 28.9784 }, { lat: 39.9334, lng: 32.8597 }], 
    "SA": [{ lat: 24.7136, lng: 46.6753 }, { lat: 21.3891, lng: 39.8579 }], 
    "AR": [{ lat: -34.6037, lng: -58.3816 }, { lat: -31.4201, lng: -64.1888 }], 
    "EG": [{ lat: 30.0444, lng: 31.2357 }, { lat: 31.2156, lng: 29.9553 }], 
    "NG": [{ lat: 6.5244, lng: 3.3792 }, { lat: 9.0579, lng: 7.4951 }], 
    "ID": [{ lat: -6.2088, lng: 106.8456 }, { lat: -7.7956, lng: 110.3695 }] 
  };
  const coordsArray = countryCoordinates[country];
  const randomCity = coordsArray[Math.floor(Math.random() * coordsArray.length)];
  const lat = randomCity.lat + (Math.random() - 0.5) * 0.1;
  const lng = randomCity.lng + (Math.random() - 0.5) * 0.1;
  return { lat, lng };
}

function formatAddress(address, country) {
  return `${address.house_number} ${address.road}, ${address.city || address.town || address.village}, ${address.postcode || ''}, ${country}`;
}

function getRandomPhoneNumber(country) {
  const phoneFormats = {
    "US": () => `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
    "UK": () => `+44 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(100000 + Math.random() * 900000)}`,
    "FR": () => `+33 ${Math.floor(1 + Math.random() * 9)} ${Math.floor(10000000 + Math.random() * 90000000)}`,
    "DE": () => `+49 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
    "CN": () => `+86 ${Math.floor(130 + Math.random() * 60)}${Math.floor(10000000 + Math.random() * 90000000)}`,
    "TW": () => `+886 ${Math.floor(900 + Math.random() * 100)}${Math.floor(100000 + Math.random() * 900000)}`,
    "HK": () => `+852 ${Math.floor(5000 + Math.random() * 5000)}${Math.floor(1000 + Math.random() * 9000)}`,
    "JP": () => `+81 ${Math.floor(70 + Math.random() * 20)}${Math.floor(10000000 + Math.random() * 90000000)}`,
    // ... 可以继续添加其他国家的电话号码格式 ...
  };

  return (phoneFormats[country] || (() => `+${Math.floor(1 + Math.random() * 999)} ${Math.floor(100000000 + Math.random() * 900000000)}`))();
}

function getRandomName() {
  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
  const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Wilson"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}