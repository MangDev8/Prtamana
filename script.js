console.log('Hello World!');


const hargaBensin = {
  pertalite: 10000,
  pertamax: 13500,
  dexlite: 15000
};

let jenisBensin = "";
let jumlahLiter = 0;
let totalHarga = 0;

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "id-ID";

recognition.onresult = function(event) {
  const text = event.results[0][0].transcript.toLowerCase();
  document.getElementById("textInput").value = text;
  processMessage(text);
};

function startListening() {
  recognition.start();
}

function sendText() {
  let text = document.getElementById("textInput").value.toLowerCase();
  processMessage(text);
}

function processMessage(text) {
  let response = "Maaf, saya tidak mengerti.";
  
  if (text.includes("korupsi patra niaga") || text.includes("pertamina korup")) {
    response = "Nah iya, kurang ajar banget kalian korupsi! Rakyat sengsara, aduhh masbro menyala! Indonesia penuh orang korup!";
  } else if (text.includes("halo") || text.includes("hai")) {
    response = "Halo! Selamat datang di Pertamana Web, ada yang bisa saya bantu?";
  } else if (text.includes("kabar") || text.includes("apa kabar")) {
    response = "Saya hanya AI, tapi saya selalu siap membantu!";
  } else if (text.includes("bensin")) {
    response = "Silakan pilih jenis bensin: Pertalite, Pertamax, atau Dexlite.";
  } else if (text.includes("pertalite")) {
    jenisBensin = "pertalite";
    response = "Anda memilih Pertalite, berapa liter?";
  } else if (text.includes("pertamax")) {
    jenisBensin = "pertamax";
    response = "Anda memilih Pertamax, berapa liter?";
  } else if (text.includes("dexlite")) {
    jenisBensin = "dexlite";
    response = "Anda memilih Dexlite, berapa liter?";
  } else if (text.includes("harga")) {
    response = `Berikut daftar harga bensin saat ini:
        - Pertalite: Rp ${hargaBensin.pertalite.toLocaleString("id-ID")}
        - Pertamax: Rp ${hargaBensin.pertamax.toLocaleString("id-ID")}
        - Dexlite: Rp ${hargaBensin.dexlite.toLocaleString("id-ID")}`;
  } else if (text.includes("promo")) {
    response = "Saat ini belum ada promo bensin. Tapi jangan khawatir, tetap pantau info terbaru ya!";
  } else if (!isNaN(text) && jenisBensin !== "") {
    jumlahLiter = parseFloat(text);
    totalHarga = jumlahLiter * hargaBensin[jenisBensin];
    response = `Anda ingin mengisi ${jumlahLiter} liter ${jenisBensin}. Total harga: Rp ${totalHarga.toLocaleString("id-ID")}`;
    document.getElementById("total-harga").innerText = `Total: Rp ${totalHarga.toLocaleString("id-ID")}`;
    document.getElementById("payment-options").style.display = "block";
    
    // Reset input teks setelah masuk ke metode pembayaran
    document.getElementById("textInput").value = "";
  }
  
  // Animasi loading sebelum jawaban muncul
  document.getElementById("chat-text").innerText = "Memproses...";
  setTimeout(() => {
    document.getElementById("chat-text").innerText = response;
    speak(response);
  }, 800);
}

function choosePayment(method) {
  let metodePembayaran = method === "tunai" ? "Tunai" : "Non-Tunai";
  let strukText = `
        Struk Pembelian\n
        Jenis Bensin: ${jenisBensin}\n
        Jumlah: ${jumlahLiter} liter\n
        Total Harga: Rp ${totalHarga.toLocaleString("id-ID")}\n
        Metode Pembayaran: ${metodePembayaran}
    `;
  
  document.getElementById("struk-text").innerText = strukText;
  document.getElementById("struk").style.display = "block";
  
  speak(`Pembayaran berhasil menggunakan ${metodePembayaran}. Terima kasih sudah mengisi BBM di Pertamana.`);
  
  // Reset semua variabel setelah transaksi selesai
  jenisBensin = "";
  jumlahLiter = 0;
  totalHarga = 0;
  
  // Reset input teks setelah struk muncul
  document.getElementById("textInput").value = "";
}

// Text-to-Speech (Suara)
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  speechSynthesis.speak(utterance);
}