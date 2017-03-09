/**
 * Created by Administrator on 2016/11/7.
 */
//第一个窗口的鼠标绘画事件 begin
var personOne = document.getElementById("personOne");
var oneCtx = personOne.getContext("2d");
oneCtx.strokeStyle = "#000";
oneCtx.lineCap = "round";

personOne.onmousedown = function () {
    var x = event.offsetX;
    var y = event.offsetY;
    oneCtx.beginPath();
    oneCtx.moveTo(x, y);
    personOne.onmousemove = function () {
        x = event.offsetX;
        y = event.offsetY;
        oneCtx.lineTo(x, y);
        oneCtx.stroke();
    };
};
personOne.onmouseup = function () {
    oneCtx.closePath();
    personOne.onmousemove = "";
};
var tip1 = document.getElementById("tip1");
var btnOne = tip1.getElementsByTagName("input")[0];

btnOne.onclick = function () {
    personOne.onmousedown = "";
    personOne.className = "move";
    personOne.style.border = "none";
    tip2.style.display = "block";
    personTwo.style.display = "block";
    this.parentNode.style.display = "none";
};
//第一个窗口的鼠标绘画事件 end

//第二个窗口的鼠标绘画事件 begin

var personTwo = document.getElementById("personTwo");
var twoCtx = personTwo.getContext("2d");
twoCtx.strokeStyle = "#000";
twoCtx.lineCap = "round";


personTwo.onmousedown = function () {
    var x = event.offsetX;
    var y = event.offsetY;
    twoCtx.beginPath();
    twoCtx.moveTo(x, y);
    personTwo.onmousemove = function () {
        x = event.offsetX;
        y = event.offsetY;
        twoCtx.lineTo(x, y);
        twoCtx.stroke();
    };
};
personTwo.onmouseup = function () {
    twoCtx.closePath();
    personTwo.onmousemove = "";
};
var tip2 = document.getElementById("tip2");
var btnTwo = tip2.getElementsByTagName("input")[0];

btnTwo.onclick = function () {
    personTwo.onmousedown = "";
    personTwo.className = "move";
    personTwo.style.border = "none";
    this.parentNode.style.display = "none";
    inputData.style.display = "block";
};
//第二个窗口的鼠标绘画事件 end
//输入框事件 begin
var inputData = document.getElementById("inputData");
var inps = inputData.getElementsByTagName("input");
var yourDatas = [];
var yourData = document.getElementById("yourData");
var bossData = document.getElementById("bossData");

function wrong(element, str) {
    element.innerText = str;
    element.style.color = "red";
}
for (i = 0; i < inps.length - 1; i++) {
    inps[i].index = i;
    inps[i].text = inps[i].previousElementSibling.innerText;
    inps[i].onkeyup = function () {
        if (this.value.length === 0) {
            this.previousElementSibling.innerText = this.text;
            this.previousElementSibling.style.color = "black";
        } else if (this.index === 0 && Number(this.value)) {
            wrong(this.previousElementSibling, "名字输错了.别写数字,认真点呀!!");
        } else if (this.index === 1 && (!Number(this.value) || Number(this.value) <= 0)) {
            wrong(this.previousElementSibling, "HP是生命值,你确定你输入的没错吗!!");
        } else if (this.index === 2 && (!Number(this.value) || Number(this.value) <= 0)) {
            wrong(this.previousElementSibling, "Att是攻击力,你这样乱写,还能不能好好玩耍了.");
        } else {
            this.previousElementSibling.innerText = this.text;
            this.previousElementSibling.style.color = "black";
        }
    }
}

var minYourAtt;
var maxYourAtt;
var minBossAtt;
var maxBossAtt;
var yourHP;
var yourAtt;
var bossHP;
var bossAtt;
inps[3].onclick = function () {
    for (i = 0; i < inps.length - 1; i++) {
        if (inps[i].previousElementSibling.style.color === "red" || inps[i].value.length === 0) {
            alert("你的数据输入还有错误!!赶紧去改");
            return;
        } else {
            yourDatas[i] = inps[i].value;
        }
    }
    yourHP = Number(yourDatas[1]);
    yourAtt = Number(yourDatas[2]);
    minYourAtt = parseInt(yourAtt * 0.8);
    maxYourAtt = parseInt(yourAtt * 1.2);
    bossHP = yourAtt * 10;
    bossAtt = yourHP / 9;
    minBossAtt = parseInt(bossAtt * 0.7);
    maxBossAtt = parseInt(bossAtt * 1.3);
    yourData.innerHTML = yourDatas[0] + "<br/> HP:" + yourHP + "/" + yourDatas[1] + "<br/>Attack:" + minYourAtt + "-" + maxYourAtt;
    bossData.innerHTML = "大魔王<br/> HP:" + bossHP + "/" + bossHP + "<br/>Attack:" + minBossAtt + "-" + maxBossAtt;
    this.parentNode.style.display = "none";
    battle.style.display = "block";
    record.style.display = "block";
};
//输入框事件 end
//战斗事件 begin
var battle = document.getElementById("battle");
var record = document.getElementById("record");
ul = document.createElement("ul");
record.appendChild(ul);
battle.onclick = function () {
    var yourTrueAtt = parseInt(Math.random() * (maxYourAtt - minYourAtt)) + minYourAtt;
    var bossTrueAtt = parseInt(Math.random() * (maxBossAtt - minBossAtt)) + minBossAtt;
    yourHP = yourHP - bossTrueAtt;
    bossHP = bossHP - yourTrueAtt;
    yourData.innerHTML = yourDatas[0] + "<br/> HP:" + yourHP + "/" + yourDatas[1];
    bossData.innerHTML = "大魔王<br/> HP:" + bossHP + "/" + yourAtt * 10;
    li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = "你攻击了大魔王,并造成了" + yourTrueAtt + "点伤害<br/>大魔王攻击了你,造成了" + bossTrueAtt + "点伤害";
    if (yourHP <= 0) {
        alert("太弱了,都让你自己写属性了还会输.");
        window.location.reload();
    }
    if (bossHP <= 0) {
        alert("还不错,还能打赢大魔王.");
        window.location.reload();
    }
};

//战斗事件 end
