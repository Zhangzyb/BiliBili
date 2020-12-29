let lis = document.querySelectorAll('.dropdown')
let tabcate = document.querySelectorAll('.tab-cate div')
console.log(lis)

for (let i = 0; i < lis.length; i++){
    lis[i].onmouseover = function () {
        this.children[1].style.display = "block";
    }
    lis[i].onmouseout = function () {
        this.children[1].style.display = "none";
    }
}

for(let i = 0;i < tabcate.length;i++){
    tabcate[i].onclick = function () {
        for(let i = 0;i < tabcate.length;i++){
            tabcate[i].className = '';
        }
        tabcate[i].className = 'active';
    }
}
