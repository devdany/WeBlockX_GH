
const auth = {
    createCode: () => {
        var result = '';
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i<6; i++){
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return result;
    }
}

module.exports = auth;