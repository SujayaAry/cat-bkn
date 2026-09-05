function sandikanPin(pin) {
  return btoa(pin).split('').reverse().join('');
}

function muatSoalBerdasarkanPin(pin) {
  const pinRahasia = sandikanPin(pin);

  if (pinRahasia === "==QMwADM") {
    // Jika PIN 0001 diketik:
    filePembahasan = 'pembahasan-1.pdf'; 
    
    // PASTIKAN: Nama variabel di bawah ini harus sama PERSIS 
    // dengan nama variabel di dalam file soal-twk-1.js, soal-tiu-1.js, dst.
    return [...soalTWK_1, ...soalTIU_1, ...soalTKP_1]; 
  } 
  else {
    // Jika PIN Sembarang / Default diketik:
    filePembahasan = 'pembahasan.pdf'; 
    return [...soalTWK, ...soalTIU, ...soalTKP];
  }
}
