// Mengimpor fungsi Firebase langsung melalui CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// =====================================================================
// 1. GANTI DENGAN CONFIG FIREBASE MILIK ANDA
// =====================================================================
const firebaseConfig = {
  apiKey: "AIzaSyC-dHBibhhC5nPHwGcFay2gSYa0Yrr4OjA",
  authDomain: "jlc-cat-2026.firebaseapp.com",
  projectId: "jlc-cat-2026",
  storageBucket: "jlc-cat-2026.firebasestorage.app",
  messagingSenderId: "1012795910879",
  appId: "1:1012795910879:web:18bee42b3f1b820cf0576a",
  measurementId: "G-DMYZ02L220"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// =====================================================================
// 2. FUNGSI MEMBUAT & MENGAMBIL DEVICE ID (PELACAK SILUMAN)
// =====================================================================
function getDeviceID() {
  let did = localStorage.getItem('jlc_device_id');
  if (!did) {
    did = 'JLC-DEV-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    localStorage.setItem('jlc_device_id', did);
  }
  return did;
}

// =====================================================================
// 3. FUNGSI PENGIRIMAN DATA ASINKRON (FIREBASE + GOOGLE SHEETS)
// =====================================================================
window.simpanKeDatabaseBackground = async function(hasilSkor) {
  try {
    // Menarik data identitas peserta dari layar
    const deviceId = getDeviceID();
    const namaPeserta = document.getElementById('pNama').textContent;
    const noPeserta = document.getElementById('pPeserta').textContent;
    const pinSesi = document.getElementById('inSesi').value.toUpperCase() || 'DEFAULT';

    // Mengecek riwayat pengerjaan di Firebase untuk Device ID ini
    const q = query(
      collection(db, "hasil_ujian"), 
      where("device_id", "==", deviceId),
      where("paket_soal", "==", pinSesi)
    );
    
    const querySnapshot = await getDocs(q);
    const percobaanKe = querySnapshot.size + 1; // Menghitung ini percobaan ke berapa

    // -------------------------------------------------------------
    // TAHAP A: MENGIRIM KE FIREBASE
    // -------------------------------------------------------------
    await addDoc(collection(db, "hasil_ujian"), {
      nama: namaPeserta,
      no_peserta: noPeserta,
      paket_soal: pinSesi,
      device_id: deviceId,
      skor_twk: hasilSkor.twk,
      skor_tiu: hasilSkor.tiu,
      skor_tkp: hasilSkor.tkp,
      total_skor: hasilSkor.total,
      percobaan_ke: percobaanKe,
      waktu_selesai: serverTimestamp()
    });
    console.log("Data berhasil masuk Firebase! Percobaan ke-" + percobaanKe);

    // -------------------------------------------------------------
    // TAHAP B: MENGIRIM GANDA KE GOOGLE SHEETS
    // -------------------------------------------------------------
    // GANTI URL DI BAWAH INI DENGAN URL APLIKASI WEB DARI GOOGLE APPS SCRIPT ANDA
    // Pastikan URL tetap berada di dalam tanda petik dua (" ")
    const GOOGLE_SHEETS_URL = "URL_APPS_SCRIPT_ANDA_DI_SINI";
    
    const dataKeSheets = {
      nama: namaPeserta,
      no_peserta: noPeserta,
      paket_soal: pinSesi,
      device_id: deviceId,
      skor_twk: hasilSkor.twk,
      skor_tiu: hasilSkor.tiu,
      skor_tkp: hasilSkor.tkp,
      total_skor: hasilSkor.total,
      percobaan_ke: percobaanKe
    };

    // Mengirim data ke Sheets tanpa memblokir layar aplikasi
    fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: JSON.stringify(dataKeSheets)
    }).then(response => {
       console.log("Sinyal pengiriman ke Google Sheets telah diluncurkan.");
    }).catch(error => {
       console.error("Gagal mengirim ke Sheets:", error);
    });

  } catch (e) {
    console.error("Gagal mengeksekusi penyimpanan data: ", e);
  }
};
