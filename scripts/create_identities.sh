#! /bin/bash
#
#
echo "What is the IP address for the API server (default is localhost:3000)?"
read API_URL
API_URL=${API_URL:-localhost:3000}
#set -x
# base64 encoded string added for 'admin:adminpw' to authorization header
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Walmart\",\"password\":\"Walmart\",\"usertype\":\"retailer\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Hummels\",\"password\":\"Hummels\",\"usertype\":\"Leitung\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"HEB\",\"password\":\"HEB\",\"usertype\":\"retailer\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Jansen\",\"password\":\"Jansen\",\"usertype\":\"Kunde\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"GHFarm\",\"password\":\"GHFarm\",\"usertype\":\"producer\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Peters\",\"password\":\"Peters\",\"usertype\":\"Verkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"ABFarm\",\"password\":\"ABFarm\",\"usertype\":\"producer\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Fuchs\",\"password\":\"Fuchs\",\"usertype\":\"Einkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"FDA\",\"password\":\"FDA\",\"usertype\":\"regulator\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Bracht\",\"password\":\"Bracht\",\"usertype\":\"Mitarbeiter\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Fedex\",\"password\":\"Fedex\",\"usertype\":\"shipper\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Wessing\",\"password\":\"Wessing\",\"usertype\":\"Qualitätssicherung\"}"
