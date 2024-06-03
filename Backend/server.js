const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Middleware to parse JSON query parameter
app.use((req, res, next) => {
    if (req.query.json) {
        try {
            req.jsonData = JSON.parse(req.query.json);
        } catch (e) {
            return res.status(400).send('Invalid JSON');
        }
    }
    next();
});

// Generate a pair of keys (public and private)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// Endpoint to get signature
app.get('/get_lisk_signature', (req, res) => {
    if (!req.jsonData || !req.jsonData.key) {
        return res.status(400).send('Missing "key" in JSON');
    }

    const key = req.jsonData.key;

    // Sign the data
    const sign = crypto.createSign('SHA256');
    sign.update(key);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');

    const response = {
        route: 'get_lisk_signature',
        signature: signature
    };
    res.json(response);
});



// Endpoint to verify signature
app.get('/verify_lisk_signature', (req, res) => {
    if (!req.query.json || !req.query.signature) {
        return res.status(400).send('Missing JSON or Signature in query parameters');
    }

    const jsonData = JSON.parse(req.query.json);
    const signature = req.query.signature;

    // Verify the signature
    const verify = crypto.createVerify('SHA256');
    verify.update(jsonData.key);
    verify.end();
    const isValid = verify.verify(publicKey, signature, 'hex');

    const response = {
        route: 'verify_lisk_signature',
        isValid: isValid
    };
    res.json(response);
});








app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//get signature
//http://localhost:3000/get_lisk_signature?json={%22key%22:%22my_secure_key_value%22}

//verify signature
//http://localhost:3000/verify_lisk_signature?json={%22key%22:%22my_secure_key_value%22}&signature=1913d5587348cda189ccb6941b607daff9e4debd765b01887707315b53eda6c6d34ea3a85780a19e9cef620fb2cf24226e91e5775e723aee01e04cb3c05cf1e9c008dc56f55147c3b927e0ab382ab0512e479f514c138eb4aa3165ba066f40f735df30d1f3cc7afe2da1d4b7a9b44913e2c19369a82c6ee3e7c46460987efb91a458640581b68f3af47e1e56a38836ace835cdee3559a38d0bf079cd3f1486382837b03aef6999c020b4f69ab9e220ccd089deb6a897f43895acbeff4cf19c0c4626bb2f384300f7712a97e0c7035af1b5327881aeb230e42098dc0572f2724769319dd1456be4b23c286fe99152dbc018e0714359c1a0771e5903ccd422aada