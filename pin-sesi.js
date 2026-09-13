function sandikanPin(pin) {
  return btoa(pin).split('').reverse().join('');
}

// Fungsi utama penentu paket soal dan file pembahasan
function muatSoalBerdasarkanPin(pin) {
  const pinRahasia = sandikanPin(pin);

  if (pinRahasia === "==QMwADM") {
    // === JALUR PIN: PAKET 1 ===
    if (typeof soalTWK_1 === 'undefined' || typeof soalTIU_1 === 'undefined' || typeof soalTKP_1 === 'undefined') {
      alert("Sistem Macet: Variabel paket soal 1 tidak ditemukan! Pastikan nama variabel di dalam file JS Anda sudah benar.");
      return [];
    }
    filePembahasan = 'pembahasan-1.pdf'; 
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1]; 
  } 
  
  else if (pinRahasia === "=Q0STN1TM9ET") { 
    // === JALUR PIN: PAKET 2 ===
    if (typeof soalTWK_2 === 'undefined' || typeof soalTIU_2 === 'undefined' || typeof soalTKP_2 === 'undefined') {
      alert("Sistem Macet: Variabel paket soal 2 tidak ditemukan! Pastikan Anda sudah mendaftarkan soal-twk-2.js dkk di index.html");
      return [];
    }
    filePembahasan = 'pembahasan-2.pdf'; 
    return [...soalTWK_2, ...soalTIU_2, ...soalTKP_2]; 
  }
  
  else {
    // === JALUR DEFAULT / PUBLIK (PIN BEBAS) ===
    if (typeof soalTWK === 'undefined' || typeof soalTIU === 'undefined' || typeof soalTKP === 'undefined') {
      alert("Sistem Macet: File paket utama tidak terbaca.");
      return [];
    }
    filePembahasan = 'pembahasan.pdf'; 
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
