import jwt from 'jsonwebtoken';

// String Tweak Functions
export const trimString = (x) => {
    return x.replace(/^\s+|\s+$/gm, '');
};

export const isEmpty = (values) => {
    let isAllFilled = values.every((x) => trimString(x) != '');
    let isFilled = values.every((x) => x != 'undefined');
    return !isAllFilled || !isFilled ? true : false;
};

//Time Function(s)
export const currentTimestamp = (_) => {
    let timestamp = Math.round(Date.now() / 1000);
    return timestamp;
};

//Token Decode & Verify Function
export const decodeJWToken = (token, type) => {
    const decode = jwt.decode(token);
    const userId = decode[type];
    return userId;
};

export const verifyJWToken = async(token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken) {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
};