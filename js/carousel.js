// 基于修改left值的轮播图
// 轮播图结构：

// 最外层盒子，确定轮播图片的大小。
// <div class="carousel-wrap"> 
//    包含所有图片的盒子，通过修改此盒子的left的值以动画的形式实现图片的改变。 
//    <div class="carousel"></div>   
//    小圆点可以控制显示哪张图片。
//    <div class="btn"></div>  
// </div>

// 点击时给相应元素加上选中样式，并取消其他元素的选中样式。


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
