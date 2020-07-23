#! /bin/bash
#
# This script runs through a sample scenario of creating Launches, Payloads 
# It then takes a Payload and Launch through the process
#
echo "What is the IP address for the API servers?"
read API_URL
API_URL=${API_URL:-https://isprojectbackend.herokuapp.com}
echo "Do you want to register identities? [y,n]"
read yn
case $yn in
    [[yY] | [yY][Ee][Ss] )
        echo running ./create_identities.sh
        ./create_identities.sh
    ;;
    [nN] | [n|N][O|o] )
	;;
    *) echo "Invalid input"
    exit 1
    ;;
esac
echo "Do you want to enroll identities? [y,n]"
read yn
case $yn in
    [yY] | [yY][Ee][Ss] )
        echo running ./enroll_identities.sh
        ./enroll_identities.sh
    ;;
    [[nN] | [n|N][O|o] ) 
	;;
    *) echo "Invalid input"
    exit 1
    ;;
esac
echo ""
echo "********** Get all identities (admin)"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:admin' added to authorization header
echo ""
curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "${API_URL}/api/users/" 
echo ""
echo ""
echo "********* 'Admin' creates station-0001"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"stationId\":\"station-001\",\"name\":\"Wareneingang\"}" "${API_URL}/api/stations/" 
echo ""
echo "********* 'Admin' views all stations"
echo ""
curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "${API_URL}/api/stations/" 
echo ""
echo ""
echo "********* 'Admin' creates station-0002"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"stationId\":\"station-002\",\"name\":\"Qualitätssicherung\"}" "${API_URL}/api/stations/" 
echo ""
echo "********* 'Admin' views all stations"
echo ""
curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "${API_URL}/api/stations/" 
echo ""
echo ""
echo "********* 'Admin' creates station-0003"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"stationId\":\"station-003\",\"name\":\"Hauptlager\"}" "${API_URL}/api/stations/" 
echo ""
echo "********* 'Admin' views all stations"
echo ""
curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "${API_URL}/api/stations/" 
echo ""
echo ""
echo "********* 'Admin' creates station-0004"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"stationId\":\"station-004\",\"name\":\"Warenausgang\"}" "${API_URL}/api/stations/" 
echo ""
echo "********* 'Admin' views all stations"
echo ""
curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "${API_URL}/api/stations/" 
echo ""
echo ""
echo "********* 'Admin' creates asset-0001"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"assetId\":\"asset-001\",\"name\":\"Fifa 2020\",\"stationId\":\"station-001\"}" "${API_URL}/api/assets/" 
echo "********* 'Admin' creates asset-0002"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"assetId\":\"asset-002\",\"name\":\"iPad\",\"stationId\":\"station-002\"}" "${API_URL}/api/assets/" 
echo "********* 'Admin' creates asset-0003"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"assetId\":\"asset-003\",\"name\":\"Lenovo X2020\",\"stationId\":\"station-003\"}" "${API_URL}/api/assets/" 
echo "********* 'Admin' creates asset-0004"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"assetId\":\"asset-004\",\"name\":\"Samsung TV\",\"stationId\":\"station-004\"}" "${API_URL}/api/assets/" 
echo "********* 'Admin' creates activity-0001"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"activityId\":\"activity-001\",\"name\":\"Umlagerung\",\"assetId\":\"asset-001\",\"stationId\":\"station-002\"}" "${API_URL}/api/activities/" 
echo "********* 'Admin' creates activity-0002"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"activityId\":\"activity-002\",\"name\":\"Umlagerung\",\"assetId\":\"asset-002\",\"stationId\":\"station-003\"}" "${API_URL}/api/activities/" 
echo "********* 'Admin' creates activity-0003"
# base64 encoded string 'YWRtaW46YWRtaW5wdw==' for 'admin:adminpw' added to authorization header
echo ""
curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"activityId\":\"activity-003\",\"name\":\"Umlagerung\",\"assetId\":\"asset-003\",\"stationId\":\"station-004\"}" "${API_URL}/api/activities/" 

















