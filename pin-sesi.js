/* pin-sesi.js — VERSI AMAN */
var filePembahasan = 'pembahasan.pdf'; // deklarasikan eksplisit

function sandikanPin(pin) {
  return btoa(String(pin)).split('').reverse().join('');
}

function muatSoalBerdasarkanPin(pin) {
  var pinRahasia = sandikanPin(pin);

  if (pinRahasia === "==QMwADM") { // PIN 0001
    if (typeof soalTWK_1 !== 'undefined' &&
        typeof soalTIU_1 !== 'undefined' &&
        typeof soalTKP_1 !== 'undefined') {
      filePembahasan = 'pembahasan-1.pdf';
      return [].concat(soalTWK_1, soalTIU_1, soalTKP_1);
    }
    console.warn('[CAT] Paket soal-1 belum dimuat, pakai paket default.');
  }

  filePembahasan = 'pembahasan.pdf';
  return [].concat(
    typeof soalTWK !== 'undefined' ? soalTWK : [],
    typeof soalTIU !== 'undefined' ? soalTIU : [],
    typeof soalTKP !== 'undefined' ? soalTKP : []
  );
}
