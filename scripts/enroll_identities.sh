#! /bin/bash
#
# This script runs through a sample scenario of creating Launches, Payloads 
# It then takes a Payload and Launch through the process
#
echo "What is the IP address for the API server (default is localhost:3000)?"
read API_URL
API_URL=${API_URL:-https://isprojectbackend.herokuapp.com}
# base64 encoded string 'userid:userpwd' added for authorization header
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic SHVtbWVsczpIdW1tZWxz" -H "Content-Type: application/json" -d "{\"usertype\":\"Leitung\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic SHVtbWVsczpIdW1tZWxz" -H "Content-Type: application/json" -d "{\"usertype\":\"Leitung\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic SmFuc2VuOkphbnNlbg==" -H "Content-Type: application/json" -d "{\"usertype\":\"Kunde\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic SmFuc2VuOkphbnNlbg==" -H "Content-Type: application/json" -d "{\"usertype\":\"Kunde\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic UGV0ZXJzOlBldGVycw==" -H "Content-Type: application/json" -d "{\"usertype\":\"Verkauf\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic UGV0ZXJzOlBldGVycw====" -H "Content-Type: application/json" -d "{\"usertype\":\"Verkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic RnVjaHM6RnVjaHM=" -H "Content-Type: application/json" -d "{\"usertype\":\"Einkauf\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic RnVjaHM6RnVjaHM=" -H "Content-Type: application/json" -d "{\"usertype\":\"Einkauf\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic QnJhY2h0OkJyYWNodA==" -H "Content-Type: application/json" -d "{\"usertype\":\"Mitarbeiter\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic QnJhY2h0OkJyYWNodA==" -H "Content-Type: application/json" -d "{\"usertype\":\"Mitarbeiter\"}"
echo ""
echo ""
echo 'curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic V2Vzc2luZzpXZXNzaW5n" -H "Content-Type: application/json" -d "{\"usertype\":\"Qualitätssicherung\"}"'
curl -X POST "${API_URL}/api/enroll-user" -H "authorization: Basic V2Vzc2luZzpXZXNzaW5n" -H "Content-Type: application/json" -d "{\"usertype\":\"Qualitätssicherung\"}"
