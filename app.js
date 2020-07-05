
let prime_select = document.getElementById("city");
let place_select = document.getElementById("place");


const cityArr = {
  "lviv": ["Площа Ринок. Нептун", "Парковка автобусна. Біля Порохової", "Порохова Вежа. вхід", "Опера. Навпроти входу", "Пам'ятник Т.Г.Шевченку", "автостанця Стрийська", " -- Свій варіант --  "],
  "kyiv": ["Залізнодорожній вокзал. Головний", "Залізнодорожній вокзал. Південний", "Майдан. Стелла", "Ст.Метро Хрещатик", "Київо-Печерська Лавра", "Андріївська церква", " -- Свій варіант -- "],
  "uzgorod": ["Замок. Навпроти входу", "Залізнодорожній вокзал", "Памятник Шандору Петофі. Центр", "Музей народної архітектури", "Завод Джейбіл", "Розівка, кільце. Біля маг. Зіна", " -- Свій варіант -- "]
}

prime_select.addEventListener("change", func);
prime_select.addEventListener("change", toEnterSide);
prime_select.addEventListener("click", func);
prime_select.addEventListener("click", toEnterSide);


place_select.addEventListener("change", toEnterSide);

function func(){
  place_select.innerHTML = "";
  let selected_city = prime_select.value;
  for (let i = 0; i<cityArr[selected_city].length; i++) {
    let new_option = document.createElement("option");
    new_option.innerHTML = cityArr[selected_city][i];
    place_select.appendChild(new_option);
  }
}
function toEnterSide(){
    if (place_select.options.selectedIndex == 6) {
      $(".place")[0].innerHTML = prompt("Вкажіть будь-ласка, адресу доставки", prime_select.options[prime_select.options.selectedIndex].innerHTML + ", вулиця, буд.")
      price();

    } else {
      let adress = prime_select.options[prime_select.options.selectedIndex].innerHTML + ", " + place_select.options[place_select.options.selectedIndex].innerHTML;
      $(".place")[0].innerHTML = adress;
      price()
    }
    $("div.place").css("opacity", "1");
    
};

/*переключаємо видимість обєктів та включаэмо клас active згідно клікання по меню*/
$("a#start.menu__btn").on("click", function(event) {
  event.preventDefault();
  $(this).toggleClass("active");
  $(".datetime_start").toggleClass("active")
});

$("#datetimeLocalStart").on("click", function() {
  document.getElementById("datetimeLocalFinish").min = document.getElementById("datetimeLocalStart").value
});



$("a#finish.menu__btn").on("click", function(event) {
  event.preventDefault();
  $(this).toggleClass("active");
  $(".datetime_finish").toggleClass("active")
  document.getElementById("datetimeLocalFinish").value = currentDate(6);
  document.getElementById("datetimeLocalFinish").min = document.getElementById("datetimeLocalStart").value
});

$("a#speaker.menu__btn").on("click", function(event) {
  event.preventDefault();
  $(this).toggleClass("active");
  $(".amountSpeakers").toggleClass("active")
});

$("a#participants.menu__btn").on("click", function(event) {
  event.preventDefault();
  $(this).toggleClass("active");
  $(".amountParticipants").toggleClass("active")
});

$("a#location.menu__btn").on("click", function(event) {
  event.preventDefault();
  $(this).toggleClass("active");
  $(".location").toggleClass("active")
});




//Функція яка відображає вартість послуги, згiдно внесених даних
function price() {

  let yearS = Number(document.getElementById('datetimeLocalStart').value.match(/^\d{4}/)[0]);
  let monthS = Number(document.getElementById('datetimeLocalStart').value.match(/\d+/g)[1]);
  let dayS = Number(document.getElementById('datetimeLocalStart').value.match(/\d+/g)[2]);
  let timeSH = Number(document.getElementById('datetimeLocalStart').value.match(/\d{2}:/g)[0].match(/\d+/g)[0]);
  let timeSmin = Number(document.getElementById('datetimeLocalStart').value.match(/:\d+$/g)[0].match(/\d+/g)[0]);

  let yearF = Number(document.getElementById('datetimeLocalFinish').value.match(/^\d{4}/)[0]);
  let monthF = Number(document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[1]);
  let dayF = Number(document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[2]);
  let timeFH = Number(document.getElementById('datetimeLocalFinish').value.match(/\d{2}:/g)[0].match(/\d+/g)[0]);
  let timeFmin = Number(document.getElementById('datetimeLocalFinish').value.match(/:\d+$/g)[0].match(/\d+/g)[0]);

  let participant = $("div.participants")[0].innerHTML.match(/\d+/g)[0];
  
  let resultPlace = $("span.price")[0];

  let speakerAmount = $("div.speakers")[0].innerHTML.match(/\d+/g)[0];

  let minHour = (timeFH - timeSH) + ((60 - timeSmin + timeFmin)/60 - 1);
  let minHourNextDay = (24-timeSH + timeFH) + ((60 - timeSmin + timeFmin)/60 - 1);
  
  if (dayF == dayS && monthF == monthS && yearF == yearS) {
    if (minHour <= 4){
      result = 2;
    } else if (minHour > 4 && minHour < 6) {
      result = 2 + (minHour - 4);
    } else if (minHour >= 6 && minHour <= 8) {
      result = 4;
    } else if (minHour > 8 && minHour < 9) {
      result = 4 + (minHour - 8);
    } else if (minHour >= 9) {
      result = 5;
    }
  } else if (monthF == monthS && yearF == yearS) {
    if (dayF == dayS + 1) {
      if (minHourNextDay <= 4) {
        result = minHourNextDay + 2;
      } else if (minHourNextDay > 4 && minHourNextDay <= 6) {
        result = minHourNextDay + 3;
      } else if (minHourNextDay > 6 && minHourNextDay <= 12) {
        result = minHourNextDay + 2;
      } else if (minHourNextDay > 12 && minHourNextDay <= 15) {
        result = 2 + (minHourNextDay - 12);
      } else if (minHourNextDay > 15 && minHourNextDay <= 24) {
        result = 5.25;
      } else if (minHourNextDay > 24 && minHourNextDay <= 28) {
        result = 5.5;
      } else if (minHourNextDay > 28 && minHourNextDay <= 48) {
        result = 5.75;
      }
    } else if (dayF > dayS + 1 && dayF <= dayS + 2) {
      if (minHour <= 4){
        result = 1.75 + 4;
      } else if (minHour > 4 && minHour < 6) {
        result = 1.5 + 4 +(minHour - 4);
      } else if (minHour >= 6 && minHour <= 8) {
        result = 4 + 3.5;
      } else if (minHour > 8 && minHour < 9) {
        result = 4 + 3.5 + (minHour - 8);
      } else if (minHour >= 9) {
        result = 5 + 3;
      }
    } else if (dayF <= dayS + 3 && dayF > dayS + 2) {
      if (timeFH > 01 && timeFH < 10) {
        result = 8.25;
      } else if (timeFH > 11 && timeFH < 13) {
        result = 8.5;
      } else if (timeFH > 13 && timeFH < 23) {
        result = 8.75;
      }
    } else if (dayF <= dayS + 4 && dayF > dayS + 3) {
      if (timeFH > 01 && timeFH < 10) {
        result = 9;
      } else if (timeFH > 11 && timeFH < 13) {
        result = 9.25;
      } else if (timeFH > 13 && timeFH < 23) {
        result = 9.5;
      }
    } else if (dayF <= dayS + 5 && dayF > dayS + 4) {
      if (timeFH > 01 && timeFH < 10) {
        result = 9.75;
      } else if (timeFH > 11 && timeFH < 13) {
        result = 10;
      } else if (timeFH > 13 && timeFH < 23) {
        result = 10.25;
      }
    } else if (dayF > dayS + 5) {
      result = (dayF - dayS - 4) + 10;
    }
    
  } else if (yearF == yearS) {
    if (monthS == 01 || monthS == 03 || monthS == 05 || monthS == 07 || monthS == 08 || monthS == 10 || monthS == 12) {
      result = ((31 - dayS) + dayF + 26*(monthF - monthS-1));
    } else if (monthS == 04 || monthS == 06 || monthS == 09 || monthS == 11) {
      result = ((30 - dayS) + dayF + 26*(monthF - monthS-1));
    } else if (monthS == 02) {
      result = ((28 - dayS) + dayF + 22*(monthF - monthS-1));
    }
  } else {
    result = ((31 - dayS) + dayF + 26*(12 - monthS + monthF-1) + 360*(yearF - yearS-1));
  }

  let locationExp = 0;
  if (place_select.options.selectedIndex == 6 && prime_select.value == "lviv") {
    locationExp = 60;
  } else if (place_select.options.selectedIndex == 6 && prime_select.value == "kyiv") {
    locationExp = 100;
  } else if (place_select.options.selectedIndex == 6 && prime_select.value == "uzgorod") {
    locationExp = 80;
  }

  let _expTarifSpeaker = 0;
  if (speakerAmount == 1 || speakerAmount == null) {
    _expTarifSpeaker = 0;
  } else {
    _expTarifSpeaker = speakerAmount * 40;
  }

  let _expTarifParticipant = 8;
  
  resultPlace.innerHTML = (result * _expTarifParticipant * participant + locationExp + _expTarifSpeaker).toFixed(2)  + " UAH";

$("div.resultPrice").css({"opacity": "1", "font-weight": "700"});
}

//Консоль по вибору дати коли починається оренда
$("#datetimeLocalStart").on("click", function() { 

  function monthName(m) {
    monthes = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"]
    m = monthes[m-1]
    return m;
  }
  let month = document.getElementById('datetimeLocalStart').value.match(/\d+/g)[1];
  let day = document.getElementById('datetimeLocalStart').value.match(/\d+/g)[2];
  let time = document.getElementById('datetimeLocalStart').value.match(/\d+:\d+$/g)[0];
  
  document.getElementsByClassName("date__start")[0].innerHTML = "Ви замовили на " + monthName(month) + " " + day + " числа, з " + time + " години";

  $("div.date__start").css("opacity", "1");

  price();

});

let date = new Date();
let year = date.toLocaleString().match(/\d{4}/g)[0];
let day = date.toLocaleString().match(/\d{2}/g)[0];
let mon = date.toLocaleString().match(/\d{2}/g)[1];
let time = date.toLocaleString().match(/\d{2}/g)[4];

function currentDate(h) {
 

    if (time >= 18) {

      if (day == 31 && mon == 01 || day == 31 && mon == 03 || day == 31 && mon == 05 || day == 31 && mon == 07 || day == 31 && mon == 08 || day == 28 && mon == 02 || day == 30 && mon == 04 || day == 30 && mon == 06) {
        return year + "-0" + (Number(mon) + 1) +"-"+ "01T0" + (3 + h)+ ":00";
      } else if (day == 30 && mon == 09 || day == 30 && mon == 11 || day == 31 && mon == 10) {
        return year + "-" + (Number(mon) + 1) +"-"+ "01T0" + (3 + h)+ ":00";
      } else if (day == 31 && mon == 12) {
        return (Number(year) + 1) + "-01-01T12:00";
      } else if (day <= 08) {
        return year + "-" + mon + "-0" + (Number(day) + 1) + "T0" + (3 + h)+ ":00";
      } else {
        return year + "-" + mon + "-" + (Number(day) + 1) + "T0" + (3 + h)+ ":00";
      }

    } else if (time <= 07) {
        return year + "-" + mon + "-" + day + "T" + "10:00";
    } else {
        return year + "-" + mon + "-" + day + "T" + (Number(time) + h) + ":00";
    }

}
function currentDateForCity() {
    if (day >= 22 && mon >= 09) {
        return year + "-" + Number(mon + 1) + "-01T07:00";
    } else if (day >= 22 && mon < 09) {
      return year + "-0" + Number(mon + 1) + "-01T07:00";
    } else if (day <= 09) {
      return year + "-" + mon + "-0" + (Number(day) + 6) + "T07:00";
    } else if (day > 09) {
      return year + "-" + mon + "-" + (Number(day) + 6) + "T07:00";
    } else if (mon == 12) {
      return year + 1 + "-01-08T07:00";
    }
 
}

prime_select.addEventListener("click", function() {
  if (prime_select.value == "kyiv" || prime_select.value == "uzgorod") {
    document.getElementById("datetimeLocalStart").value = currentDateForCity();
    document.getElementById("datetimeLocalFinish").value = currentDateForCity();
    document.getElementById("datetimeLocalStart").min = currentDateForCity();
    document.getElementById("datetimeLocalFinish").min = currentDateForCity();
  } else {
    document.getElementById("datetimeLocalStart").value = currentDate(4);
    document.getElementById("datetimeLocalStart").min = currentDate(4);
    document.getElementById("datetimeLocalFinish").value = currentDate(6)
    document.getElementById("datetimeLocalFinish").min = document.getElementById("datetimeLocalStart").value;
  }
});

document.getElementById("datetimeLocalStart").value = currentDate(4);
document.getElementById("datetimeLocalStart").min = currentDate(4);

//Консоль по вибору дати коли закінчується оренда
$("#datetimeLocalFinish").on("click", function() { 

  
  function monthName(m) {
    monthes = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
    m = monthes[m - 1]
    return m;
  }

  let year = document.getElementById('datetimeLocalFinish').value.match(/^\d{4}/)[0];
  let month = document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[1];
  let day = document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[2];
  let time = document.getElementById('datetimeLocalFinish').value.match(/\d+:\d+$/g)[0];
  let result = document.getElementsByClassName("date__finish")[0];
  
  if (day == document.getElementById('datetimeLocalStart').value.match(/\d+/g)[2] && month == document.getElementById('datetimeLocalStart').value.match(/\d+/g)[1] && year == document.getElementById('datetimeLocalStart').value.match(/^\d{4}/)[0]) {
    result.innerHTML = "до " + time + " години;";
  } else if (month == document.getElementById('datetimeLocalStart').value.match(/\d+/g)[1] && year == document.getElementById('datetimeLocalStart').value.match(/^\d{4}/)[0]) {
    result.innerHTML = "до " + day + " числа, "+ time + " години;";
  } else if (year == document.getElementById('datetimeLocalStart').value.match(/^\d{4}/)[0]) {
    result.innerHTML = "до " + monthName(month) + " " + day + " числа, "+ time + " години;"
  } else {
    result.innerHTML = "до " + monthName(month) + " " + day + " числа, "+ time + " години, " + year + " року;"
  }

  $("div.date__finish").css("opacity", "1");

  price();
});


//випадаюче меню для вибору кількості спікерів (передавачів для спікера)
$("#speakers").on("click", function() {
  let sel = amountSpeakers.amount;
    selectedIndex = sel.options.selectedIndex;
    document.getElementsByClassName("speakers")[0].innerHTML = "Кількість трансміттерів: " + sel.options[selectedIndex].innerHTML + ";";

    $("div.speakers").css("opacity", "1");

    price();
});

//для вибору кількості учасників группи
let Participants = document.getElementById("amountParticipants");
Participants.addEventListener("change", amountParticipants);
function amountParticipants() {
  $(".participants")[0].innerHTML = "Кількість приймачів з індивідуальною гарнітурою: " + $("#amountParticipants")[0].value + ";";

  $("div.participants").css("opacity", "1");

  price();
};
