function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

console.log(getRandomNumber());

module.exports = getRandomNumber;
