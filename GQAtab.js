// 获取要操作的元素
const items=document.querySelectorAll('.GQAitem');
const sections=document.querySelectorAll('section');

// 移除选中态
function removeActive(){
    // 移除标签选中态样式
    items.forEach(item=>{
        item.classList.remove('active');
    });
    // 移除内容区选中态样式
    sections.forEach(item=>{
        item.classList.remove('active');
    });
}

// 遍历所有标签
items.forEach((item,index)=>{
    // 为每个标签绑定点击事件
    switch(index){
        case 3:
            item.addEventListener('click',function(){
                if(isNotValidData()){
                    alert("Invalid data found. Please check your input.");
                    return;
                }
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
            break;
        case 2:
            item.addEventListener('click',function(){
                if(isNotValidData()){
                    alert("Invalid data found. Please check your input.");
                    return;
                }
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
            break;
        default:
            item.addEventListener('click',function(){
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
    }
    /*
    item.addEventListener('click',function(){      
        if(index == 3){
            if(isNotValidData() || !isCaculateDone()){
                alert("Invalid data found. Please check your input.");
                return;
            }
        }
        if(index ==4){
            
            
        }

            // 移除选中态样式
            removeActive();
            // 为当前标签添加选中样式
            item.classList.add('active');
            // 为当前内容区添加选中样式
            sections[index].classList.add('active');
        
    })*/
})