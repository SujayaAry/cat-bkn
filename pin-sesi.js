// Fungsi untuk mengecek PIN dan mengembalikan paket soal yang sesuai
function muatSoalBerdasarkanPin(pin) {
  if (pin === "0001") {
    // Paket Khusus 1
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1];
  } 
  else if (pin === "awlkejlkjweajwelkjaklejklajeawkaejlkjlekajlwajel") {
    // Persiapan Paket Khusus 2
    // return [...soalTWK_0002, ...soalTIU_0002, ...soalTKP_0002];
  } 
  else {
    // Paket Utama / Publik (Jika PIN asal-asalan)
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
