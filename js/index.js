// 
let lis = document.querySelectorAll('.tab-list ul li ')
let items = document.querySelectorAll('.tab-con .tab-items > .item')
let tabcate = document.querySelectorAll('.tab-cate div')

// 收藏下拉选项卡
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = () => {
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
            items[i].style.display = 'none';
        }
        lis[i].className = 'current';
        items[i].style.display = 'block';
    }
}

// 动态下拉选项卡和历史下拉选项卡通过点击触发样式的改变
// 两部分没有区分，所以当点击了动态里的视频动态或专栏动态等选项后，历史选项卡的动态历史的样式会消失
// 一个小Bug，懒得改了
for (let i = 0; i < tabcate.length; i++) {
    tabcate[i].onclick = function () {
        for (let i = 0; i < tabcate.length; i++) {
            tabcate[i].className = '';
        }
        tabcate[i].className = 'active';
    }
}


// let recItems = document.querySelectorAll('.rec-item')
// let leftBtn = document.querySelector('left-btn')
// let rightBtn = document.querySelector('.right-btn')

// leftBtn.addEventListener = ('click', () => {

// })
let carouselItems = document.querySelectorAll(".carousel-item");
let circleBtn = document.querySelector(".circle-btn");

for (let i = 0; i < carouselItems.length; i++) {
    let li = document.createElement('li');
    circleBtn.appendChild(li);
}
console.log(circleBtn.children)
console.log(circleBtn.children.length)

// console.log(circleBtn.childNodes)
circleBtn.children[0].className = 'cur';

for (let i = 0; i < circleBtn.children.length; i++) {
    console.log(i)
    circleBtn.children[i].addEventListener = ('click', () => {
        for(let i = 0;i < circleBtn.children.length;i++){
            console.log(i)
            circleBtn.children[i].className = '';
            console.log(circleBtn.children[i])
        }
        circleBtn.children[i].className = 'cur';
    })
}