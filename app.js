const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const rub = document.querySelector("#rub");

// som.addEventListener("input", () => {
//     const request = new XMLHttpRequest();
//     request.open("GET", "data.json");
//     request.setRequestHeader("Content-type", "application/json");
//     request.send();
//     request.addEventListener("load", () => {
//         // console.log(JSON.parse(request.response));
//         const responce = JSON.parse(req.responce);
//         usd.value = (som.value / responce.usd).toFixed(2);
//     });
// });

const convert = (elem, target, isTrue) => {
    elem.addEventListener("input", () => {
        const req = new XMLHttpRequest();
        req.open("GET", "data.json");
        req.setRequestHeader("Content-type", "application/json");
        req.send();

        req.addEventListener("load", () => {
            const response = JSON.parse(req.response);
            if (elem === som) {
                target.value = (elem.value / response.usd).toFixed(3);
            } else if (elem === usd) {
                target.value = (elem.value * response.usd).toFixed(3);
            } else if (elem === rub) {
                target.value = (elem.value * response.rub).toFixed(3);
            } else {
                target.value = (elem.value / response.rub).toFixed(3);
            }

            // isTrue
            //     ? (target.value = (elem.value / response.usd).toFixed(2))
            //     : (target.value = (elem.value * response.usd).toFixed(2));
            // elem.value === "" ? target.value = "" : null;
            elem.value === "" && (target.value = "");
        });
    });
};

convert(som, usd, 15);
convert(usd, som, "");
convert(som, rub, "");
convert(rub, som, "");
convert(usd, rub, "");
convert(rub, usd, "");

const forms = document.querySelectorAll("form");

forms.forEach((item) => {
    postData(item);
});

function postData(form){
    form.addEventListener("submit", (e)=> {
        e.preventDefault();

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-typ", "application/json");

        const formData = new FormData(form);
        const obj = {};

        formData.forEach((item, i) => {
            obj[i] = item;
        });
        const json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("load", ()=>{
            if((request.status = 200)){
                console.log(request.response);
            }
        });
    });
}