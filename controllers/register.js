const handleRegister = (req,res,db,bcrypt) =>{
    const {name,email,password} = req.body;

    //validacion de los datos
    if(!name || !email || !password){
       return res.status(400).json('incorrect form submition');
    }

    const hash = bcrypt.hashSync(password);
    
    //creando la transaccion en caso de que algo falle,falle en general
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
        //metodo de knex para insertar en tabla 
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name : name,
                    joined : new Date()
                })
                .then(user=>{
                    res.json(user[0])
                })
        })
    .then(trx.commit)
    .catch(trx.rollback)
    })
    
    
    .catch(err => res.status(400).json('unable to register'))

    
}

module.exports = {
handleRegister : handleRegister
}