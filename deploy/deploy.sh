#!/usr/bin/env bash
# Deploy di VPS: tarik kode terbaru, build, lalu reload PM2.
# Pemakaian (dari folder repo di VPS): bash deploy/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Menarik kode terbaru"
git pull --ff-only

echo "==> Memasang dependency"
npm ci

echo "==> Build"
npm run build

echo "==> Reload PM2"
if pm2 describe solvix-landing > /dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo "==> Selesai"
pm2 status solvix-landing
