exports.create = (req, res, next) => {
    res.status(201).json("Persona Creada exitosamente");
};

exports.get = (req, res, next) => {
    /*res.status(200).json({
        posts: [ { title: 'First Post', content: 'This is the first post!' }]
    });*/
    res.status(200).json('Persona creada exitosamente!');
};