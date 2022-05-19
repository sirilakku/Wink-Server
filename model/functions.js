function welcome(req,res) {
    res.send(
        `<h1>Welcome Page</h1>`
    )
}

module.exports = {welcome}