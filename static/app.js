const onScanSuccess = (decodedText) => {
  console.log(`QR code scanned successfully with value: ${decodedText}`);
  getRecordFromAPI(decodedText);
};

const getRecordFromAPI = async (id) => {
  const url = 'https://app.nocodb.com/api/v2/tables/m26erao3ocx4gsj/records/' + id;
  const token = getTokenFromURL();
  const headers = {
    'accept': 'application/json',
    'xc-token': token
  };

  try {
    const response = await axios.get(url, { headers });
    displayRecord(response.data);
  } catch (error) {
    console.error(error);
  }
};

const displayRecord = (record) => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  for (const [key, value] of Object.entries(record)) {
    const paragraph = document.createElement('p');
    paragraph.textContent = `${key}: ${value}`;
    resultDiv.appendChild(paragraph);
  }
};

const getTokenFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
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

  