  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC-dHBibhhC5nPHwGcFay2gSYa0Yrr4OjA",
    authDomain: "jlc-cat-2026.firebaseapp.com",
    projectId: "jlc-cat-2026",
    storageBucket: "jlc-cat-2026.firebasestorage.app",
    messagingSenderId: "1012795910879",
    appId: "1:1012795910879:web:18bee42b3f1b820cf0576a",
    measurementId: "G-DMYZ02L220"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // 1. SILENT DEVICE TRACKER
  function getDeviceID() {
    let did = localStorage.getItem('jlc_device_id');
    if (!did) {
      // Membuat ID unik: JLC-DEV- [Karakter Acak] - [Waktu]
      did = 'JLC-DEV-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
      localStorage.setItem('jlc_device_id', did);
    }
    return did;
  }

  // 2 & 3. FUNGSI PENGIRIMAN DATA ASINKRON (Frictionless)
  window.simpanKeDatabaseBackground = async function(hasilSkor) {
    try {
      const deviceId = getDeviceID();
      const namaPeserta = document.getElementById('pNama').textContent;
      const noPeserta = document.getElementById('pPeserta').textContent;
      // Mengambil PIN Sesi yang diketik saat login (sebagai indikator paket soal)
      const pinSesi = document.getElementById('inSesi').value.toUpperCase() || 'DEFAULT';

      // Mengecek ke Firestore: Sudah berapa kali Device ID ini mengerjakan Paket ini?
      const q = query(
        collection(db, "hasil_ujian"), 
        where("device_id", "==", deviceId),
        where("paket_soal", "==", pinSesi)
      );
      
      const querySnapshot = await getDocs(q);
      const percobaanKe = querySnapshot.size + 1; // Jika size 0, berarti percobaan ke-1

      // Mengirim Payload Data
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

      // [KODE SEBELUMNYA TETAP SAMA HINGGA BAGIAN INI]
      const querySnapshot = await getDocs(q);
      const percobaanKe = querySnapshot.size + 1;
  
      // 1. MENGIRIM KE FIREBASE (Sistem yang sudah Anda miliki)
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
  
      // =========================================================
      // 2. MENGIRIM GANDA KE GOOGLE SHEETS (REAL-TIME)
      // Ganti URL di bawah dengan URL Aplikasi Web dari Tahap 2
      const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwP5hAyCkHD_mvZil7vswdf3ZUWb7pBfhEqjOzS-MvGqfxHr687Uiz_j5uNE99UhkWHMw/exec";
      
      // Membungkus data untuk dikirim ke Excel
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
  
      // Mengirim ke Sheets tanpa menunggu balasan (Asinkron)
      fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: JSON.stringify(dataKeSheets)
      }).catch(error => console.error("Gagal mengirim ke Sheets:", error));
      // =========================================================
  
    } catch (e) {
      console.error("Gagal mengirim data: ", e);
    }
  };
      
      console.log("Data rahasia berhasil disimpan! Ini percobaan ke-" + percobaanKe);
    } catch (e) {
      console.error("Gagal mengirim data analitik: ", e);
    }
  };
