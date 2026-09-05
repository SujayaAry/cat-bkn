// Fungsi untuk mengecek PIN dan mengembalikan paket soal yang sesuai
function muatSoalBerdasarkanPin(pin) {
  if (pin === "0001") {
    // Paket Khusus 1
    return [...soalTWK_0001, ...soalTIU_0001, ...soalTKP_0001];
  } 
  else if (pin === "0002") {
    // Persiapan Paket Khusus 2
    // return [...soalTWK_0002, ...soalTIU_0002, ...soalTKP_0002];
  } 
  else {
    // Paket Utama / Publik (Jika PIN asal-asalan)
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
