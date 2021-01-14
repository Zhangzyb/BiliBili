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
let carousel = document.querySelector('.carousel-wrap');
let k = new CarouselObj(carousel);
k.carousel();

// 视频预览
let sprite = document.querySelectorAll('.sprite');
const spriteWidth = sprite[0].offsetWidth;

for (let i = 0; i < sprite.length; i++) {
    sprite[i].addEventListener('mousemove', (e) => {
        let moveWidth = e.pageX - sprite[i].getBoundingClientRect().left;
        let per = Math.ceil(moveWidth / spriteWidth * 100);
        let index = Math.floor(per / 10);
        let playBar = sprite[i].querySelector('.play-bar > span');
        playBar.style.width = per + '%';
        sprite[i].style.backgroundPosition = -index * spriteWidth + "px " + "0px";
    })
}

// 切换选项卡
let switchTab = (switchObj, cur) => {
    let switchtabs = switchObj.children;
    let tabCon = switchObj.nextElementSibling.children;
    for (let i = 0; i < switchtabs.length; i++) {
        switchtabs[i].addEventListener('click', () => {
            for (let i = 0; i < switchtabs.length; i++) {
                switchtabs[i].className = '';
            }
            switchtabs[i].className = cur;
            for(let i = 0;i < tabCon.length;i++){
                tabCon[i].style.display = 'None';
            }
            tabCon[i].style.display = 'block';
        })
    }
}

let liveTabs = document.querySelector('.live-tabBar');
switchTab(liveTabs, 'cur');

// 直播模块的轮播图
let liveCarousel = document.querySelector('.live-rec')
let s = new CarouselObj(liveCarousel);
s.carousel();



