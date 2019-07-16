const cache = {};

exports.generate = () => {
    let key = new Date().getTime().toString();
    cache[key] = {};
    return key;
};

exports.valid = (key) => {
    return !!cache[key];
};

exports.expire = (key) => {
    delete cache[key];
};