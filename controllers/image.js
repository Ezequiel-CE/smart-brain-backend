const Clarifai = require('clarifai');

// key para entrar a la app de clarifi

const app = new Clarifai.App({
    apiKey: 'a8b85d76f70c4359aa3afb0fc9db2115'
});

const apiCallHandler = (req, res) => {

    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))

}   

const imageHandler = (req,res,db)=>{
    const {id}= req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    imageHandler: imageHandler,
    apiCallHandler: apiCallHandler
    
}