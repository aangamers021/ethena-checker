document.getElementById('checkButton').addEventListener('click', () => {
    const address = document.getElementById('addressInput').value;
    if (address) {
        fetch(`https://claim.ethena.fi/api/claim?address=${address}`, {
            method: "GET",
            headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'referer': 'https://claim.ethena.fi/',
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
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
