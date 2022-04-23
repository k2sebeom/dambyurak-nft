# Dambyurak NFT


### Before you do this...

1. Deploy your contract to chain
1. Get the contract address
1. Update values from wall.js first

### How to prepare NFT assets

First, to sync github assets and the actual NFT assets, clean up the repo
```
./clean.sh
git add images assetdata
git commit -m "Clean assets"
git push
```

Generate metadata and images for nft and sync with repo
```
python3 generate_images.py <Number of Assets to create>
git add images assetdata
git commit -m "Generate assets"
git push
```

Make assets that need to be uploaded to IPFS
```
./build.sh
```
It will create dist directory.

Upload the dist folder to IPFS and get CID

Replace ASSET_CID by the actual CID of your asset.

Run to generate metadata

```
python3 generate_metadata.py
```

Upload the metadata folder to IPFS to use it as tokenURI

