
# ls /root
explorer  fabric-samples  mycc-final  setup_agent.sh

# Clean up
docker rm -f $(docker ps -a | grep mycc | awk '{print $1}')
docker rmi -f $(docker images | grep mycc | awk '{print $3}')

# Check what's currently committed
export FABRIC_CFG_PATH=$PWD/../config
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

../bin/peer lifecycle chaincode querycommitted --channelID mychannel

# Stop the network
./network.sh down

# Start fresh
./network.sh up createChannel -ca

Deploy the Final Version
#cd /root/fabric-samples/test-network

# Deploy with new sequence number
./network.sh deployCC -ccn mycc -ccp /root/mycc-final -ccl javascript -ccv 1.0 -ccs 1

Check Results
# docker ps | grep mycc

# If running, check logs
docker logs $(docker ps | grep mycc | awk '{print $1}')

TESTING:

export FABRIC_CFG_PATH=$PWD/../config
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

Initialize ledger:

../bin/peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" \
  -C mychannel \
  -n mycc \
  --peerAddresses localhost:7051 \
  --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" \
  --peerAddresses localhost:9051 \
  --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" \
  -c '{"function":"initLedger","Args":[]}'


  Query asset:
  ../bin/peer chaincode query -C mychannel -n mycc -c '{"function":"getAllAssets","Args":[]}'

  Read an asset:
  ../bin/peer chaincode query -C mychannel -n mycc -c '{"function":"readAsset","Args":["asset1"]}'

create asset:
../bin/peer chaincode invoke -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" \
  -C mychannel \
  -n mycc \
  --peerAddresses localhost:7051 \
  --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" \
  --peerAddresses localhost:9051 \
  --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" \
  -c '{"function":"createAsset","Args":["asset3","yellow","10","Alice","500"]}'


  query new asset:
  ../bin/peer chaincode query -C mychannel -n mycc -c '{"function":"readAsset","Args":["asset3"]}'
  
