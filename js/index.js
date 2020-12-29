let lis = document.querySelectorAll('.dropdown')
let tabcate = document.querySelectorAll('.tab-cate div')
let tab_list = document.querySelectorAll('.tab-list li')
let items = document.querySelectorAll('.item')

console.log(tab_list)

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

for (let i = 0;i < tab_list.length;i++) {
    tab_list[i].onclick = function() {
        console.log(i)
        for (let i = 0;i < tab_list.length;i++){
            console.log(i)
            tab_list[i].className = '';
            items[i].style.display = 'none';
        }
        tab_list[i].className = 'current';
        items[i].style.display = 'block';
    }
}