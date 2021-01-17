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
    if (window.pageYOffset >= 373) {
        sideBar.style.position = 'fixed';
        sideBar.style.top = '50px';
    }
    else {
        sideBar.style.position = 'absolute';
        sideBar.style.top = '365px';
    }
})

// 侧边栏点击后样式改变
let sideBtns = document.querySelectorAll('.side-bar a');
for (let i = 0; i < sideBtns.length; i++) {
    sideBtns[i].addEventListener('click', () => {
        for (let i = 0; i < sideBtns.length; i++) {
            sideBtns[i].className = '';
        }
        sideBtns[i].className = 'cur';
    })
}

// 侧边栏的滚动监听
let liveDiv = document.querySelectorAll('.live-box');
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




