var obj;
var keygather = "";

$(document).ready(function () {
  var numberdigit = $(".numberdigit").position();
  var holder = $(".holder").position();
  var expire = $(".expire").position();

  numberdigit["height"] = $(".numberdigit").height();
  holder["height"] = $(".holder").height();
  expire["height"] = $(".expire").height();

  numberdigit["width"] = $(".numberdigit").width();
  holder["width"] = $(".holder").width();
  expire["width"] = $(".expire").width();

  obj = { numberdigit: numberdigit, holder: holder, expire: expire };
  $(".border").css({ height: $(".card").height(), width: $(".card").width() });
});

$(".holder").click(function (e) {
  event.stopPropagation();
  var name = e.currentTarget.className;
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top - 6 + "px"}`,
    left: `${obj[name].left - 6 + "px"}`
  });
});
$(".numberdigit").click(function (e) {
  event.stopPropagation();
  var name = e.currentTarget.className;
  var margin = Number(
    $(".numberdigit")
      .css("margin-top")
      .match(/\d*\.?\d+/g)[0]
  );
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top + margin + "px"}`,
    left: `${obj[name].left + "px"}`
  });

  //  $('.border').animate({height:"49px",width:'384px',opacity:'1',top:`${38.469+69.4687}px` ,left:'21px'});
});
$(".expire").click(function (e) {
  event.stopPropagation();
  var name = e.currentTarget.className;

  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top - 6 + "px"}`,
    left: `${obj[name].left - 6 + "px"}`
  });
});
$(".card").click(function (e) {
  event.stopPropagation();

  $(".border").animate({
    height: $(".card").height() + "px",
    width: $(".card").width() + "px",
    opacity: "0",
    top: "0",
    left: "0"
  });
});
$(".cardnumberinput").keydown(function (e) {
  var checknumber = Number(e.key) ? true : false;
  if (e.key == "Backspace") {
    if (window.getSelection() == "") {
    } else {
      event.preventDefault();
      return;
    }
    var lengthofvalue = e.currentTarget.value.length;
    if (lengthofvalue == 13 || lengthofvalue == 10 || lengthofvalue == 15) {
      e.currentTarget.value += "";
    }
    var s = keygather.slice(0, keygather.length - 1);

    keygather = s;
    updown(e);
    return;
  }
  if (checknumber == false) {
    if (e.key == "Tab") {
    } else {
      event.preventDefault();
    }
    return;
  }

  var lengthofvalue = e.currentTarget.value.length + 1;
  if (lengthofvalue == 20) {
    event.preventDefault();
    return;
  }
  if (lengthofvalue == 5 || lengthofvalue == 10 || lengthofvalue == 15) {
    e.currentTarget.value += "-";
  }
  var tracklength =
    e.currentTarget.value.length == 0
      ? e.currentTarget.value.length + 1
      : e.currentTarget.value.length;

  keygather += e.key;
  updown(e);
});
const updown = (e) => {
  console.log(keygather.length);
  var s = $(".updownnumber");
  if (e.key == "Backspace") {
    console.log(keygather.length, "key");
    if (
      keygather.length == 12 ||
      keygather.length == 8 ||
      keygather.length == 4
    ) {
      console.log(e.currentTarget.value);
      e.currentTarget.value = e.currentTarget.value.slice(
        0,
        e.currentTarget.value.length - 1
      );
    }
    var len = keygather.length;

    $(s[len]).removeClass("active");
  } else {
    var len = keygather.length - 1;

    $($(".updownnumber")[len].children[0]).html(e.key);
    $(s[len]).addClass("active");
  }
};
$(".cardnumberinput").focus(function (e) {
  var check = $(".card").hasClass("activeturn");
  if (check == true) {
    $(".card").removeClass("activeturn");
  }
  e.preventDefault();
  event.stopPropagation();
  var name = "numberdigit";
  var margin = Number(
    $(".numberdigit")
      .css("margin-top")
      .match(/\d*\.?\d+/g)[0]
  );
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top + margin + "px"}`,
    left: `${obj[name].left + "px"}`
  });
});
$(".cardholderinput").focus(function (e) {
  var check = $(".card").hasClass("activeturn");
  if (check == true) {
    $(".card").removeClass("activeturn");
  }
  e.preventDefault();
  event.stopPropagation();
  var name = "holder";
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top - 6 + "px"}`,
    left: `${obj[name].left - 6 + "px"}`
  });
});

$("#cardMonth").focus(function (e) {
  var check = $(".card").hasClass("activeturn");
  if (check == true) {
    $(".card").removeClass("activeturn");
  }
  e.preventDefault();
  event.stopPropagation();
  var name = "expire";
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top - 6 + "px"}`,
    left: `${obj[name].left - 6 + "px"}`
  });
});
$("#cardYear").focus(function (e) {
  var check = $(".card").hasClass("activeturn");
  if (check == true) {
    $(".card").removeClass("activeturn");
  }

  e.preventDefault();
  event.stopPropagation();
  var name = "expire";
  $(".border").animate({
    height: obj[name].height + "px",
    width: obj[name].width + "px",
    opacity: "1",
    top: `${obj[name].top - 6 + "px"}`,
    left: `${obj[name].left - 6 + "px"}`
  });
});
$(".CVV input").focus(function (e) {
  $(".card").addClass("activeturn");
});
$(".CVV input").focusout(function () {
  $(".card").removeClass("activeturn");
});

$(".cardholderinput").keydown(function (e) {
  console.log(e.key);

  var regexcheck = /^(?!\d)\w$/g;
  var checktrue = e.key.match(regexcheck);
  if (e.key == "Tab" || e.key == "Backspace") {
    if (e.key == "Backspace") {
      var len = $(".holdernameofuser span").length;
      var ele = $(".holdernameofuser span")[len - 1];
      if ($(".holdernameofuser span").length == 1) {
        $(ele).remove();

        $(".fixed").animate({ top: "0px", opacity: "1" });
        $(".holdernameofuser").animate({ top: "21px" });
      } else {
        $(ele).remove();
      }
    }
    return;
  }
  if (checktrue == null) {
    if (e.code == "Space") {
    } else {
      event.preventDefault();
      return;
    }
  }
  if ($(".fixed").css("opacity") == "0") {
  } else {
    $(".fixed").animate({ top: "-20px" }, function (e) {
      $(".fixed").css({ opacity: "0", top: "21px" });
    });
    $(".holdernameofuser").animate({ top: "0px" });
  }

  var normal = `<span>${e.key.toUpperCase()}</span>`;
  var spacenormal = `<span style="opacity:0;">${2}</span>`;
  if (e.code == "Space") {
    $(".holdernameofuser").append(spacenormal);
  } else {
    $(".holdernameofuser").append(normal);
  }
});
