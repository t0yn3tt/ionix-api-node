const jwt = require('jsonwebtoken');
const config = require('../utils/config');
module.exports = (credentials = []) => {
    return (req, res, next) => {
        console.log('Authorization Middleware');
        if (typeof credentials === 'string') {
            credentials = [credentials];
        }

        //busca el token en el header
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send("Acceso Denegado");
        } else {
            //validar el token
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(`JWT Error: ${err}`);
                    return res.status(401).send("Error: Access Denied");
                }
                //no ocurrio ningun error con el token
                //chequear las credenciales
                if (credentials.length > 0) {
                    if (decoded.scopes && decoded.scopes.length && credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)) {
                        next();
                    } else {
                        return res.status(401).send("Error: Access Denied");
                    }
                } else {
                    //no require credenciales, usuario esta autentcado
                    next();
                }
            })
        }
    }
}