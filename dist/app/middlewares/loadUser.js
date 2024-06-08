var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../models/mongoDb/User');
function loadUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.session.userId) {
                const user = yield User.findById(req.session.userId);
                if (user) {
                    req.user = user;
                    res.locals.user = user;
                    console.log('utilisateur connecté');
                }
            }
            next();
        }
        catch (err) {
            res
                .status(500)
                .json({ message: 'Erreur chargement user mw/loadUser' + err });
        }
    });
}
module.exports = loadUser;
