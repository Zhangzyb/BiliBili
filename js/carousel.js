// 基于修改left值的轮播图
// 轮播图结构：

// 最外层盒子，确定轮播图片的大小。
// <div class="carousel-wrap"> 
//    包含所有图片的盒子，通过修改此盒子的left的值以动画的形式实现图片的改变。 
//    <div class="carousel"></div>   
//    小圆点可以控制显示哪张图片。
//    <div class="btn"></div>  
// </div>

let Carousel = (focusObj) => {
    const focusObjWidth = focusObj.offsetWidth;
    let carouselObj = focusObj.children[0];
    let carouselBtn = focusObj.children[1];
    //封装动画，参数：使用动画的对象、移动的距离、回调函数(可选)。
    let animate = (obj, target, callback) => {
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

    // 点击时给相应元素加上选中样式，并取消其他元素的选中样式。
    let changeClass = (obj, index, cur) => {
        for (let i = 0; i < obj.children.length; i++) {
            obj.children[i].className = '';
        }
        obj.children[index].className = cur;
    }

    // 根据图片数生成小圆点数，并为每个圆点绑定点击事件。
    for (let i = 0; i < carouselObj.children.length; i++) {
        let li = document.createElement('li');
        carouselBtn.appendChild(li);
        li.addEventListener('click', () => {
            changeClass(carouselBtn, i, 'cur');
            animate(carouselObj, -i * focusObjWidth);
        });
    }
    carouselBtn.children[0].className = 'cur';
    // 复制第一张图片以实现无缝轮播
    let copyChild = carouselObj.children[0].cloneNode(true);
    carouselObj.appendChild(copyChild);

    // 自动轮播
    let imgIndex = btnIndex = 0;
    let gloablTimer;
    let autoChange = () => {
        gloablTimer = setInterval(() => {
            if (imgIndex === carouselObj.children.length - 1) {
                carouselObj.style.left = 0;
                imgIndex = 0;
            }
            imgIndex++;
            animate(carouselObj, -imgIndex * focusObjWidth);
            btnIndex++;
            if (btnIndex === carouselBtn.children.length) {
                btnIndex = 0;
            }
            changeClass(carouselBtn, btnIndex, 'cur');
        }, 5000)
    }
    autoChange(); 
}

let carousel = document.querySelector('.carousel-wrap');
Carousel(carousel)



// let carousel = document.querySelector(".carousel")
// let carouselItems = carousel.children;
// let circleBtn = document.querySelector(".circle-btn");

// // 动画封装


// const carouselWidth = carousel.parentElement.offsetWidth;

// let curChange = () => {
//     for (let i = 0; i < circleBtn.children.length; i++) {
//         circleBtn.children[i].className = '';
//     }
// }

// for (let i = 0; i < carouselItems.length; i++) {
//     let li = document.createElement('li');
//     circleBtn.appendChild(li);
//     li.addEventListener('click', () => {
//         clearInterval(gloablTimer);
//         curChange();
//         circleBtn.children[i].className = 'cur';
//         animate(carousel, -i * carouselWidth, () => {
//             autoChange();
//         })
//     })
// }
// circleBtn.children[0].className = 'cur';
// let index = 0;
// let gloablTimer;

// 自动播放
// let autoChange = () => {
//     gloablTimer = setInterval(() => {
//         index++;
//         if (index == carouselItems.length) {
//             carousel.style.left = 0;
//             index = 0;
//         }
//         curChange();
//         circleBtn.children[index].className = 'cur';
//         animate(carousel, -index * 550);
//     }, 5000)
// }

// autoChange();

// carousel.addEventListener('mouseover', () => {
//     clearInterval(gloablTimer);
// })

// carousel.addEventListener('mouseleave', () => {
//     autoChange();
// })