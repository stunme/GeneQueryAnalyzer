//声明全局变量
var needCalData=true;
var PlateTitleColor;

//===============================
//标签事件

// 获取要操作的元素
const items=document.querySelectorAll('.gq-item');
const sections=document.querySelectorAll('section');

// 移除选中态
function removeActive(){
    // 移除标签选中态样式
    items.forEach(item=>{
        item.classList.remove('active');
    });
    // 移除内容区选中态样式
    sections.forEach(item=>{
        item.classList.remove('active')
    });
}

// 遍历所有标签
items.forEach((item,index)=>{
    // 为每个标签绑定点击事件
    switch(index){
        case 3:
            item.addEventListener('click',function(){
                if(needCalData){
                    if(!isNotValidData()){
                        groupSet[0]=new Set(Array.from(groupSet[0]).sort((a,b)=>a -b));
                    
                        //console.log("before setEmpty")
                        calculateData();
                        displayrefGene();
                        setDisplayTableHead()
                        setEmptyDisplayTable();
                        if(errToDisplay==1){
                            showData(toDisplay);
                        }else{
                            showDataMM(toDisplay);
                        }
                        drawScatter();
                        removeActive();
                        // 为当前标签添加选中样式
                        
                        item.classList.add('active');
                        // 为当前内容区添加选中样式
                        sections[index].classList.add('active');
                        needCalData = false;
                    }
                }else{
                    removeActive();
                        // 为当前标签添加选中样式

                    item.classList.add('active');
                        // 为当前内容区添加选中样式
                    sections[index].classList.add('active');
                }
            });
            break;
        case 2:
            item.addEventListener('click',function(){
                if(needCalData){
                    if(!isNotValidData()){
                        groupSet[0]=new Set(Array.from(groupSet[0]).sort((a,b)=>a -b));
                    
                        //console.log("before setEmpty")
                        calculateData();
                        displayrefGene();
                        setDisplayTableHead()
                        setEmptyDisplayTable();
                        if(errToDisplay==1){
                            showData(toDisplay);
                        }else{
                            showDataMM(toDisplay);
                        }
                        drawScatter();
                        removeActive();
                        // 为当前标签添加选中样式
                        
                        item.classList.add('active');
                        // 为当前内容区添加选中样式
                        sections[index].classList.add('active');
                        needCalData = false;
                    }
                }else{
                    removeActive();
                        // 为当前标签添加选中样式

                    item.classList.add('active');
                        // 为当前内容区添加选中样式
                    sections[index].classList.add('active');
                }
            });
            break;
        case 0:
            item.addEventListener('click',function(){
                if(vProductName.val()=='Custom'){
                    customLayoutGeneName();
                }
                needCalData = true;
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
            break;
        case 1:
            item.addEventListener('click',function(){
                if(vProductName.val()=='Custom'){
                    customInputGeneName();
                }
                needCalData = true;
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
            break;
        default:
            item.addEventListener('click',function(){
                needCalData = true;
                removeActive();
                // 为当前标签添加选中样式
                item.classList.add('active');
                // 为当前内容区添加选中样式
                sections[index].classList.add('active');
            });
    }
})

//第一标签，product selectiion 事件
var vSpecies,vProductName,vPlateNum,geneName, refGene;
var groupSet = new Array();
productOptions();
showLayout();
setSampleNum();
setDataTableHead();
setEmptyDataTable();

function customLayoutGeneName(){
    geneName=[];
    for (var i = 0; i<96; i++){
        geneName.push(document.getElementsByClassName('row-input')[i].cells[2].innerText);
    }
    var rowPlate = document.getElementsByClassName('row-plate');
    for(var i=0;i<8;i++){
        for(var j=1;j<13;j++){
            rowPlate[i].cells[j].innerText=geneName[i*12+j-1];
        }
    } 
}

function customInputGeneName(){
    geneName=[];
    var rowPlate = document.getElementsByClassName('row-plate');
    for(var i=0;i<8;i++){
        for(var j=1;j<13;j++){
            geneName.push(rowPlate[i].cells[j].innerText);
        }
    }    
    for (var i = 0; i<96; i++){
        document.getElementsByClassName('row-input')[i].cells[2].innerText = geneName[i] || '';
    }
}


function productOptions(){
    vSpecies = $("#sel-species option:selected");

    $('select#sel-productname>option').remove();

    var dataHtml = '';
    for (var i = 0;i<productList.length;i++){
        var dummy = eval(productList[i]);
        if(dummy[0] == vSpecies.text() || vSpecies.text() == "All Species"){
            dataHtml += "<option value='" + (productList[i]) + "'>";
            dataHtml += productList[i] + " - " + dummy[1];
            dataHtml += "</option>"
        }
    }
    $('select#sel-productname').append(dataHtml);
}

function showLayout(){
    vProductName = $("#sel-productname option:selected");

    $('table#layout-product>tbody>tr.row-plate-head').remove();
    $('table#layout-product>tbody>tr.row-plate').remove();
    
    var dataHtml = '';
    dataHtml += '<tr class="row-plate-head">';
    dataHtml += '<th>  </th>'
    for (var i = 1; i < 13; i++){
        dataHtml += '<th>' + i +  '</th>'
    }
    //alert(plateYIdx.length);
    geneName = eval(vProductName.val())[5].split(",");
    refGene = new Set(eval(vProductName.val())[3].split(",").map(Number));
    for (i = 0; i < plateYIdx.length; i++) {
        //alert(vProductName);
        dataHtml += '<tr class="row-plate">';
        dataHtml += '<td>' + (plateYIdx[i] || '&nbsp;') + '</td>';
        //alert(dataHtml);
        if(vProductName.val()=='Custom'){
            for (var j = 0; j<12; j++){
                dataHtml += '<td class="cell-gene-name" contenteditable="true"></td>';
            }
        }else{
            for (var j = 0; j<12; j++){
                dataHtml += '<td>' + (geneName[i*12+j] || '&nbsp;') + ' </td>';
            }
        }
        
        dataHtml += '</tr>';
    }
    //alert(dataHtml);
    $('table#layout-product>tbody>tr').after(dataHtml);
// alert(vProductName.text())

}

function setSampleNum(){
    vPlateNum = $("#sel-platenum option:selected");   
}

function setDataTableHead(){
    groupSet=[];
    var groupsNum = parseInt(vPlateNum.text()/2);
    groupSet.push(new Set()); //用来存所有plate,初始化在下面那个vPlateNum循环，从0开始
    groupSet.push(new Set()); //用来存Reference
    for (var i = 0;i<groupsNum;i++){
        groupSet.push(new Set());
    }

    $('table#data-input>tbody>tr').remove();
    dataHtml = '';
    dataHtml += '<tr>';
    dataHtml += '<td colspan="2"><div id="pasteAll"><span><p>Paste</p>All Data</span></div></th>';
    if(vProductName.val()=='Custom'){
        dataHtml += '<td><div id="btn-paste-name"><span><p>Paste</p>Name</span></div></td>';
    }else{
        dataHtml += '<td>&nbsp;</td>';
    }
    for (var i = 0; i<vPlateNum.text();i++){
        dataHtml += '<td><div class="btn-paste-plate"><span><p>Paste</p>Sample '+ (i+1) + '</span></div></td>';
        groupSet[0].add(i);
    }
    dataHtml += '</tr>';
//    alert(dataHtml);
    //$('table#data-input>tbody').append(dataHtml);
    //dataHtml = '';
    dataHtml += '<tr>';
    dataHtml += '<td>ID</td><td>Reference</td><td>Gene</td>';
    for (var i = 1; i<=vPlateNum.text();i++){
        if(vPlateNum.text() == 1){
            dataHtml += '<td>Sample1';
        }else{
            dataHtml += '<td><div class="dropdown">';
            dataHtml += '<button class="dropbtn">Sample'+i+'</button>';
            dataHtml += '<div class="dropdown-content">';
            dataHtml += '<a>Ungroup</a>'
            dataHtml += '<a>Ctrl Set</a>';
            for(var j=0;j<groupsNum;){
                dataHtml += '<a>Data Set'+ (++j) +'</a>';
            }
            dataHtml += '</div></div>'
        }
        dataHtml += '</td>';    
    }
    dataHtml += '</tr>';
    $('table#data-input>tbody').append(dataHtml);
    //alert($('table#data-input').textContent);

    //设置分组后标签显示
    function setGroupName(index){
        
    }
    
    PlateTitleColor = ["#f1f1f1", "#e9f3f9","#f9f8e9","#f1e9f9","#e9f9ec","#f9e9f4","#f9e9e9","#f9f9e9","#e5e5e5"];

    document.querySelectorAll('.dropdown-content').forEach((item,index)=>{
        item.querySelectorAll('a').forEach((itm,idx)=>{
                itm.addEventListener('click',function(){
                    
                    var current = document.getElementsByClassName('dropbtn')[index];
                    
                    groupSet.forEach((GSet)=>{
                        GSet.delete(index);
                    })

                    switch(idx){
                        case 0:
                            current.innerText = 'Sample' + (index+1);
                            groupSet[0].add(index);
                            break;
                        case 1:
                            current.innerText = 'Ctrl Set';
                            groupSet[1].add(index);
                            break;
                        default:
                            var j = idx-1;
                            current.innerText = 'Set ' + j;
                            groupSet[idx].add(index);
                    }
                    if(idx<7){
                        current.parentNode.parentNode.style.backgroundColor = PlateTitleColor[idx];
                        document.querySelectorAll('.row-input').forEach((Row)=>{
                            if(idx==0){
                                Row.cells[index+3].style.backgroundColor = "white";
                            }else{
                                Row.cells[index+3].style.backgroundColor = PlateTitleColor[idx];
                            }
                        }

                        )
                    }else{
                        current.parentNode.parentNode.style.backgroundColor = PlateTitleColor[7];
                    }

                })
            }
        )
    }
    )

    document.querySelectorAll('.btn-paste-plate').forEach((item,index)=> {
        item.addEventListener('click',function(){
            navigator.clipboard.readText().then((clipboardData)=>{
                PasteOnePlate(clipboardData,index);
            })
        })   
    });   
    
    if(vProductName.val()=='Custom'){
        document.getElementById('btn-paste-name').addEventListener('click',function(){
                navigator.clipboard.readText().then((clipboardData)=>{
                    pasteGeneName(clipboardData);
                })
            });
    }

    function pasteGeneName(clipboardData){
        var data = clipboardData.split('\n');
        for (var i = 0; i<96; i++){
            if (!data[i]) {
                var tempData = []
                //continue ;
            }else{
                var tempData = data[i].split('\t');
            } 
            document.getElementsByClassName('row-input')[i].cells[2].innerText = tempData[0] || '';
        }
    }
    
    function PasteOnePlate(clipboardData,index){
        var data = clipboardData.split('\n');
        for (var i = 0; i<96; i++){
            if (!data[i]) {
                var tempData = []
                //continue ;
            }else{
                var tempData = data[i].split('\t');
            } 
            document.getElementsByClassName('row-input')[i].cells[3+index].innerText = tempData[0] || '';
        } 
    }

    document.getElementById('pasteAll').addEventListener('click',function(){
        navigator.clipboard.readText().then((clipboardData)=>{
            PasteAll(clipboardData);
        });
    });

    function PasteAll(clipboardData){
        var data = clipboardData.split('\n');
        var datarows = document.getElementsByClassName('row-input');
        for (var i = 0; i<96; i++){
            
            if (!data[i]) {
                var tempData = []
                //continue ;
            }else{
                var tempData = data[i].split('\t');
            } 
            for(var j = 0; j<vPlateNum.text(); j++){
                datarows[i].cells[j+3].innerText = tempData[j] || '';
                
            }
        }
    }
}


function setEmptyDataTable(){
   // $('table#data-input>tr.row-input').remove();
//    var data = clipboardData.getData('Text').split('\n');

    var dataHtml = '';
    for (var i = 0; i < 96; i++) {
        dataHtml += '<tr class="row-input">';
        dataHtml += '<td>' + (plateIdx[i] || '&nbsp;') + '</td>';
        //console.log(i)
        if(refGene.has(i)){
            dataHtml += '<td>' + '<input type="checkbox" checked> ' + '</td>';
        }else{
            //alert(eval(vProductName.val())[4] + (plateIdx[i]))
            dataHtml += '<td>' + '<input type="checkbox"> ' + '</td>';
        }
        if(vProductName.val()=='Custom'){
            dataHtml += '<td class="cell-gene-name" contenteditable="true">'+ (geneName[i] || '&nbsp;') + '</td>';
        }else{
            dataHtml += '<td>' + (geneName[i] || '&nbsp;') + '</td>';
        }
        for (var j = 0;j<vPlateNum.text();j++){
            //alert(bugdetData[j]);
            dataHtml += '<td contenteditable="true">' + '&nbsp;' + '</td>';
        }
        dataHtml += '</tr>';     
    }
    $('table#data-input>tbody').append(dataHtml);

}

//粘贴数据事件
$(document).ready(function(){
    $(document.body).bind({
        paste: function(e) {
            if (window.clipboardData) {
                return ;
            }
            var clipboardData = e.originalEvent.clipboardData;
            //alert(clipboardData);
            processData(clipboardData);
        }
    });
    
    document.onkeyup = function(e) {
        if (window.clipboardData) {
            e = window.event || e;
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            if (ctrlKey && keyCode == 86) {
                var clipboardData = window.clipboardData;
                //alert(clipboardData);
                processData(clipboardData);
            }
        }
        return false;
    }

    var processData = function(clipboardData) {
        if (document.getElementsByClassName("gq-item active")[0].getElementsByClassName("faNum2").length==1) {
            //alert(document.getElementsByClassName("GQAitem active")[0]);
            
            if(clipboardData instanceof DataTransfer)
            {
                var data = clipboardData.getData('Text').split('\n');
            }else{
                var data = clipboardData.split('\n');
            }
            var datarows = document.getElementsByClassName('row-input');
            for (var i = 0; i<96; i++){
                
                if (!data[i]) {
                    var tempData = []
                    //continue ;
                }else{
                    var tempData = data[i].split('\t');
                } 
                for(var j = 0; j<vPlateNum.text(); j++){
                    datarows[i].cells[j+3].innerText = tempData[j] || '';
                    
                }
            }
           
        }
    };
    
    
});


//计算所有delta数值
var allData=[];
var sumControl=[];
var allDeltaCt=[];
var allDeltaRQ=[];
var groupedDeltaCt=[];
var groupedDeltaCtErr=[];
var groupedDeltaRQ=[];
var groupedDeltaRQErr=[];
var deltaDeltaCt=[];
var deltaDeltaCtErr=[];
var deltaDeltaRQ=[];
var deltaDeltaRQErr=[];
var dataHeader=[];
var toDisplay='groupedDeltaCt';
var errToDisplay=1;
var dataMap=new Map()
dataMap['groupedDeltaCt']="∆Ct"
dataMap['groupedDeltaRQ']="∆RQ"
dataMap['deltaDeltaCt']="∆∆Ct"
dataMap['deltaDeltaRQ']="∆∆RQ"

var inputs=document.getElementsByName("data-to-display");
for(var i=0;i<inputs.length;i++){
    inputs[i].addEventListener("change",function(){
        toDisplay = this.value;
        if(errToDisplay==1){
            showData(toDisplay);
        }else{
            showDataMM(toDisplay);
        }
    });
}

var inputErr=document.getElementsByName("error-to-display");
for(var i=0;i<inputErr.length;i++){
    inputErr[i].addEventListener("change",function(){
        errToDisplay = this.value;
        setDisplayTableHead()
        setEmptyDisplayTable();
        if(errToDisplay==1){
            showData(toDisplay);
        }else{
            showDataMM(toDisplay);
        }

    });
}


function fixTwo(num){
    return parseFloat(num.toFixed(2));
}

//检查所有数据，并存到allData.
function isNotValidData(){
    var temp;
    var isControl = false;
    refGene = new Set();
    sumControl=[];
    if(vProductName.val() == 'Custom'){
        geneName = [];
    }
    for(var k = 0;k<vPlateNum.text();k++){
        sumControl.push(0);
    }   
    var rows = document.getElementsByClassName("row-input");
    for(var j = 0; j<rows.length; j++){
        if(rows[j].cells[1].firstElementChild.checked){
            /*if(rows[j].cells[2].innerText==""){
                alert("Invalid reference gene symble in " + plateIdx[j]);
                return true;
            }*/
            isControl = true;
        }else{
            isControl = false;
        }
        var tempData =[];
        for(var i = 1; i<=vPlateNum.text();i++){
            temp = rows[j].cells[i+2].innerText;
            //console.log("-"+"-")
            if(temp<50 && temp>0){
                tempData.push(parseFloat(temp));
            }else if(temp==""){
                isControl = false;
                tempData.push(0);
            }else{
                //alert("Invalid data in "+ plateIdx[j] + " in Sample " + i);
                isControl = false;
                tempData.push(0);
                //return true;
            }            
        }
        allData.push(tempData);
        if(vProductName.val()=='Custom'){
            geneName.push(rows[j].cells[2].innerText)
        }
        if(isControl){
            refGene.add(j);
            for(var k = 0;k<vPlateNum.text();k++){
                sumControl[k]+= (tempData[k]);
            }
        }
    }
    if(refGene.size == 0){
        alert("No valid reference gene found.");
        return true;
    }
    return false;
}

function calculateData(){
    for(var i = 0;i < sumControl.length;i++){
        sumControl[i]=fixTwo(sumControl[i]/refGene.size);
    }
    allDeltaCt=[];
    allDeltaRQ=[];
    groupedDeltaCt=[];
    groupedDeltaCtErr=[];
    groupedDeltaRQ=[];
    groupedDeltaRQErr=[];
    deltaDeltaCt=[];
    deltaDeltaCtErr=[];
    deltaDeltaRQ=[];
    deltaDeltaRQErr=[];
    dataHeader=[];

    //赋值第i行Ct值到allDeltaCt
    //计算第i行RQ值到 allDeltaRQ
    for(var i=0;i<allData.length;i++){
        var tempCt=[];
        var tempRQ=[];    
        for(var j = 0;j<vPlateNum.text();j++){
            if(allData[i][j]==0){
                tempCt.push('');
                tempRQ.push('');
            }else{
                vCt = fixTwo(allData[i][j]-sumControl[j])
                tempCt.push(vCt);
                tempRQ.push(Math.pow(2,-vCt));
            }
        }
        allDeltaCt.push(tempCt);
        allDeltaRQ.push(tempRQ);
    }

    for(var j = 1; j<groupSet.length;j++){
        if(groupSet[j].size<1) continue;
        if (j==1){
            dataHeader.push("Control Set")
        }else{
            dataHeader.push("Data Set" + (j-1));
        }
        var idx = dataHeader.length-1;
        groupedDeltaCt.push([]);
        groupedDeltaCtErr.push([]);
        groupedDeltaRQ.push([]);
        groupedDeltaRQErr.push([]);

        if(groupSet[j].size==1){
            for(var i = 0;i<96;i++){
                vCt = allDeltaCt[i][Array.from(groupSet[j])[0]]
                groupedDeltaCt[idx].push(vCt);
                groupedDeltaCtErr[idx].push('');
                groupedDeltaRQ[idx].push(Math.pow(2,-vCt));
                groupedDeltaRQErr[idx].push('');
            }
        }else{
            for(var i=0;i<96;i++){
                var sum=0;
                var sumArray=[];
                for(var k of groupSet[j]){
                    if(allDeltaCt[i][k]==''){
                        continue;
                    }
                    var tmp = allDeltaCt[i][k]
                    sum += tmp;
                    sumArray.push(tmp);
                }
                
                vCt = fixTwo(sum/sumArray.length);
                if(sumArray.length ==0){
                    groupedDeltaCt[idx].push('');
                    groupedDeltaCtErr[idx].push('');
                    groupedDeltaRQ[idx].push('');
                    groupedDeltaRQErr[idx].push('');
                }else if(sumArray.length==1){
                    groupedDeltaCt[idx].push(vCt);
                    groupedDeltaCtErr[idx].push('');
                    vCt = Math.pow(2,-vCt)
                    groupedDeltaRQ[idx].push(vCt);                   
                    groupedDeltaRQErr[idx].push('');
                }else{
                    groupedDeltaCt[idx].push(vCt);
                    groupedDeltaCtErr[idx].push(fixTwo(Math.sqrt(sumArray.map(x => Math.pow(x - vCt, 2)).reduce((a, b) => a + b) / (sumArray.length-1))));
                    vCt = Math.pow(2,-vCt)
                    groupedDeltaRQ[idx].push(vCt);
                    groupedDeltaRQErr[idx].push(Math.pow(Math.E,Math.sqrt(sumArray.map(x => Math.pow(Math.log(Math.pow(2,-x)/vCt), 2)).reduce((a, b) => a + b) / (sumArray.length-1))));   
                }
            }
        }
    }   
    
    for(var k of groupSet[0]){
        dataHeader.push("Sample" + (k+1));
        var idx = dataHeader.length-1;
        groupedDeltaCt.push([]);
        groupedDeltaCtErr.push([]);
        groupedDeltaRQ.push([]);
        groupedDeltaRQErr.push([]);
        for(var i =0;i<96;i++){
            groupedDeltaCt[idx].push(allDeltaCt[i][k]);
            groupedDeltaCtErr[idx].push('');
            groupedDeltaRQ[idx].push(allDeltaRQ[i][k]);
            groupedDeltaRQErr[idx].push('');
        }
    }

    var temp=[];
    for(var i=0;i<96;i++){
        temp.push('');
    }
    deltaDeltaCt.push(temp);
    deltaDeltaCtErr.push(temp);
    deltaDeltaRQ.push(temp);
    deltaDeltaRQErr.push(temp);

    for(var j=1;j<dataHeader.length;j++){
        deltaDeltaCt.push([]);
        deltaDeltaCtErr.push([]);
        deltaDeltaRQ.push([]);
        deltaDeltaRQErr.push([]);
        for(var i=0;i<96;i++){
            if(groupedDeltaCt[j][i]=='' || groupedDeltaCt[0][i]==''){
                deltaDeltaCt[j].push('');
                deltaDeltaRQ[j].push('');
                deltaDeltaCtErr[j].push('');
                deltaDeltaRQErr[j].push('');
            }else{
                deltaDeltaCt[j].push(fixTwo(groupedDeltaCt[j][i]-groupedDeltaCt[0][i]));
                deltaDeltaRQ[j].push(groupedDeltaRQ[j][i]/groupedDeltaRQ[0][i]);
            
                if(groupedDeltaCtErr[j][i] == '' && groupedDeltaCtErr[0][i]==''){
                    deltaDeltaCtErr[j].push('');
                    deltaDeltaRQErr[j].push('');
                }else if(groupedDeltaCtErr[j][i] == '' || groupedDeltaCtErr[0][i]==''){
                    deltaDeltaCtErr[j].push(parseFloat(groupedDeltaCtErr[j][i] + groupedDeltaCtErr[0][i]));
                    deltaDeltaRQErr[j].push(parseFloat(groupedDeltaRQErr[j][i] + groupedDeltaRQErr[0][i]));
                }else{
                    deltaDeltaCtErr[j].push(Math.sqrt(Math.pow(groupedDeltaCtErr[j][i],2) + Math.pow(groupedDeltaCtErr[0][i],2)));
                    deltaDeltaRQErr[j].push(Math.pow(Math.E,Math.sqrt(Math.pow(Math.log(groupedDeltaRQErr[0][i]),2) + Math.pow(Math.log(groupedDeltaRQErr[j][i]),2))));
                }
            }
        }
    }
    allData = [];
}

function  displayrefGene(){
    $('table#ctrl-output>tbody>tr>td.cell-ref-gene').remove();
    var dataHtml='';
    for(var i of refGene){
        dataHtml += '<td class="cell-ref-gene">'
        dataHtml += geneName[i]+' (' + plateIdx[i] + ')';
        dataHtml += '</td>'
    }
    $('table#ctrl-output>tbody>tr#row-ref-gene').append(dataHtml);
}

function setDisplayTableHead(){
    $('table#data-output>tbody>tr').remove();
    var dataHtml='∆Ct';
    dataHtml += '<tr>';
    dataHtml += '<td>ID</td><td>Gene</td>';
    for(var k of dataHeader){
        dataHtml += '<td colspan="3">' + k + '</td>'
    }
    dataHtml += '</tr>';
    $('table#data-output>tbody').append(dataHtml);
}

function setEmptyDisplayTable(){
    var dataHtml = '';
    dataHtml += "<tr id='row-output-head'><td></td><td></td>"
    for (var j = 0;j<dataHeader.length;j++){
        //alert(bugdetData[j]);
        dataHtml += '<td>' + '' + '</td>';
        //console.log(errToDisplay)
        if(errToDisplay==1){
            dataHtml += '<td colspan="2">SD</td>';
        }else{
            dataHtml += '<td>Min</td>';
            dataHtml += '<td>Max</td>';
        }
    }
    dataHtml += '</tr>'
    for (var i = 0; i < 96; i++) {
        dataHtml += '<tr class="row-output">';
        dataHtml += '<td>' + (plateIdx[i] || '&nbsp;') + '</td>';
        dataHtml += '<td>' + (geneName[i] || '&nbsp;') + '</td>';
        for (var j = 0;j<dataHeader.length;j++){
            //alert(bugdetData[j]);
            dataHtml += '<td>' + '&nbsp;' + '</td>';
            if(errToDisplay==1){
                dataHtml += '<td colspan="2">' + '&nbsp;' + '</td>';
            }else{
                dataHtml += '<td>' + '&nbsp;' + '</td>';
                dataHtml += '<td>' + '&nbsp;' + '</td>';
            }

        }
        dataHtml += '</tr>';     
    }
    $('table#data-output>tbody').append(dataHtml);

}

function showData(dataType){
    var data = eval(dataType);
    var dataerr = eval(dataType+'Err');
    var idx = dataHeader.length*2;
    var datahead = document.getElementById('row-output-head');
    for(var j= 0;j<idx;j+=2){
        datahead.cells[j+2].innerText = dataMap[dataType];
        if(dataType.includes('RQ')){
            datahead.cells[j+3].innerText = 'GSD';
        }else{
            datahead.cells[j+3].innerText = 'SD';
        }
    }
    var datarows = document.getElementsByClassName('row-output');
    for (var i = 0; i<96; i++){
        for(var j = 0, k=0; j<idx; j+=2,k++){
            if(dataType.includes('RQ')){
                try{
                    if(data[k][i]>=1){
                        datarows[i].cells[j+2].innerText = data[k][i].toFixed(1);
                    }else{
                        datarows[i].cells[j+2].innerText = data[k][i].toPrecision(2);
                    }
                }catch{
                    datarows[i].cells[j+2].innerText ='';
                }
            }else{
                //console.table(data[k])
                try{
                    datarows[i].cells[j+2].innerText = data[k][i].toFixed(2);
                }catch{
                    datarows[i].cells[j+2].innerText ='';
                }
            }
            try{
                datarows[i].cells[j+3].innerText = dataerr[k][i].toFixed(2);
            }catch{
                datarows[i].cells[j+3].innerText ='';
            }
        }
    }
}

function showDataMM(dataType){
    var data = eval(dataType);
    var dataerr = eval(dataType+'Err');
    var idx = dataHeader.length*3;
    var datahead = document.getElementById('row-output-head');
    for(var j= 0;j<idx;j+=3){
        datahead.cells[j+2].innerText = dataMap[dataType];
        datahead.cells[j+3].innerText = 'Min';
        datahead.cells[j+4].innerText = 'Max';
    }
    var datarows = document.getElementsByClassName('row-output');
    for (var i = 0; i<96; i++){
        for(var j = 0, k=0; j<idx; j+=3,k++){
            if(dataType.includes('RQ')){
                try{
                    if(data[k][i]>=1){
                        datarows[i].cells[j+2].innerText = data[k][i].toFixed(1);
                    }else{
                        datarows[i].cells[j+2].innerText = data[k][i].toPrecision(2);
                    }
                }catch{
                    datarows[i].cells[j+2].innerText ='';
                    continue;
                }
                if(dataerr[k][i]=='') continue;
                try{
                    if(data[k][i]>=1){
                        datarows[i].cells[j+3].innerText = (data[k][i]/dataerr[k][i]).toFixed(2);
                    }else{
                        datarows[i].cells[j+3].innerText = (data[k][i]/dataerr[k][i]).toPrecision(2);
                    }
                }catch{
                    datarows[i].cells[j+3].innerText ='';
                }
                try{
                    if(data[k][i]>=1){
                        datarows[i].cells[j+4].innerText = (data[k][i]*dataerr[k][i]).toFixed(2);
                    }else{
                        datarows[i].cells[j+4].innerText = (data[k][i]*dataerr[k][i]).toPrecision(2);
                    }
                }catch{
                    datarows[i].cells[j+4].innerText ='';
                }
            }else{
                //console.table(data[k])
                try{
                    //console.log(data[k][i]);
                    datarows[i].cells[j+2].innerText = data[k][i].toFixed(2);
                }catch{
                    datarows[i].cells[j+2].innerText ='';
                    continue;
                }
                if(dataerr[k][i]=='') continue;
                try{
                    //console.log(dataerr[k][i])
                    datarows[i].cells[j+3].innerText = (data[k][i]-dataerr[k][i]).toFixed(2);
                }catch{
                    datarows[i].cells[j+3].innerText ='';
                }
                try{
                    datarows[i].cells[j+4].innerText = (data[k][i]+dataerr[k][i]).toFixed(2);
                }catch{
                    datarows[i].cells[j+4].innerText ='';
                }
            }
            

        }
    }
}


//chart.js
var currentChart

function drawScatter(){
    var ctx = document.getElementById('chart-main');
    var data = {
        //labels:[],
        datasets: [],
    };

    for(var i=0;i<groupedDeltaCt.length;i++){
        data['datasets'].push({'label':dataHeader[i],'data':[],'backgroundColor':'#'+Math.floor(Math.random()*16777215).toString(16)})
        for(var j =0;j<96;j++){
            if(groupedDeltaCt[0][j]==''||groupedDeltaCt[i][j]==''){
                data['datasets'][i]['data'].push({'x':0,'y':0});
            }else{
            data['datasets'][i]['data'].push({'x':-groupedDeltaCt[0][j],'y':-groupedDeltaCt[i][j]});
            }
        }
    }
  /*  for (var j=0;j<96;j++){
        data['labels'].push(geneName[j]+ " ("+plateIdx[j] +")");
    }*/
   
    var config = {
        type: 'scatter',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
                display: true,
                title: {
                    font: {
                        size: 16,
                        weight: 'bold',
                        lineHeight: 1.2,
                      },
                  display: true,
                  text: 'Data Set(s) Relative Gene Expression (log2) - ' + dataHeader[0],

                }
            },
            y: {
                display: true,
                title: {
                    font: {
                        size: 16,
                        weight: 'bold',
                        lineHeight: 1.2,
                      },
                    display: true,
                    text: 'Control Set Relative Gene Expression (log2)',
                },
            },
        },
            plugins: {
                legend: {
                position: 'chartArea',
                },
                title: {
                    font: {
                        size: 18,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                display: true,
                text: 'Relative Gene Expression Scatter Chart'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var label = context.dataset.label || '';
                            label +=':' 
                            label += geneName[context.dataIndex]+ " ("+plateIdx[context.dataIndex] +")   ∆∆RQ="
                            var ddRQ = Math.pow(2,parseFloat(context.parsed.y)-parseFloat(context.parsed.x));
                            if(ddRQ>=1){
                                label+=ddRQ.toFixed(1)
                            }else{
                                label+=ddRQ.toPrecision(2)
                            }
                            return label ;
                            //return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                        }
                    }
                }
            },
        },
      };
    
    if(currentChart instanceof Chart){
        currentChart.data=data;
        currentChart.options.scales.x.title.text='Data Set(s) Relative Gene Expression (log2) - ' + dataHeader[0];
        currentChart.update();
    }else{
        currentChart = new Chart(ctx, config);
    }
}
//<p>∆∆RQ = = 2^-∆∆Ct = 2^-(∆Ctsample-∆Ctctrl)</p>


var copyBtn = document.querySelector('#btn-copy');
copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText($("#data-output")[0].outerText).then(
        () => {
            alert("Copied the data to Clipboard")
        },
        () => {
            alert("Sorry! Something wrong with copying the data")
        }
      );
}, false);
