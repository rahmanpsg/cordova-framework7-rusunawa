let app = new Framework7({
  root: '#app',
  name: 'Rusunawa',
  id: 'com.skripsi.rusunawa',
  // theme: 'ios',
  panel: {
    swipe: 'left'
  },
  view: {
    stackPages: true
  },
  statusbar: {
    androidOverlaysWebView: true,
    // androidBackgroundColor: '#42ddf5',
    androidTextColor: 'white'
  },
  // Add default routes
  routes: [{
    path: '/login/',
    componentUrl: './pages/login.html',
  }, {
    path: '/registrasi/',
    componentUrl: './pages/registrasi.html',
  }, {
    path: '/',
    componentUrl: './pages/home.html',
  }, {
    path: '/kamar/',
    componentUrl: './pages/kamar.html',
  }, {
    name: 'mendaftar',
    path: '/mendaftar/:id_kamar/',
    componentUrl: './pages/mendaftar.html',
  }, {
    path: '/pembayaran/:id/',
    componentUrl: './pages/pembayaran.html',
  }],
});


const ls = app.loginScreen.create({
  el: '#my-login-screen'
})

ls.open()

let $$ = Dom7;

const URL = 'http://192.168.43.78/rusunawa-server/api/';
// const URL = 'http://rusunawa-umpar.000webhostapp.com/api/';

// localStorage.clear()
// localStorage.setItem('uid', 1)
let nim = localStorage.getItem('nim')
let kategori = localStorage.getItem('kategori')
let nama = localStorage.getItem('nama')


if (navigator.connection.type == 'none') {
  app.dialog.alert('Anda tidak memiliki koneksi internet', 'Informasi');
}

function cekLogin(isSignedIn) {
  if (isSignedIn) {
    ls.close()
    app.views.create('.view-main', {
      url: '/',
      name: 'home',
    })
  }
}

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function onDeviceReady() {
  cekLogin(localStorage.getItem('hasLogin') === 'true');
}


let opened = 0;

function exitApp() {
  if (opened > 0) {
    return false;
  } else {
    app.dialog.confirm('Aplikasi akan ditutup?', 'Informasi',
      function () {
        navigator.app.exitApp();
      },
      function () {
        opened = 0;
        return false;
      }
    );
    opened = 1;
  }
}

function onBackKeyDown(e) {
  // Handle the back button  
  if (ls.opened) {
    exitApp();
    e.preventDefault();
    return
  }

  if ($$('.modal-in').length > 0) {
    app.sheet.close('.modal-in')
  } else if (app.views.current.history.length == 1 && app.views.current.history[0] == '/') {
    if (app.views.current.main) {
      exitApp();
      e.preventDefault();
    } else {
      app.tab.show('#view-home')
    }
  } else if (app.views.current.history.length == 4) {
    app.views.home.router.back('/', {
      force: true
    })
  } else {
    app.dialog.close();
    app.views.current.router.back();
    return false;
  }
}