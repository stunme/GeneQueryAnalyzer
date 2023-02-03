$(document).ready(function(){
    $(document.body).bind({
        paste: function(e) {
            if (window.clipboardData) {
                return ;
            }
            var clipboardData = e.originalEvent.clipboardData;
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
                processData(clipboardData);
            }
        }
        return false;
    }

    var processData = function(clipboardData) {
        if (document.getElementsByClassName("GQAitem active")[0].getElementsByClassName("faNum2").length==1) {
            //alert(document.getElementsByClassName("GQAitem active")[0]);
        
            $('table#gqPlateData>tbody>tr.datarow').remove();
            var data = clipboardData.getData('Text').split('\n');
            var dataHtml = '';
            for (var i = 0; i < data.length && i < 96; i++) {
                if (!data[i]) {
                    continue ;
                }
                var bugdetData = data[i].split('\t');
                if(isNaN(bugdetData[0])){
                    alert("The data contain Non Number string");
                    dataHtml = ''
                    break;
                }
                //alert(vProductName);
                dataHtml += '<tr class="datarow">';
                dataHtml += '<td>' + (plateIdx[i] || '&nbsp;') + '</td>';
                dataHtml += '<td>' + (eval(vProductName.text())[i] || '&nbsp;') + '</td>';
                dataHtml += '<td contenteditable="true">' + (bugdetData[0] || '&nbsp;') + '</td>';
                dataHtml += '</tr>';
                
            }
            $('table#gqPlateData>tbody>tr').after(dataHtml);
        }
    };
});