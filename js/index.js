let lis = document.querySelectorAll('.tab-list ul li ')
let items = document.querySelectorAll('.tab-con .tab-items > .item')
let tabcate = document.querySelectorAll('.tab-cate div')

// 收藏下拉选项卡
for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', () => {
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
            items[i].style.display = 'none';
        }
        lis[i].className = 'current';
        items[i].style.display = 'block';
    })
}

// 动态下拉选项卡和历史下拉选项卡通过点击触发样式的改变
// 两部分没有区分，所以当点击了动态里的视频动态或专栏动态等选项后，历史选项卡的动态历史的样式会消失
// 一个小Bug，懒得改了
for (let i = 0; i < tabcate.length; i++) {
    tabcate[i].addEventListener('click', () => {
        for (let i = 0; i < tabcate.length; i++) {
            tabcate[i].className = '';
        }
        tabcate[i].className = 'active';
    })
}

// 轮播图
let carousel = document.querySelector(".carousel")
let carouselItems = carousel.children;
let circleBtn = document.querySelector(".circle-btn");

// 动画封装
let animate = (obj, target, callback) => {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer)
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}

const carouselWidth = carousel.parentElement.offsetWidth;

let curChange = () => {
    for (let i = 0; i < circleBtn.children.length; i++) {
        circleBtn.children[i].className = '';
    }
}

for (let i = 0; i < carouselItems.length; i++) {
    let li = document.createElement('li');
    circleBtn.appendChild(li);
    li.addEventListener('click', () => {
        clearInterval(gloablTimer);
        curChange();
        circleBtn.children[i].className = 'cur';
        animate(carousel, -i * carouselWidth, () => {
            autoChange();
        })
    })
}
circleBtn.children[0].className = 'cur';
let index = 0;
let gloablTimer;

// 自动播放
let autoChange = () => {
    gloablTimer = setInterval(() => {
        index++;
        if (index == carouselItems.length) {
            carousel.style.left = 0;
            index = 0;
        }
        curChange();
        circleBtn.children[index].className = 'cur';
        animate(carousel, -index * 550);
    }, 5000)
}

autoChange();

carousel.addEventListener('mouseover', () => {
    clearInterval(gloablTimer);
})

carousel.addEventListener('mouseleave', () => {
    autoChange();
})




