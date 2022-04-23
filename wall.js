const board = $('#board');
const wallImage = $('#wall');

const URLSearch = new URLSearchParams(location.search);
const tokenId = parseInt(URLSearch.get('id'));

const contractAddr = "0x94681182d532400249342A7A98998B24Fa4F17Ad";
const abi = [
    "function getAllNakseo(uint256 _tokenId) view public returns(tuple(address,string)[] memory)"
];

const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:8545');
const contract = new ethers.Contract(contractAddr, abi, provider);

async function fetchMsgs() {
    const msgs = await contract.getAllNakseo(tokenId);
    board.empty();

    for(const msg of msgs) {
        board.append($(`
            <div class="nakseo">
                <p>${msg[1]}</p>
                <i>by ${msg[0]}</i>
            </div>
        `))
    }
}

wallImage.attr('src', `images/WALL-${tokenId}.png`);

fetchMsgs().then(() => {
    console.log("Message loaded");
});

setInterval(fetchMsgs, 10000);
