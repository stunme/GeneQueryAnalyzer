var vSpecies,vProductName,vPlateNum,geneName,controlGene;
productOptions();
showLayout();
setSampleNum();
setDataTableHead();
setEmptyDataTable();

function productOptions(){
    vSpecies = $("#Species option:selected");

    $('select#ProductName>option').remove();

    var dataHtml = '';
    for (var i = 0;i<productList.length;i++){
        var dummy = eval(productList[i]);
        if(dummy[0] == vSpecies.text() || vSpecies.text() == "All Species"){
            dataHtml += "<option value='" + (productList[i]) + "'>";
            dataHtml += productList[i] + " - " + dummy[1];
            dataHtml += "</option>"
        }
    }
    $('select#ProductName').append(dataHtml);
}

function showLayout(){
    vProductName = $("#ProductName option:selected");

    $('table#productLayout>tbody>tr.plateRowHead').remove();
    $('table#productLayout>tbody>tr.plateRow').remove();
    
    var dataHtml = '';
    dataHtml += '<tr class="plateRowHead">';
    dataHtml += '<th>  </th>'
    for (var i = 1; i < 13; i++){
        dataHtml += '<th>' + i +  '</th>'
    }
    //alert(plateYIdx.length);
    geneName = eval(vProductName.val())[5].split(",");
    controlGene = eval(vProductName.val())[3].split(",");
    for (i = 0; i < plateYIdx.length; i++) {
        //alert(vProductName);
        dataHtml += '<tr class="plateRow">';
        dataHtml += '<td>' + (plateYIdx[i] || '&nbsp;') + '</td>';
        //alert(dataHtml);
        for (var j = 0; j<12; j++){
            dataHtml += '<td>' + (geneName[i*12+j] || '&nbsp;') + ' </td>';
        }
        dataHtml += '</tr>';
    }
    //alert(dataHtml);
    $('table#productLayout>tbody>tr').after(dataHtml);
// alert(vProductName.text())

}

function setSampleNum(){
    vPlateNum = $("#PlateNum option:selected");   
}

function setDataTableHead(){
    $('table#gqPlateData>tbody>tr').remove();
    dataHtml = '';
    dataHtml += '<tr>';
    dataHtml += '<td colspan="2"><div id="pasteAll"><span><p>Paste</p>All Data</span></div></th>';
    dataHtml += '<td>&nbsp;</td>';
    for (var i = 1; i<=vPlateNum.text();i++){
        dataHtml += '<td><div class="pastePlate"><span><p>Paste</p>Plate '+ (i) + '</span></div></td>';
    }
    dataHtml += '</tr>';
//    alert(dataHtml);
    //$('table#gqPlateData>tbody').append(dataHtml);
    //dataHtml = '';
    dataHtml += '<tr>';
    dataHtml += '<td>ID</td><td>Control</td><td>Gene</td>';
    for (var i = 1; i<=vPlateNum.text();i++){
        if(vPlateNum.text() == 1){
            dataHtml += '<td>Plate1';
        }else{
            dataHtml += '<td><div class="dropdown">';
            dataHtml += '<button class="dropbtn">Plate'+i+'</button>';
            dataHtml += '<div class="dropdown-content">';
            dataHtml += '<a>Ungroup</a>'
            dataHtml += '<a>Reference</a>';
            var GroupsNum = parseInt(vPlateNum.text()/2);
            for(var j=0;j<GroupsNum;){
                dataHtml += '<a>Group'+ (++j) +'</a>';
            }
            dataHtml += '</div></div>'
        }
        dataHtml += '</td>';    
    }
    dataHtml += '</tr>';
    $('table#gqPlateData>tbody').append(dataHtml);
    //alert($('table#gqPLateData').textContent);

    //设置分组后标签显示
    function setGroupName(index){
        
    }
    
    var PlateTitleColor = ["#f1f1f1", "#e9f3f9","#f9f8e9","#f1e9f9","#e9f9ec","#f9e9f4","#f9e9e9","#f9f9e9","#e5e5e5"];

    document.querySelectorAll('.dropdown-content').forEach((item,index)=>{
        item.querySelectorAll('a').forEach((itm,idx)=>{
                itm.addEventListener('click',function(){
                    
                    var current = document.getElementsByClassName('dropbtn')[index];
                    
                    switch(idx){
                        case 0:
                            var j = index+1;
                            current.innerText = 'Plate' + j;
                            break;
                        case 1:
                            current.innerText = 'Ref.';
                            break;
                        default:
                            var j = idx-1;
                            current.innerText = 'Group' + j;
                    }
                    if(idx<7){
                        current.parentNode.parentNode.style.backgroundColor = PlateTitleColor[idx];
                        document.querySelectorAll('.datarow').forEach((Row)=>{
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

    document.querySelectorAll('.pastePlate').forEach((item,index)=> {
        item.addEventListener('click',function(){
            navigator.clipboard.readText().then((clipboardData)=>{
                PasteOnePlate(clipboardData,index);
            })
        })   
    });   

    function PasteOnePlate(clipboardData,index){
        var data = clipboardData.split('\n');
        for (var i = 0; i<96; i++){
            if (!data[i]) {
                var tempData = []
                //continue ;
            }else{
                var tempData = data[i].split('\t');
            } 
            document.getElementsByClassName('datarow')[i].cells[3+index].innerText = tempData[0] || '';
        } 
    }

    document.getElementById('pasteAll').addEventListener('click',function(){
        navigator.clipboard.readText().then((clipboardData)=>{
            PasteAll(clipboardData);
        });
    });

    function PasteAll(clipboardData){
        var data = clipboardData.split('\n');
        var datarows = document.getElementsByClassName('datarow');
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
   // $('table#gqPlateData>tr.datarow').remove();
//    var data = clipboardData.getData('Text').split('\n');

    var dataHtml = '';
    for (var i = 0; i < 96; i++) {
        dataHtml += '<tr class="datarow">';
        dataHtml += '<td>' + (plateIdx[i] || '&nbsp;') + '</td>';
        
        if(controlGene.find(element => element ==i)){
            dataHtml += '<td>' + '<input type="checkbox" checked> ' + '</td>';
        }else{
            //alert(eval(vProductName.val())[4] + (plateIdx[i]))
            dataHtml += '<td>' + '<input type="checkbox"> ' + '</td>';
        }
        dataHtml += '<td>' + (geneName[i] || '&nbsp;') + '</td>';
        for (var j = 0;j<vPlateNum.text();j++){
            //alert(bugdetData[j]);
            dataHtml += '<td contenteditable="true">' + '&nbsp;' + '</td>';
        }
        dataHtml += '</tr>';     
    }
    $('table#gqPlateData>tbody').append(dataHtml);

}