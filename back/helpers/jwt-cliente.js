var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'diego202';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        tipo: user.tipo,
        iat: moment().unix(),
        exp: moment().add(1,'day').unix(),
    }

    return jwt.encode(payload,secret);
}