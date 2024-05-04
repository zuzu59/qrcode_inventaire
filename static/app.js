// zf240504.1457

const onScanSuccess = (decodedText) => {
  console.log(`QR code scanned successfully with value: ${decodedText}`);
  getRecordFromAPI(decodedText);
};

const getRecordFromAPI = async (id) => {
  const server = getServerFromURL();
  const apiUrl = 'https://' + server + '/' + 'api/v2/tables/m8mwhjo08d8tm72/records?viewId=vwze386pg0uaq45k&where=%28Index%2Ceq%2Cxxxx%29&limit=25&shuffle=0&offset=0';
  const url = apiUrl.replace('%2Cxxxx%29', '%2C' + id + '%29');
  console.log('Url: ' + url);
  console.log('toto1316');

  const token = getTokenFromURL();
  const headers = {
    'accept': 'application/json',
    'xc-token': token
  };

  try {
    const response = await axios.get(url, { headers });
    displayRecord(response.data);
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }
};


const displayRecord = (record) => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  const list = record.list; // extrait la liste du JSON

  for (const item of list) { // parcourt chaque élément de la liste
    for (const [key, value] of Object.entries(item)) { // parcourt chaque clé-valeur de l'élément
      const paragraph = document.createElement('p');
      paragraph.textContent = `${key}: ${value}`;
      resultDiv.appendChild(paragraph);
    }
  }
};


const getTokenFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
  };


const getServerFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('server');
  };
  

Html5Qrcode.getCameras()
  .then((devices) => {
    // Supprimez la ligne d'affichage des libellés des caméras
    // console.log('Available cameras:', devices.map((device) => device.label));

    if (devices && devices.length) {
      // Recherchez la caméra arrière en fonction du libellé spécifique à votre smartphone
      const rearCamera = devices.find((device) => device.label.toLowerCase().includes('camera2 0'));

      // Utilisez la caméra arrière si elle est disponible, sinon utilisez la première caméra de la liste
      const cameraId = rearCamera ? rearCamera.id : devices[0].id;
      const qrCodeConfig = { facingMode: "environment" };

      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCode.start(cameraId, qrCodeConfig, onScanSuccess);
    }
  })
  .catch((err) => {
    console.error(err);
  });

  