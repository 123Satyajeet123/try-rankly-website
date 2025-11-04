#!/bin/bash

# SSL Certificate Verification Script for tryrankly.com

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOMAIN="tryrankly.com"
CERT_PATH="/etc/letsencrypt/live/tryrankly.com"

echo "🔐 Verifying SSL Certificates for $DOMAIN"
echo "=========================================="
echo ""

# Check if certificate directory exists
echo "1. Checking certificate directory..."
if [ -d "$CERT_PATH" ]; then
    echo -e "${GREEN}✓ Directory exists: $CERT_PATH${NC}"
else
    echo -e "${RED}✗ Directory not found: $CERT_PATH${NC}"
    exit 1
fi

echo ""
echo "2. Checking certificate files..."

# Check fullchain.pem
if [ -f "$CERT_PATH/fullchain.pem" ]; then
    echo -e "${GREEN}✓ fullchain.pem exists${NC}"
    FULLCHAIN_SIZE=$(stat -c%s "$CERT_PATH/fullchain.pem" 2>/dev/null || stat -f%z "$CERT_PATH/fullchain.pem" 2>/dev/null)
    echo "  Size: $FULLCHAIN_SIZE bytes"
else
    echo -e "${RED}✗ fullchain.pem not found${NC}"
    exit 1
fi

# Check privkey.pem
if [ -f "$CERT_PATH/privkey.pem" ]; then
    echo -e "${GREEN}✓ privkey.pem exists${NC}"
    PRIVKEY_SIZE=$(stat -c%s "$CERT_PATH/privkey.pem" 2>/dev/null || stat -f%z "$CERT_PATH/privkey.pem" 2>/dev/null)
    echo "  Size: $PRIVKEY_SIZE bytes"
else
    echo -e "${RED}✗ privkey.pem not found${NC}"
    exit 1
fi

# Check chain.pem (optional)
if [ -f "$CERT_PATH/chain.pem" ]; then
    echo -e "${GREEN}✓ chain.pem exists${NC}"
else
    echo -e "${YELLOW}⚠ chain.pem not found (optional)${NC}"
fi

# Check cert.pem (optional)
if [ -f "$CERT_PATH/cert.pem" ]; then
    echo -e "${GREEN}✓ cert.pem exists${NC}"
else
    echo -e "${YELLOW}⚠ cert.pem not found (optional)${NC}"
fi

echo ""
echo "3. Verifying certificate validity and domain..."

# Extract certificate details
CERT_DOMAINS=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -text -noout 2>/dev/null | grep -A 1 "Subject Alternative Name" | grep DNS | sed 's/.*DNS://g' | tr ',' '\n' | sed 's/^ *//' | tr -d ' ')

if [ -z "$CERT_DOMAINS" ]; then
    # Try alternative method
    CERT_DOMAINS=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -text -noout 2>/dev/null | grep -E "DNS:|Subject:" | grep -oE "DNS:[^,]+|CN=[^,]+" | sed 's/DNS://g' | sed 's/CN=//g' | tr ',' '\n' | sed 's/^ *//' | tr -d ' ')
fi

echo "Certificate domains:"
echo "$CERT_DOMAINS" | while read domain; do
    if [ "$domain" == "$DOMAIN" ] || [ "$domain" == "www.$DOMAIN" ]; then
        echo -e "  ${GREEN}✓ $domain${NC}"
    else
        echo -e "  ${YELLOW}  $domain${NC}"
    fi
done

# Check if our domain is in the list
if echo "$CERT_DOMAINS" | grep -q "^$DOMAIN$"; then
    echo -e "${GREEN}✓ Certificate contains $DOMAIN${NC}"
else
    echo -e "${RED}✗ Certificate does NOT contain $DOMAIN${NC}"
    echo "Found domains: $CERT_DOMAINS"
fi

echo ""
echo "4. Certificate validity period..."

# Get validity dates
VALID_FROM=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -startdate 2>/dev/null | cut -d= -f2)
VALID_TO=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -enddate 2>/dev/null | cut -d= -f2)

echo "  Valid from: $VALID_FROM"
echo "  Valid until: $VALID_TO"

# Check if certificate is expired
CURRENT_DATE=$(date +%s)
EXPIRE_DATE=$(date -d "$VALID_TO" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$VALID_TO" +%s 2>/dev/null)

if [ "$EXPIRE_DATE" -gt "$CURRENT_DATE" ]; then
    DAYS_LEFT=$(( ($EXPIRE_DATE - $CURRENT_DATE) / 86400 ))
    if [ "$DAYS_LEFT" -gt 30 ]; then
        echo -e "  ${GREEN}✓ Certificate is valid (expires in $DAYS_LEFT days)${NC}"
    elif [ "$DAYS_LEFT" -gt 7 ]; then
        echo -e "  ${YELLOW}⚠ Certificate expires in $DAYS_LEFT days (consider renewal)${NC}"
    else
        echo -e "  ${RED}✗ Certificate expires in $DAYS_LEFT days (URGENT - renew soon!)${NC}"
    fi
else
    echo -e "  ${RED}✗ Certificate is EXPIRED!${NC}"
fi

echo ""
echo "5. Certificate issuer..."

ISSUER=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -issuer 2>/dev/null | cut -d= -f2-)
echo "  Issuer: $ISSUER"

if echo "$ISSUER" | grep -q "Let's Encrypt"; then
    echo -e "  ${GREEN}✓ Valid Let's Encrypt certificate${NC}"
else
    echo -e "  ${YELLOW}⚠ Not a Let's Encrypt certificate${NC}"
fi

echo ""
echo "6. Certificate fingerprint..."

FINGERPRINT=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -fingerprint -sha256 2>/dev/null | cut -d= -f2)
echo "  SHA256 Fingerprint: $FINGERPRINT"

echo ""
echo "7. Checking certificate and key match..."

# Extract public key from certificate
CERT_PUBKEY=$(sudo openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -pubkey 2>/dev/null | openssl md5)
# Extract public key from private key
PRIVKEY_PUBKEY=$(sudo openssl rsa -in "$CERT_PATH/privkey.pem" -pubout 2>/dev/null | openssl md5)

if [ "$CERT_PUBKEY" == "$PRIVKEY_PUBKEY" ]; then
    echo -e "${GREEN}✓ Certificate and private key match${NC}"
else
    echo -e "${RED}✗ Certificate and private key DO NOT match!${NC}"
fi

echo ""
echo "8. Testing SSL connection..."

# Test SSL connection
if command -v openssl &> /dev/null; then
    echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | grep -E "Verify return code|subject=|issuer=" | head -5 || echo "Could not test SSL connection"
fi

echo ""
echo "=========================================="
echo "✅ SSL Certificate Verification Complete"
echo ""
echo "Summary:"
echo "  - Certificate path: $CERT_PATH"
echo "  - Domain: $DOMAIN"
echo "  - Check all outputs above for ✓ (good) or ✗ (issues)"

