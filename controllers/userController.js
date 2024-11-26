const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const { isLoggedIn, isAdmin } = require('../middlewares/auth');

exports.createNewUser = async (req, res) => {
  const { userName, userSurname, userEmail, userPassword } = req.body;

  if (!userName || !userSurname || !userEmail || !userPassword) {
    return res.status(301).redirect('/register?message=error');
  }

  if (
    userPassword.length < 8 ||
    !/[A-Z]/.test(userPassword) ||
    !/[a-z]/.test(userPassword) ||
    !/[0-9]/.test(userPassword) ||
    /(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(userPassword)
  ) {
    return res.status(301).redirect('/register?message=invalid-password');
  }

  const user = new User(userName, userSurname, userEmail, userPassword);
  try {
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);
    user.userPassword = hashedUserPassword;
    await User.createUser(user);
    return res.status(301).redirect('/login?message=success-newuser');
  } catch (err) {
    console.error('Kullanıcı oluşturulurken hata meydana geldi, ', err.message);
    return res
      .status(301)
      .redirect(`/register?message=${err.message === 'registered-email' ? 'registered-email' : 'error'}`);
  }
};

exports.loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await User.getUserByEmail(userEmail);
    if (user) {
      const isValid = await bcrypt.compare(userPassword, user.password);
      if (isValid) {
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.role = user.role;
        return res.status(301).redirect('account');
      } else return res.status(301).redirect('/login?message=invalid');
    } else return res.status(301).redirect('/login?message=user-notfound');
  } catch (err) {
    console.error('Kullanıcı bilgisi alınamadı, ', err.message);
    return res.status(301).redirect('/login?message=error');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.status(301).redirect('/login');
  });
};

exports.getLoginPage = (req, res) => {
  if (req.session.userId) {
    return res.status(301).redirect('account');
  }
  res.render('login', { title: 'Giriş Yap', query: req.query || {} });
};

exports.getRegisterPage = (req, res) => {
  if (req.session.userId) {
    return res.status(301).redirect('account');
  }
  res.render('register', { title: 'Üye Ol', query: req.query || {} });
};

exports.getAccountPage = async (req, res) => {
  try {
    const user = await User.getUserByID(req.session.userId);
    res.render('account', { title: 'Hesabım', user: user, query: req.query || {} });
  } catch (err) {}
};

exports.changeUserData = async (req, res) => {
  try {
    const { userName, userSurname } = req.body;
    await User.setUserName(req.session.userId, userName);
    await User.setUserSurname(req.session.userId, userSurname);
    res.json({ message: 'Profil bilgileri başarıyla güncellendi', userName, userSurname });
  } catch (err) {}
};

exports.changeUserAvatar = async (req, res) => {
  try {
    const { userAvatarValue } = req.body;
    const user = await User.getUserByID(req.session.userId);
    await User.setUserAvatar(req.session.userId, userAvatarValue);
    res.json({ message: 'Profil avatarı başarıyla güncellendi', userAvatarValue });
  } catch (err) {}
};

exports.changeUserPassword = async (req, res) => {
  try {
    const { userPassword, userNewPassword } = req.body;

    if (userPassword && userNewPassword) {
      if (
        userNewPassword.length < 8 ||
        !/[A-Z]/.test(userNewPassword) ||
        !/[a-z]/.test(userNewPassword) ||
        !/[0-9]/.test(userNewPassword) ||
        /(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321|210)/.test(userNewPassword)
      ) {
        return res.status(301).redirect('/register?message=invalid-password');
      }

      if (userPassword.toLowerCase() === userNewPassword.toLowerCase()) {
        return res.status(301).redirect('/register?message=same-password');
      }
      const user = await User.getUserByID(req.session.userId);
      const isValid = await bcrypt.compare(userPassword, user.password);

      if (isValid) {
        const hashedUserPassword = await bcrypt.hash(userNewPassword, 10);
        await User.setUserPassword(req.session.userId, hashedUserPassword);
        return res.status(301).redirect('/account?message=success');
      } else {
        return res.status(301).redirect('/account?message=wrong-password');
      }
    } else throw err;
  } catch (err) {
    console.error('Değişikler kaydedilemedi, ', err.message);
    return res.status(301).redirect('/account?message=error');
  }
};

exports.deleteUserByID = async (req, res) => {
  try {
    const { deleteUserByPassword } = req.body;
    const user = await User.getUserByID(req.session.userId);
    const isValid = await bcrypt.compare(deleteUserByPassword, user.password);
    if (isValid) {
      await User.deleteUser(req.session.userId);
      req.session.destroy((err) => {
        if (err) throw err;
        res.status(301).redirect('/login?message=success-delete');
      });
    } else {
      res.status(301).redirect('/account?message=notmatch-password');
    }
  } catch (err) {
    console.error('Hesap silinirken hata meydana geldi, ', err.message);
    res.status(301).redirect('/login?message=error-delete');
  }
};
