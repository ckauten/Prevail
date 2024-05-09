module.exports = {
  //starts the home page get request
  getIndex: (req, res) => {
    res.render('index.ejs');
  },
  //renders home page once logged in
  getHome: (req, res) => {
    res.render('home.ejs');
  },
};
