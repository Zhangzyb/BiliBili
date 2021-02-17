// 切换选项卡封装
class SwitchObj {
    constructor(switchTab, tabConent, cur, showMethod) {
        this.switchTab = switchTab;
        this.tabConent = tabConent;
        this.cur = cur;
        this.showMethod = showMethod
    }

    switch() {
        for (let i = 0; i < this.switchTab.length; i++) {
            this.switchTab[i].addEventListener('click', () => {
                for (let i = 0; i < this.switchTab.length; i++) {
                    this.switchTab[i].className = '';
                }
                this.switchTab[i].className = this.cur;
                for (let i = 0; i < this.tabConent.length; i++) {
                    this.tabConent[i].style.display = 'None';
                }
                this.tabConent[i].style.display = this.showMethod;
            })
        }
    }
}

// 动态下拉选项卡
let updateTabs = document.querySelector('.update-tarBar').children;
let updateContent = document.querySelector('.video-list').children;
let updateSwitch = new SwitchObj(updateTabs, updateContent, 'cur', 'block');
updateSwitch.switch();

// 收藏下拉选项卡
let collectTabs = document.querySelector('.tab-list ul').children;
let collectContent = document.querySelector('.tab-items').children;
let collectSwitch = new SwitchObj(collectTabs, collectContent, 'current', 'block');
collectSwitch.switch();

// 历史下拉选项卡
let pastTabs = document.querySelector('.past-tarBar').children;
let pastContent = document.querySelector('.past-content').children;
let pastSwitch = new SwitchObj(pastTabs, pastContent, 'cur', 'block');
pastSwitch.switch();

// 直播模块右侧切换选项卡
let liveTabs = document.querySelector('.live-tabBar').children;
let liveContent = document.querySelector('.live-content').children;
let liveSwitch = new SwitchObj(liveTabs, liveContent, 'cur', 'block');
liveSwitch.switch();

// 番剧模块的选项卡
let dramaTabs = document.querySelector('.switch-tab').children;
let dramaContent = document.querySelector('.drama-list').children;
let dramaSwitch = new SwitchObj(dramaTabs, dramaContent, 'cur', 'flex');
dramaSwitch.switch();

// 国创选项卡
let guochuangTabs = document.querySelector('.guochuang-tab').children;
let guochuangContent = document.querySelector('.guochuang-list').children;
let guochuangSwitch = new SwitchObj(guochuangTabs, guochuangContent, 'cur', 'flex');
guochuangSwitch.switch();

// 漫画选项卡
let comicsTabs = document.querySelectorAll('.comics-tab > div');
let comicsContent = document.querySelector('.comics-list').children;
let comicsSwitch = new SwitchObj(comicsTabs, comicsContent, 'cur', 'flex');
comicsSwitch.switch();


// 基于修改left值的轮播图
// 轮播图结构：

// 最外层盒子，确定轮播图片的大小。
// <div class="carousel-wrap"> 
//    包含所有图片的盒子，通过修改此盒子的left的值以动画的形式实现图片的改变。 
//    <div class="carousel"></div>   
//    小圆点可以控制显示哪张图片。
//    <div class="btn"></div>  
// </div>

class CarouselObj {
    constructor(Elenobj) {
        this.focusObjWidth = Elenobj.offsetWidth; // 轮播区域宽度
        this.carouselObj = Elenobj.children[0];   // 包含所有轮播图的盒子
        this.carouselBtn = Elenobj.children[1];   // 小圆点
        this.imgIndex = 0;  // 分别用于控制图片和圆点显示
        this.btnIndex = 0;
        this.gloablTimer = null; //自动轮播的定时器
    }

    // 点击时给相应元素加上选中样式，并取消其他元素的选中样式。
    changeClass(obj, index, cur) {
        for (let i = 0; i < obj.children.length; i++) {
            obj.children[i].className = '';
        }
        obj.children[index].className = cur;
    }

    //封装动画，参数：使用动画的对象、移动的距离、回调函数(可选)。
    animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(() => {
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft === target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15)
    }

    // 自动轮播
    autoChange() {
        this.gloablTimer = setInterval(() => {
            if (this.imgIndex === this.carouselObj.children.length - 1) {
                this.carouselObj.style.left = 0;
                this.imgIndex = 0;
            }
            this.imgIndex++;
            this.animate(this.carouselObj, - this.imgIndex * this.focusObjWidth);
            this.btnIndex++;
            if (this.btnIndex === this.carouselBtn.children.length) {
                this.btnIndex = 0;
            }
            this.changeClass(this.carouselBtn, this.btnIndex, 'cur');
        }, 5000)
    }

    carousel() {
        // 根据图片数生成小圆点数，并为每个圆点绑定点击事件。
        for (let i = 0; i < this.carouselObj.children.length; i++) {
            let li = document.createElement('li');
            this.carouselBtn.appendChild(li);
            li.addEventListener('click', () => {
                this.btnIndex = this.imgIndex = i;
                this.changeClass(this.carouselBtn, i, 'cur');
                this.animate(this.carouselObj, -i * this.focusObjWidth);
            });
        }
        this.carouselBtn.children[0].className = 'cur';
        // 复制第一张图片以实现无缝轮播
        let copyChild = this.carouselObj.children[0].cloneNode(true);
        this.carouselObj.appendChild(copyChild);
        this.autoChange();
        // 鼠标经过图片时移除定时器，离开时重启定时器
        this.carouselObj.addEventListener('mouseover', () => {
            clearInterval(this.gloablTimer);
        })
        this.carouselObj.addEventListener('mouseleave', () => {
            this.autoChange();
        })
    }
}

// 推荐模块轮播图
let carousel = document.querySelector('.carousel-wrap');
let k = new CarouselObj(carousel);
k.carousel();

// 直播模块的轮播图
let liveBox = document.querySelector('.live-rec')
let liveCarousel = new CarouselObj(liveBox);
liveCarousel.carousel();

// 番剧动态的轮播图
let dramaBox = document.querySelector('.box-carousel-wrap');
let dramaCarousel = new CarouselObj(dramaBox);
dramaCarousel.carousel();

// 国创轮播图
let guochuangBox = document.querySelector('.guochuang-carousel');
let guochuangCarousel = new CarouselObj(guochuangBox);
guochuangCarousel.carousel();

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

// 侧边栏随页面滚动过程中定位的变化
let sideBar = document.querySelector('.side-bar');
document.addEventListener('scroll', () => {
    // 此处写死了
    if (window.pageYOffset >= 373 || window.scrollTop >= 373) {
        sideBar.style.position = 'fixed';
        sideBar.style.top = '50px';
    }
    else {
        sideBar.style.position = 'absolute';
        sideBar.style.top = '365px';
    }
})

// 侧边栏点击后样式改变
let sideBtns = document.querySelectorAll('.side-bar > div');
for (let i = 0; i < sideBtns.length; i++) {
    sideBtns[i].addEventListener('click', () => {
        for (let i = 0; i < sideBtns.length; i++) {
            sideBtns[i].className = '';
        }
        sideBtns[i].className = 'cur';
        document.querySelector('.main > #' + sideBtns[i].id).scrollIntoView(true);
    })
}

// 侧边栏的滚动监听
let lisDivs = document.querySelectorAll('.listen');
document.addEventListener('scroll', () => {
    for (let i = 0; i < lisDivs.length; i++) {
        if (lisDivs[i].getBoundingClientRect().top < 200) {
            for (let i = 0; i < sideBtns.length; i++) {
                sideBtns[i].className = '';
            }
            sideBtns[i].className = 'cur';
        }
        else {
            sideBtns[i].className = '';
        }
    }
})

// 图片动画
const box = document.querySelector('.animate-box');
let imgs = document.querySelectorAll('.layer img');
let video = document.querySelector('.layer video');

let initPosition;       // 进入盒子的初始位置
let mouseMove;          // 鼠标在盒子内的移动距离
let commonMove;         // 背景图、视频和水汽的移动距离
let branchesMove;       // 树枝移动距离
let snowMove;           // 雪球的移动距离
let snowRotate;         // 雪球的旋转度

// 鼠标从左到右
let videoOpacity;      // 视频移动过程中的透明度
let steamOpacity;      // 玻璃窗上的水汽移动过程中的透明度
let nightBranchOpacity;   // 晚上树枝的透明度

// 鼠标从右到左 
let afternoonImgOpacity;      // 下午的背景图片透明度
let snowOpacity;              // 雪球的透明度
let afternoonBranchOpacity;   // 下午的树枝透明度


box.addEventListener('mouseenter', (e) => {
    initPosition = e.pageX;
})

box.addEventListener('mousemove', (e) => {
    mouseMove = initPosition - e.pageX; // 小于0则表示鼠标再向右移动，否则鼠标在向左移动
    commonMove = mouseMove / 15;
    branchesMove = mouseMove / 11;
    snowMove = mouseMove / 5.5;
    snowRotate = mouseMove / 307;

    // 背景图片和视频的移动
    video.style.transform = 'translate(' + commonMove + 'px,0px)';  // 视频
    imgs[0].style.transform = 'translate(' + commonMove + 'px,0px)'; // 早上的背景图片
    imgs[1].style.transform = 'translate(' + commonMove + 'px,0px)'; // 下午的背景图片
    imgs[3].style.transform = 'translate(' + commonMove + 'px,0px)'; // 水汽

    // 雪球的位移
    imgs[2].style.transform = 'translate(' + (40 + snowMove) + 'px,' + (16 - mouseMove / 220) + 'px) rotate(' + (10 + snowRotate) + 'deg)';

    // 树枝的移动
    // for (let i = 4; i < 7; i++) {
    //     imgs[i].style.transform = 'translate(' + branchesMove + 'px,0px)';
    // }
    imgs[4].style.transform = 'translate(' + branchesMove + 'px,0px)';
    imgs[5].style.transform = 'translate(' + branchesMove + 'px,0px)';
    imgs[6].style.transform = 'translate(' + branchesMove + 'px,0px)';


    if (mouseMove < 0) { //鼠标向右移动
        // 在鼠标向右移动的过程中，视频、水汽和晚上的树枝的透明度均经过 0 ~ 1 的变化，其余不变
        // 并且三个元素的透明度变化速度各不相同
        videoOpacity = Math.abs(commonMove / 100) * 3;          // 视频的透明度
        steamOpacity = Math.abs(commonMove / 100) * 1.5;        // 水汽的透明度
        nightBranchOpacit = Math.abs(branchesMove / 100) * 2.2;   // 晚上树枝的透明度
        // 透明度超过 1 时均赋值为 1
        video.style.opacity = videoOpacity >= 1 ? 1 : videoOpacity;
        imgs[3].style.opacity = steamOpacity >= 1 ? 1 : steamOpacity;
        imgs[6].style.opacity = nightBranchOpacit >= 1 ? 1 : nightBranchOpacit;
    }
    else { // 鼠标向左移动
        // 鼠标向左移动过程中，下午的图片、雪球的图片和下午的树枝的透明度均经过 1 ~ 0 的变化，其余不变
        afternoonImgOpacity = 1 - (commonMove / 100) * 4;
        snowOpacity = 1 - (commonMove / 100) * 2.4;
        afternoonBranchOpacity = 1 - (commonMove / 100) * 3.2;
        // 透明度低于 0 时均赋值为 0
        imgs[1].style.opacity = afternoonImgOpacity <= 0 ? 0 : afternoonImgOpacity;         // 下午的图片透明度   
        imgs[2].style.opacity = snowOpacity <= 0 ? 0 : snowOpacity;                         // 雪球图片透明度
        imgs[5].style.opacity = afternoonBranchOpacity <= 0 ? 0 : afternoonBranchOpacity;   // 下午的树枝透明度   
    }
})

box.addEventListener('mouseleave', () => {
    //  鼠标从左到右移动离开图片区
    //  位移距离还原
    video.style.transform = 'translate(0,0)';
    imgs[0].style.transform = 'translate(0,0)';
    imgs[1].style.transform = 'translate(0,0)';
    imgs[2].style.transform = 'translate(40px, 16px) rotate(10deg)';
    imgs[3].style.transform = 'translate(0,0)';
    imgs[4].style.transform = 'translate(0,0)';
    imgs[5].style.transform = 'translate(0,0)';
    imgs[6].style.transform = 'translate(0,0)';

    // 透明度还原
    video.style.opacity = 0;
    imgs[3].style.opacity = 0;
    imgs[6].style.opacity = 0;

    // 鼠标从右到左离开图片区
    // 透明度还原
    imgs[1].style.opacity = 1;  // 下午的背景图片
    imgs[2].style.opacity = 1;  // 雪球图片
    imgs[5].style.opacity = 1;  // 下午的树枝图片
})

// 雪花特效 
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;

class Snow {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0.5;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
    }

    init() {
        this.x = Math.random() * this.canvas.width;
        this.vy = 0.3 + Math.random() * 1;
        this.radius = 1 + Math.random() * 3;
        this.alpha += Math.random() * 0.5;
        this.ctx.fillStyle = '#ffffff';
    }

    draw() {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

let snows = []
let cnt = 0;

function moveSnow(snow) {
    snow.y += snow.vy;
    if (snow.y >= canvas.height) {
        snow.y = 0
    }
    snow.draw();
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cnt++;
    if (cnt <= 60) {
        let snow = new Snow(canvas);
        snows.push(snow);
    }
    snows.forEach(moveSnow);
    window.requestAnimationFrame(drawSnow);
}

window.requestAnimationFrame(drawSnow);



