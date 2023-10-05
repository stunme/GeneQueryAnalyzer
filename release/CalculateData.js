var allData=[];
function isNotValidData(){
    var temp;
    var isControl = false;
    controlGene=[];
    document.querySelectorAll('.datarow').forEach((item,index)=>{
        if(item.cells[1].firstElementChild.checked){
            controlGene.push(index);
            isControl = true;
        }else{
            isControl = false;
        }

        var tempData =[];
        for(var i = 0; i < vPlateNum.text();i++){
            temp = item.cells[3+i].innerText;
            if(temp<50 && temp>-1){
                if(temp==''){temp=0}
                if(isControl){
                    //need to do something!!!!!!!
                }
                tempData.push(temp);
            }else{
                return true;
            }
        }
        allData.push(tempData);
    });
    return false;
}

function isCaculateDone(){
    
}
