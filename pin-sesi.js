function sandikanPin(pin) {
  return btoa(pin).split('').reverse().join('');
}

// Fungsi utama penentu paket soal dan file pembahasan
function muatSoalBerdasarkanPin(pin) {
  const pinRahasia = sandikanPin(pin.toUpperCase());

  if (pinRahasia === "==QMwADM") {
    // === JALUR PIN: PAKET 1 ===
    if (typeof soalTWK_1 === 'undefined' || typeof soalTIU_1 === 'undefined' || typeof soalTKP_1 === 'undefined') {
      alert("Sistem Macet: Variabel paket soal 1 tidak ditemukan! Pastikan Anda sudah mengubah nama variabel di DALAM file soal-twk-1.js, soal-tiu-1.js, dan soal-tkp-1.js menjadi soalTWK_1, soalTIU_1, dan soalTKP_1.");
      return [];
    }
    filePembahasan = 'pembahasan-1.pdf'; 
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1]; 
  } 
  else if (pinRahasia === "=Q0STN1TM9ET") { 
    // === JALUR PIN: PAKET 2 ===
    if (typeof soalTWK_2 === 'undefined' || typeof soalTIU_2 === 'undefined' || typeof soalTKP_2 === 'undefined') {
      alert("Sistem Macet: Variabel paket soal 2 tidak ditemukan! Pastikan Anda sudah mendaftarkan soal-twk-2.js dkk di index.html dan menamai variabel di dalamnya dengan benar.");
      return [];
    }
    filePembahasan = 'pembahasan-2.pdf'; 
    return [...soalTWK_2, ...soalTIU_2, ...soalTKP_2]; 
  }
  else {
    // === JALUR DEFAULT / PUBLIK (PIN BEBAS) ===
    if (typeof soalTWK === 'undefined' || typeof soalTIU === 'undefined' || typeof soalTKP === 'undefined') {
      alert("Sistem Macet: File paket utama (soal-twk.js dkk) tidak terbaca. Pastikan file tersebut sudah diunggah dan variabelnya bernama soalTWK, soalTIU, dan soalTKP.");
      return [];
    }
    filePembahasan = 'pembahasan.pdf'; 
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
