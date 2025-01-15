# Run certbot
# Reload nginx

domain=$1
wwwdomain="www.$1"

certbot --nginx --agree-tos --redirect --hsts --staple-ocsp --email team@nupins.in -d $domain $wwwdomain

systemctl reload nginx

ok "status ok"