//Цикл для створення списку локацій в залежності від міста

//додаємо новий список
function addOption(arr){
  for (i=0; i<arr.length; i++) {
      let newOption = new Option(arr[i]);
      placeO.options[placeO.options.length]=newOption;
      
  }
}

//видаляємо непотрібний(попередній) список
function replaceOption(arr) {
  for ( ik=0; ik < placeO.options.length; ik++ ) {
      let newOption = new Option(arr[ik]);
      placeO.options[placeO.options.length]=newOption;
      placeO.options[ik].replaceWith(newOption);
  }
}

//Функція яка відображає вартість послуги, згiдно внесених даних
function price() {
$("div.price")[0].innerHTML = ($("div.date__finish")[0].innerHTML.match(/\d+/g)[0] - $("div.date__start")[0].innerHTML.match(/\d+/g)[1] ) * $("div.participants")[0].innerHTML.match(/\d+/g)[0] * 20 + " UAH";
$("div.resultPrice").css({"opacity": "1", "font-weight": "700"});
}


//Консоль по вибору дати коли починається оренда
$("#datetimeLocalStart").on("click", function() { 

  function monthName(m) {
    monthes = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "лютий", "грудень"]
    m = monthes[m - 1]
    return m;
  }
  let year = document.getElementById('datetimeLocalStart').value.match(/^\d{4}/)[0];
  let month = document.getElementById('datetimeLocalStart').value.match(/\d+/g)[1];
  let day = document.getElementById('datetimeLocalStart').value.match(/\d+/g)[2];
  let time = document.getElementById('datetimeLocalStart').value.match(/\d+:\d+$/g)[0];
  
  document.getElementsByClassName("date__start")[0].innerHTML = "Ви замовили на " + monthName(month) + " " + day + " числа, о " + time + " годині";

  $("div.date__start").css("opacity", "1");

  price();
});

//Консоль по вибору дати коли закінчується оренда
$("#datetimeLocalFinish").on("click", function() { 

  function monthName(m) {
    monthes = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "лютий", "грудень"]
    m = monthes[m - 1]
    return m;
  }

  let year = document.getElementById('datetimeLocalFinish').value.match(/^\d{4}/)[0];
  let month = document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[1];
  let day = document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[2];
  let time = document.getElementById('datetimeLocalFinish').value.match(/\d+:\d+$/g)[0];
  
  if (document.getElementById('datetimeLocalFinish').value.match(/\d+/g)[2] == document.getElementById('datetimeLocalStart').value.match(/\d+/g)[2]) {
    document.getElementsByClassName("date__finish")[0].innerHTML = "до " + time + " години;";
  } else {
    document.getElementsByClassName("date__finish")[0].innerHTML = "до " + day + " числа, "+ time + " години;";
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
$("#amountParticipants").on("click", function() {
  $(".participants")[0].innerHTML = "Кількість приймачів з індивідуальною гарнітурою: " + $("#amountParticipants")[0].value + ";";

  $("div.participants").css("opacity", "1");

  price();
});

// Випадаюче меню для обрання локації для доставки радіогідів
let cityO = $("#city")[0];
let placeO = $("#place")[0];
let lviv = ["Площа Ринок. Нептун", "Парковка автобусна. Біля Порохової", "Порохова Вежа. вхід", "Опера. Навпроти входу", "Пам'ятник Т.Г.Шевченку", "автостанця Стрийська", " -- Свій варіант --  "];
let kyiv = ["Залізнодорожній вокзал. Головний", "Залізнодорожній вокзал. Південний", "Майдан. Стелла", "Ст.Метро Хрещатик", "Київо-Печерська Лавра", "Андріївська церква", " -- Свій варіант -- "];
let uzgorod = ["Замок. Навпроти входу", "Залізнодорожній вокзал", "Памятник Шандору Петофі. Центр", "Музей народної архітектури", "Завод Джейбіл", "Розівка, кільце. Біля маг. Зіна", " -- Свій варіант -- "];
  
//Подія для відображення обраних позицій(місто, локація, свій варіант)
$("#place").on("click", function(){
    if (placeO.options.selectedIndex == 6) {
      $(".place")[0].innerHTML = prompt("Вкажіть будь-ласка, адресу доставки", "Місто, вулиця ")

    } else {
      let adress = cityO.options[cityO.options.selectedIndex].innerHTML + ", " + placeO.options[placeO.options.selectedIndex].innerHTML;
      $(".place")[0].innerHTML = adress;

    }

    price();
});

//Подія, яка активовує цикл для створення випадаючого списку
$("#city").on("click", function(){
selectedIndex = cityO.options.selectedIndex
if (cityO.options[cityO.selectedIndex].value == "uzgorod") {
    replaceOption(uzgorod);
    addOption(uzgorod);
    placeO.options.length = uzgorod.length;

} else if (cityO.options[cityO.selectedIndex].value == "kyiv") {
    replaceOption(kyiv);
    addOption(kyiv);
    placeO.options.length = kyiv.length;

} else if (cityO.options[cityO.selectedIndex].value == "lviv") {
    addOption(lviv);
    replaceOption(lviv);
    placeO.options.length = lviv.length;

}

$("div.place").css("opacity", "1");

price();
});
