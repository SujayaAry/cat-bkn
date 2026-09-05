function sandikanPin(pin) {
  return btoa(pin).split('').reverse().join('');
}

function muatSoalBerdasarkanPin(pin) {
  const pinRahasia = sandikanPin(pin);

  if (pinRahasia === "==QMwADM") {
    // Pengecekan agar layar tidak membeku jika ada salah penamaan
    if (typeof soalTWK_1 === 'undefined') {
      alert("Sistem Macet: Variabel 'soalTWK_1' tidak ditemukan! Pastikan Anda sudah mengubah nama variabel di DALAM file soal-twk-1.js");
      return [];
    }
    
    filePembahasan = 'pembahasan-1.pdf'; 
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1]; 
  } 
  else {
    if (typeof soalTWK === 'undefined') {
      alert("Sistem Macet: File paket utama (soal-twk.js dkk) tidak terbaca.");
      return [];
    }
    
    filePembahasan = 'pembahasan.pdf'; 
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
