var stopBodyScroll = null;

$(function () {

  stopBodyScroll = initBodyScroller();

  // ------------------------------------------------------------
  // 兌換商品：點擊"我要兌換"按鈕
  $('.product_group .btn').click(function () {
    $(".section_complete").hide();
    $(".section_form").show();
    footerChange();
    $('html, body').animate({ scrollTop: $('.section_form').offset().top }, 300);
  })

  $(window).resize(function () {
    footerChange();
  })

  function footerChange() {
    if ($(window).innerWidth() > 800) {
      if (
        $('#section_form_1').css("display") === "block" ||
        $('#section_form_2').css("display") === "block" ||
        $('#section_form_3').css("display") === "block" ||
        $('.section_form').css("display") === "block" ||
        $(".section_complete").css("display") === "block") {
        $(".section_footer").addClass("active");
      } else {
        $(".section_footer").removeClass("active");
      }
    } else {
      $(".section_footer").removeClass("active");
    }
  }

  // ------------------------------------------------------------
  // 領取資料：點擊確認送出
  $('.confirm').click(function (e) {
    checkform();
  })

  // ------------------------------------------------------------
  // 檢查領取資料表格
  function checkform() {

    let errormsg = '';
    let returnValue = true;

    // 檢查收件人資料
    let info = $('input[name="info"]:checked').val();
    if (info == undefined) {
      errormsg = '請勾選收件人資料';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      return false;
    }

    // 檢查姓名
    let name = $('#name').val();
    // let nameLength = name.length;
    let nameRegexp = /^[\u4e00-\u9fa5]+$/i;
    if (name == '') {
      errormsg = '請填寫姓名';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#name').focus();
      return false;
    }
    if (nameRegexp.test(name) != true) {
      errormsg = '請填寫真實姓名';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#name').focus();
      return false;
    }

    // 檢查行動電話
    let phone = $('#phone').val();
    // let phoneLength = phone.length;
    let phoneRegexp = /^09[0-9]{2}[0-9]{6}$/;
    if (phone == '') {
      errormsg = '請填寫手機號碼';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#phone').focus();
      return false;
    }
    if (phoneRegexp.test(phone) != true) {
      errormsg = '電話號碼格式填寫錯誤';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#phone').focus();
      return false;
    }

    // 檢查電子信箱
    let email = $('#email').val();
    // let emailLength = email.length;
    let emailRegexp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    if (email == '') {
      errormsg = '請填寫電子信箱';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#email').focus();
      return false;
    }
    if (emailRegexp.test(email) != true) {
      errormsg = '電子信箱格式填寫錯誤';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#email').focus();
      return false;
    }

    // 檢查寄送方式
    let send = $('input[name="send"]:checked').val();
    if (send == undefined) {
      errormsg = '請勾選寄送方式';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      return false;
    }

    // 檢查指定領取專櫃
    if ($('select[name="city"]').val() == '0') {
      errormsg = '請選擇領取縣市';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('select[name="city"]').focus();
      return false;
    }
    if ($('select[name="counter"]').val() == '0') {
      errormsg = '請選擇領取專櫃';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('select[name="counter"]').focus();
      return false;
    }

    // 檢查宅配地址
    let address = $('#address').val();
    let addressRegexp = /[\u4e00-\u9fa5]/;
    if (address == '') {
      errormsg = '請填寫宅配地址';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#address').focus();
      return false;
    }
    if (addressRegexp.test(address) != true) {
      errormsg = '請填寫正確宅配地址';
      returnValue = false;
    }
    if (returnValue == false) {
      alert(errormsg);
      $('#address').focus();
      return false;
    }

    // 表格資料
    let formData = {};
    if (returnValue == true) {
      formData.info = $('input[name="info"]:checked').val();
      formData.name = $("#name").val();
      formData.phone = $("#phone").val();
      formData.email = $("#email").val();
      formData.send = $('input[name="send"]:checked').val();
      formData.city = $('select[name="city"]').val();
      formData.counter = $('select[name="counter"]').val();
      formData.address = $('#address').val();

      $('.section_form .confirm').on('click', function () {
        showPopup('#popup-point');
      });
    } else {
      return false;
    }

  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // 已完成兌禮表格出現
  // showComplete();
  function showComplete() {
    $(".section_form").hide();
    $(".section_complete").show();
    footerChange();
  }

  // ------------------------------------------------------------
  // 跳窗
  $('.popup-close').on('click', closePopup);

  $('.check-btn').on('click', function () {
    alert('驗證碼輸入錯誤');
  });

  $('.cancle-btn').on('click', closePopup);

});

function showPopup(el) {
  if (!$(el).length) return;
  stopBodyScroll.fixedBody();
  $(el).stop().fadeIn().scrollTop(0);
}

function closePopup() {
  stopBodyScroll.scrollBody();
  $('.popup').hide();
}

// body固定
function initBodyScroller() {
  var StopBodyScroll = (function () {
    var instance = null;
    function StopBodyScroll() {
      this.pageTop = 0;
      this.body = document.body;
      this.html = document.getElementById('main-html');
    }
    StopBodyScroll.prototype.fixedBody = function () {
      this.pageTop = window.scrollY;
      this.html.style.height = window.screen.availHeight + 'px';
      this.body.style.position = 'fixed';
      this.body.style.top = -this.pageTop + 'px';
      this.body.style.overflow = 'hidden';
    };
    StopBodyScroll.prototype.scrollBody = function () {
      this.html.style.height = 'auto';
      this.body.style.position = '';
      this.body.style.top = '';
      this.body.style.overflow = 'auto';
      window.scrollTo(0, this.pageTop);
    };
    return function () {
      if (!instance) {
        instance = new StopBodyScroll();
      }

      return instance;
    };
  })();
  return new StopBodyScroll();
}