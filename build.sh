if [ ! -d 'dist' ]; then
    mkdir dist
fi

cp index.html dist/.
cp wall.js dist/.
cp style.css dist/.
cp -r images dist/.
cp -r library dist/.
