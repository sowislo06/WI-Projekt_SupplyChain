#! /bin/bash
#
#
echo "What is the IP address for the API server (default is localhost:3000)?"
read API_URL
API_URL=${API_URL:-https://isprojectbackend.herokuapp.com}
#set -x
# base64 encoded string added for 'admin:adminpw' to authorization header
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Hummels\",\"password\":\"Hummels\",\"usertype\":\"Leitung\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Hummels\",\"password\":\"Hummels\",\"usertype\":\"Leitung\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Jansen\",\"password\":\"Jansen\",\"usertype\":\"Kunde\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Jansen\",\"password\":\"Jansen\",\"usertype\":\"Kunde\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Peters\",\"password\":\"Peters\",\"usertype\":\"Verkauf\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Peters\",\"password\":\"Peters\",\"usertype\":\"Verkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Fuchs\",\"password\":\"Fuchs\",\"usertype\":\"Einkauf\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Fuchs\",\"password\":\"Fuchs\",\"usertype\":\"Einkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Bracht\",\"password\":\"Bracht\",\"usertype\":\"Mitarbeiter\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Bracht\",\"password\":\"Bracht\",\"usertype\":\"Mitarbeiter\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Wessing\",\"password\":\"Wessing\",\"usertype\":\"Qualitätssicherung\"}"'
curl -X POST "${API_URL}/api/register-user" -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"userid\":\"Wessing\",\"password\":\"Wessing\",\"usertype\":\"Qualitätssicherung\"}"
