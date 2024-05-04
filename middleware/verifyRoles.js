const verifyRoles = (...AllowedRoles) => {    
    return (req, res, next) => {
        if(!req?.roles){
            return res.sendStaus(401)
        }

        const rolesArray = [...AllowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(bool => bool === true)
        if(!result) return res.sendStatus(401) // Unauthorized
        next()
    }
}

module.exports = verifyRoles