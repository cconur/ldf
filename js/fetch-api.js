const head = document.getElementById("masthead");


let loader = `<div id="loader"><span class="loader"></span></div>`;

const myList = document.getElementById("loop");

myList.innerHTML = loader;

const aboutMeInfo = document.getElementById("about");

const myFilter = document.getElementById("filter-categories");

const myRequest = new Request("https://sheets.googleapis.com/v4/spreadsheets/1jDNUuG-BMQvuGj9IJTOpJ-RJQ1kWVMCUr8ojnD3w8Qw/values/products?alt=json&key=AIzaSyBbtrtE2hRGXFyyNiGPIoh4TPPZpoO2LeY");

fetch(myRequest)
//fetch(myRequest,  {
//        mode: 'cors',
//        headers: {
//            'Content-Type': 'application/json',
//            'Access-Control-Allow-Origin': '*',
//            'X-Content-Type-Options': 'nosniff'
//        },
//        method: 'GET',
//        dataType: "jsonp",
//        credentials: 'include'
//    })
  .then((response) => response.json())
  .then((values) => {
    myList.innerHTML = '';

    console.log(values); 
        const matrix = values["values"]

        console.log(matrix);
    
        console.log(matrix[0].length);
        console.log(matrix.length);


        //replace special characters
        const chars = {
          ' ': '-',
          '_': '-',
          'á': 'a',
          'é': 'e',
          'í': 'i',
          'ó': 'o',
          'ú': 'u',
          'ñ': 'n'
        };
        let t = Object.keys(chars);
        let u = Object.values(chars);
        var re = new RegExp('['+t+']','g');

        // vacate headers/keys
        let keys = matrix.shift()
        // create JSON objects from Array
        let result = matrix.map(arr =>
            Object.assign({}, ...arr.map((x, i) => ({ [keys[i]]: x })))
        );

        console.log(result);

        let arr = [];
            for(let i = 0; i < result.length; i++){
            let rowInfo = result[i]
            let resultsCat = rowInfo.categoria
            console.log(resultsCat);
            arr.push(resultsCat);
            }
            
            console.log(arr);

            function onlyUnique(value, index, array) {
              return array.indexOf(value) === index;
            }


            var unique = arr.filter(onlyUnique);

            console.log(unique);
        


        for(let i = 0; i < result.length; i++){
            let rowInfo = result[i]
            const newDiv = document.createElement("div");

            if (rowInfo.vari == "TRUE" || "FALSE") {

            newDiv.className = "col-lg-4 col-sm-6 filter portfolio-product";
            newDiv.classList.add(rowInfo.categoria);
                        if (rowInfo.vari == "TRUE") {
                            newDiv.innerHTML += `
                        <a class="portfolio-box" href="${rowInfo.foto}" title="${rowInfo.nombre}">
                            <img class="img-fluid img-thumbnail object-fit-fill" src="${rowInfo.foto}" alt="labores de flores" />
                        </a>
                        <div class="row info-product mt-3">
                            <div class="project-category col-12 tag ${rowInfo.categoria.replace(re, m => chars[m]).toLowerCase()}" style="background-color: ${rowInfo.color}">${rowInfo.categoria}</div>
                            <div class="project-price col-sm-auto">${rowInfo.precio}</div>
                            <div class="project-name col-sm">${rowInfo.nombre}</div>
                            <div class="project-vari col-sm-auto">${rowInfo.vari}</div>
                            <div class="project-add col-sm-auto text-center"><button class="add" data-toggle="tooltip" data-placement="bottom" title="Al puslar se añadirá en el formulario de contacto"><i class="fa fa-heart fa-lg" aria-hidden="true"></i></button></div>
                            </div>
                            <div id="options" align="center" class="d-flex justify-content-center mb-3">
                                <button class="btn btn-default p-05 col" data-filter="detalles">Ver detalles</button>
                            </div>
                            `;
                        }

                        else if (rowInfo.vari == "FALSE") {
                            newDiv.innerHTML += `
                        <a class="portfolio-box" href="${rowInfo.foto}" title="${rowInfo.nombre}">
                            <img class="img-fluid img-thumbnail object-fit-fill" src="${rowInfo.foto}" alt="labores de flores" />
                        </a>
                        <div class="row info-product mt-3">
                            <div class="project-category col-12 tag ${rowInfo.categoria.replace(re, m => chars[m]).toLowerCase()}" style="background-color: ${rowInfo.color}">${rowInfo.categoria}</div>
                            <div class="project-price col-sm-auto">${rowInfo.precio}</div>
                            <div class="project-name col-sm">${rowInfo.nombre}</div>
                            <div class="project-vari col-sm-auto">${rowInfo.vari}</div>
                            <div class="project-add col-sm-auto text-center"><button class="add" data-toggle="tooltip" data-placement="bottom" data-bs-toggle="modal" data-bs-target=".bd-contact-modal-lg" title="Al puslar se añadirá en el formulario de contacto"><i class="fa fa-heart fa-lg" aria-hidden="true"></i></button></div>
                            </div>
                            <div id="options" align="center" class="d-flex justify-content-center mb-3">
                                <button class="btn btn-default p-05 col" data-filter="detalles">Ver detalles</button>
                            </div>
                            `;
                        }

            

            }

            if (rowInfo.vari == "TRUE") {

            var myVariants = document.createElement('div');
            console.log(rowInfo.variantes);
            const csv = rowInfo.variantes;

            function CsvToArr(stringVal, splitter) {
                const [keys, ...rest] = stringVal.trim().split('\n').map((item) => item.split(splitter))
                
                const formedArr = rest.map((item) => {
                    const object = {}
                    keys.forEach((key, index) => object[key] = item.at(index))
                    return object
                })
                return formedArr;
            }
            var variants = CsvToArr(csv, ',');
            console.log(variants);
            for(let j = 0; j < variants.length; j++){
                        let rowVariant = variants[j]
                        const newDiv1 = document.createElement("div");
                        newDiv1.classList.add("color");
                        newDiv1.setAttribute("style", "background-color: "+rowVariant.hex);
                        newDiv1.setAttribute("data-hex", rowVariant.hex);
                        newDiv1.innerHTML = `
                        <p class="color-name col">${rowVariant.color}</p>
                        `;
                        //console.log(rowVariant.hex);
                        console.log(newDiv1);
            myVariants.appendChild(newDiv1);           
            };
            
            console.log(myVariants);


            
            newDiv.innerHTML += `
                        <div class="details col-sm" id="details" style="display: none;">
                            <h6><i class="fa fa-palette me-2" aria-hidden="true"></i>Color: </h6><p class="color-selected"></p>
                            <div id="colors" class="colors row">${myVariants.innerHTML}</div>
                            <h6><i class="fa fa-align-left me-2" aria-hidden="true"></i>Descripción: </h6><p>${rowInfo.descripcion}</p>
                            <h6><i class="fa fa-arrows-h me-2" aria-hidden="true"></i>Medidas:  </h6><p>${rowInfo.medidas}</p>
                        </div>
                `;

            }
            
            else if (rowInfo.vari == "FALSE") {

            newDiv.innerHTML += `
                        <div class="details col-sm" id="details" style="display: none;">
                            <h6><i class="fa fa-align-left me-2" aria-hidden="true"></i>Descripción: </h6><p>${rowInfo.descripcion}</p>
                            <h6><i class="fa fa-arrows-h me-2" aria-hidden="true"></i>Medidas:  </h6><p>${rowInfo.medidas}</p>
                        </div>
                `;
            }

            else if (rowInfo.vari == "ABOUT") {

            newDiv.className = "about";
            newDiv.classList.add(rowInfo.categoria);
            newDiv.innerHTML = `
                        <div class="container px-5">
                            <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                                <div class="col-sm-12 col-md-6 text-center">
                                    <h2 class="text-white mt-0">${rowInfo.nombre}</h2>
                                    <hr class="solid-light my-4">
                                    <p class="text-white-75 mb-4 px-2">${rowInfo.descripcion}</p>
                                </div>
                                <div class="col-sm-12 col-md-6 text-center">
                                    <div class="px-3 px-sm-0"><img class="img-fluid " src="${rowInfo.foto}" alt="labores de flores"></div>
                                </div>
                            </div>
                        </div>
                `;

            }


        if (rowInfo.vari == "HEAD") {
        head.style.background = 'linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url('+rowInfo.foto+')';
        head.style.backgroundSize = 'cover';
        }
        else if (rowInfo.vari == "ABOUT") {
        aboutMeInfo.appendChild(newDiv);
        }        
        else {
        myList.appendChild(newDiv);
        }


    }


            for(let i = 0; i < unique.length; i++){
            let rowInfo = unique[i]
            
            console.log(rowInfo);


            const newDiv = document.createElement("button");
            newDiv.className = "btn btn-default filter-button p-2";
            newDiv.dataset.filter = rowInfo;
            newDiv.innerHTML = rowInfo.replace("-", " ");

          myFilter.appendChild(newDiv);

    }

            const newButton = document.createElement("button");
            newButton.className = "btn btn-default p-2 search";
            newButton.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
            myFilter.appendChild(newButton);




    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });


    $(".form-control").focus(function(){
      $(".form-check.legal").show('3000'); 
    });



    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

$(document).ready(function(){

        $(".filter-button").click(function(){
            var value = $(this).attr('data-filter');
            
            $(".search").removeClass("active");
            $('#search-field').hide('3000');
            if(value == "all")
            {
                
                $('.filter').show('1000');
            }
            else
            {
                $(".filter").not('.'+value).hide('3000');
                $('.filter').filter('.'+value).show('3000');
                
            }
        });


});


$(document).ready(function() {
    $(".filter-button").click(function () {
        $(".filter-button").removeClass("active");

        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).addClass("active");   
    });


    $(".search").click(function () {
        // $(".tab").addClass("active"); // instead of this do the below 

        if ($('#search-field').is(":visible")) {
            $( "#myInput" ).trigger( "focus" );
        }
        else {
            $(".filter-button[data-filter='all']").click();
            $(".filter-button").removeClass("active");
            $('#search-field').show('0');
            $(this).addClass("active");
            $( "#myInput" ).trigger( "focus" );
        }
    });



    $('input.deletable').wrap('<span class="deleteicon"></span>').after($('<span><i class="fa fa-times-circle fa-lg" aria-hidden="true"></i></span>').click(function() {
        $(this).prev('input').val('').trigger('change').focus();
    }));


    $("#options .btn").click(function () {
        $(this).toggleClass("active");
        $(this).parent().next(".details").toggle('1000');
        $(this).text(function(i, v){
             return v === 'Ver detalles' ? 'Ocultar detalles' : 'Ver detalles'
         })
    });
});


$(document).ready(function(){

    $(".add").click(function(){
        var name = $(this).parent().parent().find("div.project-name").text();
        var cat = $(this).parent().parent().find("div.project-category").text();
        var price = $(this).parent().parent().find("div.project-price").text();
        var vari = $(this).parent().parent().find("div.project-vari").text();
        var color = $(this).parent().parent().parent().find("div.details").find(".color-selected").text();
        var hexColorSel = $(".color.active").attr('data-hex');

        var catClass = cat.replace(re, m => chars[m]).toLowerCase();
        var nameClass = name.replace(re, m => chars[m]).toLowerCase();
        var colorClass = color.replace(re, m => chars[m]).toLowerCase();

        var selector = nameClass+"-"+colorClass;
        var target = document.getElementById("tittle-cart-items");
        var newField = document.createElement("div");
        newField.className = "form-check form-check-inline";
        
            newField.classList.add(nameClass);
        
        if ((vari == "TRUE") && ($(".color.active").length > 0) && ($('.'+nameClass+'.'+colorClass).length === 0)){
        $(this).addClass("active");
        
        //var color = $(this).parent().parent().parent().find("div.details").find("div.colors").find("div.color.active").attr("data-hex");

            newField.classList.add(colorClass);
            newField.innerHTML = `
                        <input class="form-check-input" type="checkbox" id="productos-${nameClass}-${colorClass}" name="productos" value="${catClass}-${nameClass}-${colorClass}" checked />
                        <label class="form-check-label" for="productos-${nameClass}-${colorClass}">${cat} :: ${color} :: ${name} :: ${price}</label>
        `;
            target.after(newField);
            $('.cart-items').show('1000');
            // document.getElementById("tittle-cart-items").scrollIntoView( {behavior: "smooth" });
          
            $(this).parent().parent().parent().find(".info-product .project-vari").css("background-color", hexColorSel);
            $(this).parent().parent().parent().find(".info-product .project-vari").css("font-size", "0");
            $(this).parent().parent().parent().find(".info-product .project-vari").show();
          
            $(this).parent().parent().parent().find("#options .btn").click();
            $(this).attr("data-bs-original-title", "Al puslar se añadirá en el formulario de contacto más abajo");
            //Reseteo el color de la variante:
            //$(".color").removeClass("active");
            //$(this).parent().parent().parent().find("div.details").find(".color-selected").text("");
            //console.log($('.'+selector).length);
        }
        else if ((vari == "TRUE") && ($(".color.active").length === 0)) {
            alert("Debes elegir un color para la categoria: "+cat.toUpperCase());
                if (!$(this).parent().parent().parent().find("#options .btn").hasClass("active")) {
                    $(this).parent().parent().parent().find("#options .btn").click(); 
                    $(this).parent().parent().parent().parent().find(".portfolio-product").get( 0 ).scrollIntoView( {behavior: "smooth", block: "start" });
                }
    
        }
        else if ((vari == "TRUE") && ($('.'+nameClass+'.'+colorClass).length > 0)) {
            alert("Ya has añadido el producto: "+name+", color: "+color);
            $(this).tooltip('dispose');
            $(this).tooltip('hide');
        }

        if ((vari == "FALSE") && ($('.'+nameClass).length === 0)) {

            $(this).addClass("active");
            newField.innerHTML = `
                        <input class="form-check-input" type="checkbox" id="productos-${nameClass}" name="productos" value="${catClass}-${nameClass}" checked />
                        <label class="form-check-label" for="productos-${nameClass}">${cat} :: ${name} :: ${price}</label>
        `;;
            target.after(newField);
            $('.cart-items').show('1000');
            // document.getElementById("tittle-cart-items").scrollIntoView( {behavior: "smooth" });
        }

        else if ((vari == "FALSE") && ($('.'+nameClass).length > 0)) {
            alert("Ya has añadido el producto: "+name);
            $(this).tooltip('dispose');
            $(this).tooltip('hide');
        }


    });
});


$(document).ready(function(){

let t = Object.keys(chars);
let u = Object.values(chars);

var rtt = ' _áéíóúñ';
var re = new RegExp('['+t+']','g');
let s = 'áopt é_qwñíáááúó aá ññññ_ ';
s = s.replace(re, m => chars[m]);

for (var i in t) {
  console.log(t[i]); //output of keys as string
}
console.log(s);
console.log(t);
console.log(u);

});


$(document).ready(function(){

    $(".color").click(function(){
        $(".color").removeClass("active");
        $(this).addClass("active");
        var colorName = $(this).find(".color-name").text();
        $(this).parent().parent().find(".color-selected").text(colorName);

        $(this).parent().parent().parent().find("button.add").attr("data-bs-original-title", "Pulsa aquí para añadir");
        $(this).parent().parent().parent().find(".info-product").get( 0 ).scrollIntoView( {behavior: "smooth", block: "start" });
        $(this).parent().parent().parent().find("button.add").tooltip('dispose');
        $(this).parent().parent().parent().find("button.add").tooltip('show');

        $(this).parent().parent().parent().find("button.add").attr("data-bs-toggle", "modal");
        $(this).parent().parent().parent().find("button.add").attr("data-bs-target", ".bd-contact-modal-lg");

    });
});


$(document).ready(function(){

    $(".legal").click(function(){
     //   $(".btn.footer").click();
    });
});



})
.catch(console.error);




