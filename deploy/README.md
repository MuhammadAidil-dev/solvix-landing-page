# Deploy ke VPS (Ubuntu/Debian + PM2 + Nginx)

Alur: kode di GitHub → `git pull` di VPS → `npm run build` → PM2 menjalankan `next start` di
`127.0.0.1:3200` → Nginx meneruskan trafik publik + HTTPS.

Domain utama: `topsolvixlabs.com` (dan `www.topsolvixlabs.com`). Domain lama
`topsolvixlabs.my.id` (dan `www`) di-redirect 301 ke domain utama.

## 1. Persiapan server (sekali saja)

```bash
# Login sebagai user non-root yang punya sudo, bukan root.
sudo apt update && sudo apt install -y git nginx ufw curl

# Node.js 22 (Next.js 16 butuh Node >= 20.9)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# PM2
sudo npm install -g pm2

# Firewall: hanya SSH + HTTP/HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Pastikan DNS `A record` kedua domain (`.com` dan `.my.id`, masing-masing plus `www`) sudah
menunjuk ke IP VPS sebelum langkah HTTPS.

## 2. Ambil kode dan jalankan pertama kali

```bash
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www
cd /var/www
git clone https://github.com/MuhammadAidil-dev/solvix-landing-page.git solvix-landing
cd solvix-landing
bash deploy/deploy.sh
```

Agar PM2 hidup lagi setelah reboot (jalankan perintah `sudo ...` yang dicetak oleh `pm2 startup`):

```bash
pm2 startup systemd
pm2 save
```

Cek: `curl -I http://127.0.0.1:3200` harus membalas `200`.

## 3. Nginx + HTTPS

Server baru: pakai `nginx.conf.example` (HTTP saja) untuk mendapatkan sertifikat. `certbot --nginx`
menambahkan blok HTTPS sendiri. `nginx.conf.https.example` adalah hasil akhir yang dipakai di
produksi, untuk referensi atau migrasi.

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/solvix-landing
sudo ln -s /etc/nginx/sites-available/solvix-landing /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d topsolvixlabs.com -d www.topsolvixlabs.com \
  -d topsolvixlabs.my.id -d www.topsolvixlabs.my.id
```

### Migrasi dari VPS yang sudah jalan (domain lama → baru)

Certbot `--nginx` hanya bisa memasang sertifikat ke server block yang `server_name`-nya sudah
memuat domain tersebut. Pada VPS yang sudah punya config, urutannya:

```bash
# 1. Perluas sertifikat (pasang otomatis akan gagal sampai langkah 2; itu normal)
sudo certbot --nginx --expand -d topsolvixlabs.com -d www.topsolvixlabs.com \
  -d topsolvixlabs.my.id -d www.topsolvixlabs.my.id

# 2. Ganti config nginx yang AKTIF (cek nama file lewat `ls -l /etc/nginx/sites-enabled/`)
#    dengan deploy/nginx.conf.https.example, lalu:
sudo nginx -t && sudo systemctl reload nginx
```

Nama lineage sertifikat mengikuti domain pertama saat dibuat (di VPS ini
`topsolvixlabs.my.id`), jadi path `ssl_certificate` di `nginx.conf.https.example` perlu
disesuaikan kalau lineage-nya berbeda: cek dengan `sudo certbot certificates`.

Certbot memasang pembaruan sertifikat otomatis. Uji dengan `sudo certbot renew --dry-run`.

## 4. Update berikutnya

```bash
cd /var/www/solvix-landing && bash deploy/deploy.sh
```

Script memakai `pm2 reload`, jadi proses diganti tanpa mati lama.

## Catatan

- **Env:** halaman saat ini statis dan tidak butuh variabel env. Kalau nanti memakai API, buat
  `.env.production` di VPS dari `.env.example` (file ini tidak ikut git) **sebelum** `npm run build`,
  karena `NEXT_PUBLIC_*` dibaca saat build.
- **RAM kecil (≤1 GB):** `npm run build` bisa gagal kehabisan memori. Tambahkan swap 1–2 GB, atau
  build di lokal lalu kirim folder `.next`.
- **Log:** `pm2 logs solvix-landing`. Restart manual: `pm2 restart solvix-landing`.
- **Port:** 3200 hanya terbuka ke localhost; jangan dibuka di firewall.
