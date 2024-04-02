document.getElementById('checkButton').addEventListener('click', () => {
    const address = document.getElementById('addressInput').value;
    if (address) {
        fetch(`https://claim.ethena.fi/api/claim?address=${address}`, {
            method: "GET",
            headers: {
                'referer': 'https://claim.ethena.fi/',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.queryWallet.length > 0 && data.queryWallet[0].enaSeasonOneImmediateClaim !== undefined) {
                document.getElementById('result').innerText = `Token yang elig: ${data.queryWallet[0].enaSeasonOneImmediateClaim} ENA`;
            } else {
                document.getElementById('result').innerText = "Wallet tidak eligible atau sudah di-claim!";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerText = "Terjadi kesalahan dalam pengambilan data: " + error.message;
        });
    } else {
        document.getElementById('result').innerText = "Alamat tidak boleh kosong!";
    }
});
