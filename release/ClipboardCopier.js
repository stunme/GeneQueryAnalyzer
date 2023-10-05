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
        if (document.getElementsByClassName("GQAitem active")[0].getElementsByClassName("faNum2").length==1) {
            //alert(document.getElementsByClassName("GQAitem active")[0]);
            
            if(clipboardData instanceof DataTransfer)
            {
                var data = clipboardData.getData('Text').split('\n');
            }else{
                var data = clipboardData.split('\n');
            }
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
            /*var dataHtml = '';
            for (var i = 0; i < 96; i++) {
                if (!data[i]) {
                    var tempData = []
                    //continue ;
                }else{
                    var tempData = data[i].split('\t');
                } 
                dataHtml += '<tr class="datarow">';
                dataHtml += '<td>' + (plateIdx[i] || '&nbsp;') + '</td>';
                dataHtml += '<td>' + (geneName[i] || '&nbsp;') + '</td>';
                if(controlGene.find(element => element ==i)){
                    dataHtml += '<td>' + '<input type="checkbox" checked> ' + '</td>';
                }else{
                    //alert(eval(vProductName.val())[4] + (plateIdx[i]))
                    dataHtml += '<td>' + '<input type="checkbox"> ' + '</td>';
                }
                for (var j = 0;j<vPlateNum.text();j++){
                    
                    if(tempData[j] && isNaN(tempData[j])){
                        alert("The data contain Non Number string");
                        return;
                    }
                    dataHtml += '<td contenteditable="true">' + (tempData[j] || '&nbsp;') + '</td>';
                }
                dataHtml += '</tr>';
                
            }
            $('table#gqPlateData>tbody>tr.datarow').remove();
            $('table#gqPlateData>tbody').append(dataHtml);*/
        }
    };
    
    
});