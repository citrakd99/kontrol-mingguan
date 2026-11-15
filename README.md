# Kontrol Mingguan

Aplikasi web satu halaman untuk mengontrol pencapaian jadwal proyek per minggu. Tidak ada data proyek di dalam repo; jadwal dibaca dari Google Sheet milik pengguna.

## Fitur

- Tandai tiap pekerjaan per minggu sebagai tercapai atau tidak. Target yang tidak tercapai memperpanjang pekerjaan itu satu minggu.
- Dashboard: progres, PPC, pekerjaan tergeser, proyeksi minggu selesai, beban per minggu, pencapaian per area.
- Filter disiplin: Semua, CSA, MEP.
- Barang indent: batas pesan dihitung dari tanggal butuh dikurangi lead time, dengan peringatan 14 hari sebelumnya.
- Laporan untuk satu atau beberapa minggu, dicetak atau disimpan sebagai PDF lewat dialog cetak browser.

## Format Google Sheet jadwal

Satu tab dengan satu baris judul. Kolom dikenali dari namanya:

| Kolom | Wajib | Catatan |
|---|---|---|
| ID | tidak | Kunci tandaan. Jangan diubah setelah mulai dipakai. |
| Disiplin | tidak | Dikelompokkan menjadi CSA atau MEP. Nilai lain hanya tampil di "Semua". |
| Area | tidak | |
| Kelompok | tidak | |
| Pekerjaan | ya | |
| Durasi | tidak | Hari kalender. Jika kosong dihitung dari Selesai. |
| Mulai | ya | Paling aman `2026-11-03`. `03-Nov-26` dan `03/11/2026` juga terbaca. |
| Selesai | tidak | |

Bagikan sheet ke "Siapa saja yang memiliki link" sebagai Pelihat, lalu tempel linknya di Pengaturan.

## Menyimpan tandaan ke Google Sheet

Tanpa langkah ini tandaan hanya tersimpan di browser.

1. Buka Google Sheet jadwal, menu Extensions > Apps Script.
2. Tempel isi `apps-script/Code.gs`.
3. Deploy > New deployment > Web app, "Execute as: Me", "Who has access: Anyone".
4. Tempel URL yang berakhiran `/exec` di Pengaturan > Simpan ke Google Sheet.

Data disimpan di tab `KontrolData`. Siapa pun yang memegang URL itu bisa membaca dan menimpa tandaan. Jika dua orang mengisi bersamaan, simpanan terakhir yang menang.

## Menjalankan

Buka `index.html` di browser, atau deploy folder ini sebagai situs statis (misalnya GitHub Pages).
