import cv2
import random
import sys
import numpy as np
import json


NFT_URL = 'https://k2sebeom.github.io/dambyurak-nft'


if __name__ == "__main__":
    count = int(sys.argv[1])
    MASK = cv2.imread('MASK.png', 0) / 255
    MASK = MASK[:, :, np.newaxis]
    for i in range(count):
        COLOR = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        WALL = np.concatenate((MASK * COLOR[0], MASK * COLOR[1], MASK * COLOR[2]), axis=2).astype(np.uint8)
        cv2.imwrite(f'images/WALL-{i + 1}.png', WALL)
        metadata = {
            'name': f'Dambyurak #{i + 1}',
            'description': 'Stone Wall on which people can write comments',
            'image': f'{NFT_URL}/images/WALL-{i + 1}.png',
            'animation_url': f'{NFT_URL}?id={i + 1}',
            "attributes": [
                {
                    "trait_type": "COLOR",
                    "value": f"RGB{COLOR[::-1]}"
                }
            ]
        }
        with open(f'metadata/WALL-{i+1}.json', 'w') as f:
            f.write(json.dumps(metadata, indent=4))
        with open(f'assetdata/WALL-{i+1}.json', 'w') as f:
            f.write(json.dumps(metadata, indent=4))
