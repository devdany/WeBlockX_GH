function pad(number, length) {

    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}

const dateFormat = {
    convertToSave: (date) => {
        var yyyy = date.getFullYear().toString();
        var MM = pad(date.getMonth() + 1, 2);
        var dd = pad(date.getDate(), 2);
        var hh = pad(date.getHours(), 2);
        var mm = pad(date.getMinutes(), 2)
        var ss = pad(date.getSeconds(), 2)

        return yyyy + MM + dd + hh + mm + ss;
    },
    convertToRender: (type, date) => {
        if(type === 'yyyy-mm-dd'){
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);

            return year+'-'+month+'-'+day
        } else if(type === 'usd'){
            return '';
        } else if(type === 'yyyy-mm-dd hh:mm'){
            return '';
        } else {
            throw new Error('it is not support format');
        }
    },
    timestampToDate: (timestamp) => {
        return dateFormat.convertToSave(new Date(timestamp*1000));
    }
}

module.exports = dateFormat;