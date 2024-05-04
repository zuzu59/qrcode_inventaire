// zf240504.1409

const onScanSuccess = (decodedText) => {
  console.log(`QR code scanned successfully with value: ${decodedText}`);
  getRecordFromAPI(decodedText);
};

const getRecordFromAPI = async (id) => {

//  const url = 'https://app.nocodb.com/api/v2/tables/m26erao3ocx4gsj/records/' + id;
  const apiUrl = getApiUrlFromURL();
  console.log('apiUrl: ' + apiUrl);

  const url = apiUrl.replace('%2C30306%29', '%2C' + id + '%29');
//  let url = encodeUrl(replaceUrl);
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




const getApiUrlFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('url');
  };
  
  



  function encodeUrl(url) {
    let encodedUrl = '';
    for (let i = 0; i < url.length; i++) {
      let charCode = url.charCodeAt(i);
      if (charCode === charCode.toString(16).length && charCode !== 0x20 && charCode !== 0x2D && charCode !== 0x2E && charCode !== 0x5F && charCode !== 0x7E && (charCode < 0x30 || charCode > 0x39) && (charCode < 0x41 || charCode > 0x5A) && (charCode < 0x61 || charCode > 0x7A)) {
        encodedUrl += '%' + charCode.toString(16).toUpperCase();
      } else {
        encodedUrl += url[i];
      }
    }
    return encodedUrl;
  }






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

  