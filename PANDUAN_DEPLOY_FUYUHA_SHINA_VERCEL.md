# Panduan Lengkap Membuat Akun Vercel & Deploy Fuyuha Shina

> **Untuk pemula — bisa diikuti lewat HP atau PC.**  
> Pembaruan: **22 November 2026**  
> Proyek: **Fuyuha Shina**  
> Berkas sumber: `fuyuha-shina-vercel-public-only.zip`

## 1. Persiapan

Siapkan:

- Email aktif, untuk mendaftar dan menerima kode verifikasi.
- Browser (Chrome, Firefox, atau browser lain).
- ZIP proyek **`fuyuha-shina-vercel-public-only.zip`**.
- Koneksi internet.
- **Opsional:** akun GitHub jika ingin deploy otomatis setelah memperbarui kode.

**Penting:** Proyek ini memakai **Node.js + Express**, bukan HTML statis semata. Jangan mengunggah `public/index.html` saja. Backend memerlukan `server.js`, `package.json`, folder `app`, dan `lib`.

### Isi folder yang harus dipakai

Setelah ekstrak ZIP, buka folder **`am-reverse-main`**. Isinya kira-kira seperti ini:

```text
am-reverse-main/
├── app/
│   └── api/
│       ├── index.js
│       ├── route.js
│       ├── send-link/
│       ├── verify-link/
│       ├── stats/
│       └── status/
├── data/
│   └── stats.json
├── lib/
│   ├── auth.js
│   ├── errors.js
│   └── stats.js
├── public/
│   └── index.html
├── am.js
├── package.json
├── server.js
├── README.md
└── LICENSE
```

**Tanda folder yang benar:** `package.json` dan `server.js` berada **langsung di dalam folder utama proyek**, bukan tersimpan satu folder lebih dalam dari root yang dipilih.

---

## 2. Cara Membuat Akun Vercel

1. Buka **https://vercel.com/signup**.
2. Pilih salah satu metode pendaftaran:
   - **Continue with GitHub** — cocok jika proyek akan dikelola lewat GitHub.
   - **Continue with Google** — mudah jika memiliki akun Google.
   - **Continue with Email** — Vercel akan meminta verifikasi email.
3. Ikuti proses login/otorisasi yang muncul. Jika menggunakan email, masukkan kode OTP yang dikirim Vercel. Verifikasi tambahan dapat diminta tergantung kondisi akun.
4. Setelah masuk, pilih ruang kerja pribadi atau buat ruang kerja jika diminta.
5. Untuk kebutuhan belajar dan eksperimen pribadi, pilih paket **Hobby** jika tersedia dan memenuhi syarat penggunaan. Periksa batasan dan aturan paket sebelum digunakan secara komersial.
6. Setelah masuk ke **Dashboard**, akun Vercel siap dipakai.

**Catatan:** Nama tombol dan tata letak dashboard dapat berubah. Cari padanan seperti **Add New**, **New Project**, atau **Import Project**.

---

## 3. Cara Deploy Paling Mudah: Upload Folder Lewat Browser

> **Disarankan untuk percobaan pertama.** Halaman pembuatan proyek Vercel menyediakan opsi memilih atau menyeret proyek/folder. Jika opsi ini tidak tersedia pada perangkatmu, gunakan cara GitHub atau CLI di bagian berikutnya.

1. **Ekstrak ZIP** `fuyuha-shina-vercel-public-only.zip` di HP atau PC.
2. Pastikan folder `am-reverse-main` berisi `package.json`, `server.js`, dan `public/`.
3. Login di **https://vercel.com**.
4. Buka **https://vercel.com/new**.
5. Cari area **drag and drop**, **Choose folder**, atau **Upload project**.
6. Pilih **folder hasil ekstrak `am-reverse-main`**, bukan ZIP mentah dan bukan folder `public` saja.
7. Isi konfigurasi proyek jika diminta:

   | Pengaturan | Nilai yang disarankan |
   |---|---|
   | Project Name | `fuyuha-shina` |
   | Framework / Application Preset | **Express**, jika tersedia / terdeteksi |
   | Root Directory | Folder yang berisi `package.json` dan `server.js` |
   | Build Command | **Default / kosong**; jangan menambahkan perintah build React/Next.js |
   | Output Directory | **Default / kosong**; jangan isi `public` sebagai output build |
   | Install Command | Default, agar dependensi `package.json` dipasang |

8. Klik **Deploy**.
9. Tunggu halaman hasil build. Jika sukses, buka URL proyek yang disediakan oleh Vercel.
10. Nama proyek contoh `fuyuha-shina` mungkin menghasilkan URL sejenis `https://fuyuha-shina.vercel.app`, **tetapi URL sebenarnya ditentukan oleh Vercel** dan mungkin berbeda jika nama sudah digunakan.

**Bila dari HP:** Browser mungkin tidak menyediakan pemilih seluruh folder. Jika tidak bisa memilih folder proyek secara lengkap, gunakan PC atau metode GitHub/CLI. Jangan mengunggah satu file HTML lalu menganggap API ikut terdeploy.

---

## 4. Alternatif: Deploy Menggunakan GitHub

Cara ini cocok bila nanti ingin memperbarui website dengan cukup mengubah kode di GitHub.

### A. Membuat akun GitHub (jika belum ada)

1. Buka **https://github.com/signup**.
2. Daftar memakai email dan selesaikan verifikasi akun.
3. Login ke GitHub.

### B. Membuat repositori

1. Buka **https://github.com/new**.
2. Isi **Repository name** dengan `fuyuha-shina`.
3. Pilih **Private** jika tidak ingin sumber kode terlihat publik. Ini disarankan sebelum memastikan tidak ada kunci atau kredensial sensitif yang tertanam di kode.
4. Klik **Create repository**.
5. Masukkan **isi folder `am-reverse-main`** ke repositori tersebut. Pertahankan struktur foldernya. Kamu dapat menggunakan GitHub Desktop, Git CLI, atau fitur unggah GitHub bila mendukung seluruh struktur folder.
6. Pastikan pada halaman utama repositori terlihat `package.json`, `server.js`, `app/`, `lib/`, dan `public/`.

### C. Menghubungkan GitHub ke Vercel

1. Buka **https://vercel.com/new**.
2. Pilih **Continue with GitHub** atau **Import Git Repository**.
3. Izinkan Vercel mengakses repositori yang dipilih jika diminta.
4. Pilih repositori **`fuyuha-shina`** → **Import**.
5. Pastikan **Root Directory** mengarah ke folder yang langsung berisi `package.json` dan `server.js`.
6. Pastikan preset **Express** bila terdeteksi atau tersedia; biarkan build/output default jika tidak memerlukan pengaturan khusus.
7. Klik **Deploy**.

Jika GitHub sudah terhubung, perubahan yang dikirim ke branch produksi biasanya memicu deployment otomatis pada Vercel.

---

## 5. Alternatif PC: Deploy Lewat Terminal (Vercel CLI)

> Cocok jika sudah memakai Windows/PC dan ingin mengirim langsung dari folder lokal tanpa harus membuat repositori GitHub.

1. Instal **Node.js versi LTS** dari **https://nodejs.org/**.
2. Ekstrak ZIP, lalu buka **Terminal / PowerShell** pada folder `am-reverse-main`.
3. Cek instalasi:

   ```bash
   node -v
   npm -v
   ```

4. Instal dependensi, lalu uji secara lokal:

   ```bash
   npm install
   npm start
   ```

   Buka **http://localhost:3300**. Jika sudah selesai, tekan `Ctrl+C` untuk menghentikan server.

5. Instal Vercel CLI:

   ```bash
   npm install -g vercel
   ```

6. Login:

   ```bash
   vercel login
   ```

7. Masih dari folder yang berisi `package.json` dan `server.js`, buat deployment percobaan:

   ```bash
   vercel
   ```

8. Ikuti pertanyaan di terminal. Buat proyek baru bila diminta dan pilih nama `fuyuha-shina`.
9. Setelah deployment percobaan berhasil, deploy ke produksi:

   ```bash
   vercel --prod
   ```

10. Buka URL yang ditampilkan Vercel.

**Catatan:** Jalankan perintah di **root proyek**, bukan di folder `public`.

---

## 6. Cara Memastikan Fuyuha Shina Berjalan

Setelah deployment, lakukan pemeriksaan berikut.

### Cek 1 — Tampilan utama

Buka URL website yang diberikan Vercel. Pastikan:

- Judul/tab browser menampilkan **Fuyuha Shina**.
- Tampilan pastel muncul.
- **Tidak ada header atau banner Nexora**.
- Kolom email, tombol kirim link, dan langkah verifikasi tersedia.

### Cek 2 — Kesehatan backend

Buka alamat:

```text
https://DOMAIN-VERCEL-KAMU/api/status
```

Contoh respons yang diharapkan:

```json
{
  "status": "online",
  "timestamp": "2026-11-22T12:00:00.000Z"
}
```

Tanggal/waktu hanyalah contoh; nilainya akan berubah. Jika keluar JSON dengan `status: "online"`, endpoint backend status merespons.

### Cek 3 — Endpoint statistik

Buka:

```text
https://DOMAIN-VERCEL-KAMU/api/stats
```

Respons yang diharapkan berbentuk JSON dengan `success`, `total`, `today`, dan `timestamp`.

**Catatan penting:** Proyek yang sekarang menyimpan statistik ke `data/stats.json`. Penyimpanan lokal di fungsi Vercel tidak cocok untuk statistik persisten. Statistik dapat gagal tersimpan atau kembali ke nilai sebelumnya. Jika ingin data tersimpan permanen, perlu penyimpanan eksternal dan perubahan kode backend; **perbaikan itu tidak termasuk dalam ZIP yang sekarang**.

### Cek 4 — Tombol dan API

Uji secara bertahap memakai akun yang memang kamu miliki/berhak gunakan. Jangan menyimpulkan sistem pihak ketiga pasti berhasil hanya karena UI tampil atau endpoint status merespons.

- Tombol pengiriman link memanggil `POST /api/send-link`.
- Tombol verifikasi memanggil `POST /api/verify-link`.
- Kegagalan dari layanan autentikasi atau aktivasi pihak ketiga mungkin tetap terjadi meskipun deployment sukses.

Jangan membagikan kode OTP, magic link login, token sesi, atau kredensial kepada siapa pun.

---

## 7. Solusi Jika Terjadi Error

| Masalah | Periksa / tindakan |
|---|---|
| **404 Not Found** saat membuka website | Periksa apakah yang di-deploy benar folder root proyek dan `public/index.html` ikut terbawa. Coba juga `/index.html` untuk membantu diagnosis. |
| **404** pada `/api/status` | Backend belum terdeteksi/terpasang dengan benar. Periksa `server.js`, `package.json`, dan Root Directory pada pengaturan Vercel. |
| **500 Internal Server Error** | Buka proyek di Vercel → **Logs**; periksa pesan error pada fungsi backend. |
| **Module not found / Cannot find module** | Pastikan `package.json` ikut di-upload dari root dan proses install dependensi berhasil. |
| Halaman muncul tapi tombol gagal | Periksa **DevTools → Network** (PC) dan **Runtime Logs** Vercel; lihat respons dari `/api/send-link` atau `/api/verify-link`. |
| Logo/warna atau halaman masih versi lama | Coba buka tab samaran atau lakukan hard refresh. Pastikan versi `public/index.html` yang terbaru terdeploy. |
| Statistik tidak bertambah permanen | Ini keterbatasan penyimpanan file lokal pada serverless Vercel, bukan otomatis bug tombol. |
| Tidak bisa memilih folder dari HP | Ekstrak dulu, gunakan browser mode desktop bila memungkinkan, atau pindah ke metode GitHub/CLI di PC. |
| Deployment berhasil tetapi akun pihak ketiga tidak berubah | Deployment **tidak menjamin** keberhasilan autentikasi atau aktivasi layanan eksternal; cek error API dan aturan resmi layanan tersebut. |

### Cara melihat log di Vercel

1. Masuk ke **Vercel Dashboard**.
2. Pilih proyek **fuyuha-shina**.
3. Masuk ke bagian **Deployments** untuk melihat hasil deploy, atau **Logs** untuk masalah saat runtime.
4. Buka deploy yang bermasalah dan periksa pesan error yang tercatat.

---

## 8. Cara Memperbarui Website Setelah Berhasil Deploy

**Jika deploy lewat GitHub:**

1. Ubah file yang diperlukan, misalnya `public/index.html`.
2. Commit dan push perubahan ke branch produksi.
3. Pantau deployment baru di Vercel.

**Jika deploy lewat CLI:**

1. Ubah file di folder lokal.
2. Buka terminal di root proyek.
3. Jalankan `vercel --prod` untuk mengirim versi produksi terbaru.

**Jika memakai upload folder lewat browser:**

Ikuti alur upload/deploy yang ditawarkan dashboard untuk versi baru. Untuk pembaruan rutin, integrasi GitHub atau CLI biasanya lebih praktis.

---

## 9. Ringkasan Super Singkat

1. Daftar: **https://vercel.com/signup**.
2. Login dan buka **https://vercel.com/new**.
3. Ekstrak ZIP Fuyuha Shina.
4. Deploy **folder proyek lengkap** yang berisi `server.js` dan `package.json` (langsung melalui browser bila tersedia, lewat GitHub, atau Vercel CLI).
5. Pilih konfigurasi **Express / default** dan klik **Deploy**.
6. Buka URL hasil deploy dan uji **`/api/status`**.
7. Jika tombol belum berfungsi, periksa **Logs**, bukan hanya tampilan browser.

---

## Referensi Resmi

- Pendaftaran akun: https://vercel.com/signup
- Pengelolaan akun: https://vercel.com/docs/accounts
- Pembuatan proyek: https://vercel.com/new
- Express di Vercel: https://vercel.com/docs/frameworks/backend/express
- Deployment via Git: https://vercel.com/docs/git
- Deployment via terminal: https://vercel.com/docs/cli/deploy

**Panduan ini dibuat khusus berdasarkan struktur ZIP Fuyuha Shina yang diperiksa. Tidak ada perubahan pada kode proyek dalam pembuatan dokumen ini.**
