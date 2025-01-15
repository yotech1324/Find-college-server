# The Script needs to do the following
# Backup named, nginx configs
# Add the domain to named
# Reload named
# Add a nginx block


BACKUP_PATH=/backups
#NAMED_CONFIG_FILE=/etc/bind/named.conf.local

# Nginx - new server block
domain=$1

# Backup important files
cp /etc/bind/named.conf.local $BACKUP_PATH/named.conf.local_$(date +"%Y-%m-%d")
# End Backup

# Functions
ok() { echo -e '\e[32m'$1'\e[m'; } # Green
die() { echo -e '\e[1;31m'$domain'\e[m'; exit 1; }


# Sanity check
[ $(id -g) != "0" ] && die "Script must be run as root."
#[ $# != "1" ] && die "Usage: $(basename $0) domainName"


# Variables
#NGINX_AVAILABLE_VHOSTS='/etc/nginx/sites-available'
NGINX_ENABLED_VHOSTS='/etc/nginx/conf.d'

BIND_FILE="/etc/bind/db.$domain"
BIND_CONF=/etc/bind/named.conf.local
# Create Named files

cat > $BIND_FILE <<EOF
; BIND reverse data file for empty rfc1918 zone
\$TTL	86400
\$ORIGIN  $domain.

@	IN	SOA	ns1.nupins.in. hostmaster.$domain. (
			      1		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			  86400 )	; Negative Cache TTL

;@	IN	NS	localhost.
; Nameservers for this domain
@	IN	NS	ns1.nupins.in.
@	IN	NS	ns2.nupins.in.
@	IN	NS	ns3.nupins.in.
@	IN	NS	ns4.nupins.in.
; MX records for the domain
@	IN	MX	10 mail.$domain.
; A records for the domain
www	IN	A	119.18.52.30
@	IN	A	119.18.52.30
*	IN	A	119.18.52.30
EOF

# Add Entry to the Named DB and reload named

cat >> $BIND_CONF <<EOF
zone "$domain" {
	type master;
	file "$BIND_FILE";
	allow-query { any; };

};
EOF

systemctl reload bind9.service

# Create nginx config file
cat > $NGINX_ENABLED_VHOSTS/$domain-vhost.conf <<EOF
### www to non-www

server {
    server_name $domain www.$domain;

    # Required for certbot 	
    location ~ /.well-known/acme-challenge {
         allow all;
    }

	# Proxy connection to port 5000 as per the user.
	location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        }
}
EOF

#checking configuration
nginx -t
service nginx restart

wwwdomain="www.$1"

certbot --nginx --agree-tos --redirect --hsts --staple-ocsp --email team@nupins.in -d $domain $wwwdomain

systemctl reload nginx

ok "status ok"