let lis = document.querySelectorAll('.dropdown')

console.log(lis)

for (let i = 0; i < lis.length; i++){
    lis[i].onmouseover = function () {
        this.children[1].style.display = "block";
    }
    lis[i].onmouseout = function () {
        this.children[1].style.display = "none";
    }
}
