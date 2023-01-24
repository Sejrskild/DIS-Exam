const middlewareNotFound = (req, res) => {
    res.status(404).send('This route does not exist.')
}

export default middlewareNotFound;