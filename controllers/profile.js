const profileHandler = (req,res,db)=>{
    const {id}= req.params;
    db.select('*').from('users').where({
        id : id
    })
    .then(user =>{
        if (user.length){
            res.json(user[0])
        } else {
            return res.status(404).json('no se encontro')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
    
}

module.exports = {
    profileHandler: profileHandler
}