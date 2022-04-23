const board = $('#board');
const wallImage = $('#wall');

const URLSearch = new URLSearchParams(location.search);
const tokenId = parseInt(URLSearch.get('id'));

const contractAddr = "0x2C4AA15027b99cA394Cd75558733Ac1fdD7D3Ae6";
const abi = [
    "function getAllNakseo(uint256 _tokenId) view public returns(tuple(address,string)[] memory)"
];

const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
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
