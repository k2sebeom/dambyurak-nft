import json
from glob import glob
import sys
import os


ASSET_CID = 'QmRYhypqC7dytXhpfQoEyzpbXqee2ZLi6Cn7YaqJbWe2F2'


if __name__ == "__main__":
    for fpath in glob('metadata/*.json'):
        base_name = os.path.basename(fpath)
        wall_name = os.path.splitext(base_name)[0]
        idx = wall_name.split('-')[1]
        with open(fpath, 'r') as f:
            metadata = json.loads(f.read())
        metadata['name'] = f'Dambyurak #{idx}'
        metadata['description'] = 'Stone Wall on which people can write comments'
        metadata['image'] = f'ipfs://{ASSET_CID}/images/{wall_name}.png'
        metadata['animation_url'] = f'ipfs://{ASSET_CID}?id={idx}'
        
        with open(fpath, 'w') as f:
            f.write(json.dumps(metadata, indent=4))
