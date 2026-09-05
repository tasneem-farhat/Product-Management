/******************************Call Variables**********************************/
let modeCU='create';
let modeS='bytitle';
let helper;

/****************inputs******************/
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let quantity=document.getElementById('quantity');
let category=document.getElementById('category');
let search=document.getElementById('search');

/**************outputs***********************/
let total=document.getElementById('total');
/*buttons*/
let createbtn=document.getElementById("create");
let deletealldiv=document.getElementById('deleteall');

/*****************************Functions***********************************/
function generateROW(product,index){
  return  `
          <tr>
            <td>${index+1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td> <button id="update" onclick="updateproduct(${index})" >Update</button></td>
            <td>
            <button id="delete" onclick="deleteproduct(${index})">Delete</button>
            </td>
            </tr>  
      `;
}

/******************Get Total Price*************/
function getTotal(){
    if(price.value.length >0){

    let result= Number(price.value) + Number(taxes.value) + Number(ads.value);

    if(discount.value.length >0){
      total.innerHTML=result- Number(discount.value);
      total.style.backgroundColor= "rgb(9, 159, 16)";
    }

    else{
      total.innerHTML=result;
      total.style.backgroundColor= "rgb(9, 159, 16)";
   }

  }else{
    total.style.backgroundColor="rgb(232, 90, 197)";
    total.innerHTML='';
  }
}

/******************Creat Product*********************/
let products;

if(localStorage.products !=null){
   products= JSON.parse(localStorage.products);
   
}else{
   products=[];
}

createbtn.onclick=function(){

  let product={
  title: title.value,
  price:Number(price.value),
  taxes:Number(taxes.value),
 ads:Number(ads.value),
 discount:Number(discount.value),
 category:category.value,
 total:total.innerHTML,
 quantity:Number(quantity.value),
  };
  if(title.value !="" && price.value!="" && category.value!="" && product.quantity <=100){
    if(modeCU==='create'){
    
      if(product.quantity > 1){
        for(let i=0;i<product.quantity;i++){
        products.push(product);
      }
    }
    else{
      products.push(product);
    }
  }

  else if(modeCU==='update'){
    products[helper]=product;
    modeCU='create';
    createbtn.innerHTML='Create';
    quantity.style.display='block';
  }
 clearInputs();
  }

 
  localStorage.setItem('products',JSON.stringify(products));
  
  showProduct();
}

/******************************Clear Inputs***********************************/
function clearInputs(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
category.value='';
quantity.value='';
total.innerHTML='';
total.style.backgroundColor="rgb(232, 90, 197)";
}
/*****************************Show Product************************************/

/*create delete all button */
  let deleteallbtn=document.createElement("button");
 
  deleteallbtn.classList.add("btnstyle");
  deletealldiv.appendChild(deleteallbtn);


function showProduct(){
    let table='';
    for(let i=0;i<products.length;i++){
      table+= generateROW(products[i],i);
    }
    document.getElementById("tbody").innerHTML=table;
  
 /***********Delete All**************** */

  if(products.length > 0){

  deletealldiv.style.display='block';
  deleteallbtn.innerHTML=`Delete All(${products.length})`;

   deleteallbtn.onclick=function(){
   {
    localStorage.removeItem('products');
    products.splice(0, products.length);
    showProduct();
   }
  }
  }else{
   deletealldiv.style.display='none';
  }
}
showProduct();
/****************Delete Product*************************/
function deleteproduct(i){
  products.splice(i,1);
 localStorage.products= JSON.stringify(products) ;
 showProduct();
}
/****************Update Product***************************/
function updateproduct(i){
  scroll({
    top:0,
    behavior:"smooth",
  });
 modeCU='update';
 helper=i;
  title.value=products[i].title;
  price.value=products[i].price;
  taxes.value=products[i].taxes;
  ads.value=products[i].ads;
  discount.value=products[i].discount;
  category.value=products[i].category;
  quantity.style.display='none';
  getTotal();

  createbtn.innerHTML="Update";
}

/**********************Search*****************************/

function search_mode(id){
  search.focus();
  search.value='';
  if(id==='bytitle'){
    modeS='bytitle';
    search.placeholder='Search By Title';
  }
 else if(id==='bycategory'){
   modeS='bycategory';
   search.placeholder='Search By Category';
  }
  showProduct();
}

function searchproducts(value){
  let table='';
   
    for(let i=0;i<products.length;i++){

    if(modeS=='bytitle'){

      if(products[i].title.includes(value) ){  
        table+= generateROW(products[i],i);
      }
  
    }
    else{
      if(products[i].category.includes(value) ){  
      table+= generateROW(products[i],i);
    }
  }
}
document.getElementById("tbody").innerHTML=table;
}