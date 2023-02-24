const isSupportWebp =
  document
    .createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') == 0
    ? true
    : false;

const update = (el, binding) => {
  var attr = binding.arg || 'src',
    value = binding.value;

  //웹팩 설정으로 인해 src가 data: 형식일때
  if (value.indexOf('data:image') > -1) {
    setImg(el, attr, value);
  } else {
    setImg(el, attr, value, true);
  }
};

function setImg(el, attr, src, replace) {
  let webp = src;
  if (replace && isSupportWebp) {
    const regExp = /\.(png|jpe?g|gif)(\?.*)?$/;

    webp = src.replace(regExp, '.webp');
    onErrorLoadWebp(el, attr, webp, src);
  }
  if (attr === 'bg') {
    el.style.backgroundImage = 'url(' + webp + ')';
  } else {
    el.setAttribute(attr, webp);
  }
}

function onErrorLoadWebp(el, attr, src, originUrl) {
  let img = new Image();
  img.src = src;
  img.onerror = () => {
    setImg(el, attr, originUrl);
    img = null;
  };
}

var vueWebp = {
  install(Vue) {
    Vue.directive('webp', {
      inserted(el, binding) {
        update(el, binding);
      },

      componentUpdated(el, binding) {
        if (binding.value !== binding.oldValue) {
          update(el, binding);
        }
      },
    });
  },
};
if (typeof exports == 'object') {
  module.exports = vueWebp;
} else if (typeof define == 'function' && define.amd) {
  define([], function () {
    return vueWebp;
  });
} else if (window.Vue) {
  window.VueWebp = vueWebp;
  Vue.use(vueWebp);
}
