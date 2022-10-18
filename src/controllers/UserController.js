module.exports = {
  doGetUser: (req, res, error) => {
    res.render('index', {
      title: 'Hello'
    });
  }
}