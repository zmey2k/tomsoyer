let params={};

function addUs(){
    params.country='us';
};

function addUk(){
    params.country='uk';
};

function addAr(){
    params.country='ar';
};

function addDe(){
    params.country='de';
};

function addAll(){
    params.platform='All';
};

function addiOS(){
    params.platform='iOS';
};

function addAndroid(){
    params.platform='Android';
};


function Execute(){
    //alert(params.country+params.platform);
    const data=fetch("./"+params.country+params.platform+".json").then(function(resp){
        return resp.json();
    }).then(function(data){
        clearTableUS(data);
        buildTableUS(data);
    });
    function clearTableUS(d){
        let table=document.getElementById('buildTable');
        for(let i=0; i<d.length; i++){
            let row=`<tr>
                        <td>${d[i].data_date}</td>
                        <td>${d[i].estimated_ecpm}</td>
                    </tr>`
            table.innerHTML=''
        };
    };
    function buildTableUS(d){
        let table=document.getElementById('buildTable');
        for(let i=0; i<d.length; i++){
            let row=`<tr>
                        <td>${d[i].data_date}</td>
                        <td>${d[i].estimated_ecpm}</td>
                    </tr>`
            table.innerHTML+=row
        };
    };
}



