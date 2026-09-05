// Fungsi rahasia untuk menyandikan teks PIN yang diketik peserta
function sandikanPin(pin) {
  // btoa() mengubah PIN menjadi Base64, lalu dibalik urutannya
  return btoa(pin).split('').reverse().join('');
}

// Fungsi utama penentu paket soal dan file pembahasan
function muatSoalBerdasarkanPin(pin) {
  const pinRahasia = sandikanPin(pin);

  if (pinRahasia === "==QMwADM") {
    // === JALUR PIN: 0001 ===
    
    // Pengecekan keamanan agar layar tidak membeku jika ada salah penamaan variabel
    if (typeof soalTWK_1 === 'undefined' || typeof soalTIU_1 === 'undefined' || typeof soalTKP_1 === 'undefined') {
      alert("Sistem Macet: Variabel paket soal 1 tidak ditemukan! Pastikan Anda sudah mengubah nama variabel di DALAM file soal-twk-1.js, soal-tiu-1.js, dan soal-tkp-1.js menjadi soalTWK_1, soalTIU_1, dan soalTKP_1.");
      return [];
    }
    
    // Mengatur file PDF yang akan diunduh di akhir ujian
    filePembahasan = 'pembahasan-1.pdf'; 
    
    // Merakit dan mengirimkan soal
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1]; 
  } 
  else {
    // === JALUR DEFAULT / PUBLIK (PIN BEBAS) ===
    
    if (typeof soalTWK === 'undefined' || typeof soalTIU === 'undefined' || typeof soalTKP === 'undefined') {
      alert("Sistem Macet: File paket utama (soal-twk.js dkk) tidak terbaca. Pastikan file tersebut sudah diunggah dan variabelnya bernama soalTWK, soalTIU, dan soalTKP.");
      return [];
    }
    
    // Mengatur file PDF default
    filePembahasan = 'pembahasan.pdf'; 
    
    // Merakit dan mengirimkan soal utama
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
