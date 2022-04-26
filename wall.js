const board = $('#board');
const wallImage = $('#wall');

const URLSearch = new URLSearchParams(location.search);
const tokenId = parseInt(URLSearch.get('id'));

const contractAddr = "0x4B2FbEd0CcDea6DfA35C5557Cd670C11922198ED";
const abi = [
    "function getAllNakseo(uint256 _tokenId) view public returns(tuple(address,string)[] memory)"
];

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
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
