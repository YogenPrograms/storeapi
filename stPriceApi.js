const express= require('express')
const con=require("./storedb")
const app= express()
const cors= require('cors')
const https = require('https');
const fs = require('fs');

app.use(express.json({
    limit:'10mb', extended:true
}))
app.use(express.urlencoded({extended:true, parameterLimit:1000000,limit:"10mb"}))
app.use(cors())

let keyenter;


app.get('/amhead',async(req,res)=>{
    console.log("get")
    con.query("SELECT * FROM amhead ORDER BY RAND() LIMIT 3",(error,result)=>{
console.log("hi")
        if(error)
        {
res.send("error")
        }else{
res.send(result)
console.log("this is outcou",result)
        }
        console.log("this is outcou",result)
    })

    
});

app.get('/amleft',async(req,res)=>{
    con.query("Select *from amleft ORDER BY RAND() LIMIT 10",(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get('/amcenterproduct',async(req,res)=>{
    con.query("Select *from amcenterproduct ORDER BY RAND() LIMIT 20",(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});

app.post('/amleft',async(req,res)=>{
    try{
        const dataList = req.body
    //       const datalistCount= dataList.length
    //   console.log("count is ",datalistCount)
    //       for (let i=0;i<datalistCount;i++)
    //       {
    
         
    //           const datalistitem=dataList[i]
        const datalistCount= dataList.result.length
    
        for (let i=0;i<datalistCount;i++)
       {
          const asin=dataList.result[i].asin
          const url=dataList.result[i].url
      const title=dataList.result[i].title
      const thumbnail=dataList.result[i].thumbnail
      let searchKey=keyenter
      let company="AMAZON"
    
      const collectProduct={asin,url,title,thumbnail,searchKey,company}
    
         const price=dataList.result[i].price
          const reviews=dataList.result[i].reviews
        
          const amazonProducts=Object.assign(collectProduct,price,reviews)
         console.log("datalist :",amazonProducts)
    
       await con.query('INSERT INTO amleft SET ?',amazonProducts,(error, result,fields) =>{
            if(error)
            {
    return res.send(error)
            }
        })
    
    }
    return res.send("amleft")
    }catch(error)
    {
    console.log(error)
    }

})
app.post('/amcenterproduct',async(req,res)=>{

    try{
        const dataList = req.body
    //       const datalistCount= dataList.length
    //   console.log("count is ",datalistCount)
    //       for (let i=0;i<datalistCount;i++)
    //       {
    
         
    //           const datalistitem=dataList[i]
        const datalistCount= dataList.result.length
    
        for (let i=0;i<datalistCount;i++)
       {
          const asin=dataList.result[i].asin
          const url=dataList.result[i].url
      const title=dataList.result[i].title
      const thumbnail=dataList.result[i].thumbnail
      let searchKey=keyenter
      let company="AMAZON"
    
      const collectProduct={asin,url,title,thumbnail,searchKey,company}
    
         const price=dataList.result[i].price
          const reviews=dataList.result[i].reviews
        
          const amazonProducts=Object.assign(collectProduct,price,reviews)
         console.log("datalist :",amazonProducts)
    
       await con.query('INSERT INTO amcenterproduct SET ?',amazonProducts,(error, result,fields) =>{
            if(error)
            {
    return res.send(error)
            }
        })
    
    }
    return res.send("amcenterproduct")
    }catch(error)
    {
    console.log(error)
    }

})
app.post('/amhead',async(req,res)=>{

    try{
        const dataList = req.body
    //       const datalistCount= dataList.length
    //   console.log("count is ",datalistCount)
    //       for (let i=0;i<datalistCount;i++)
    //       {
    
         
    //           const datalistitem=dataList[i]
        const datalistCount= dataList.result.length
    
        for (let i=0;i<datalistCount;i++)
       {
          const asin=dataList.result[i].asin
          const url=dataList.result[i].url
      const title=dataList.result[i].title
      const thumbnail=dataList.result[i].thumbnail
      let searchKey=keyenter
      let company="AMAZON"
    
      const collectProduct={asin,url,title,thumbnail,searchKey,company}
    
         const price=dataList.result[i].price
          const reviews=dataList.result[i].reviews
        
          const amazonProducts=Object.assign(collectProduct,price,reviews)
         console.log("datalist :",amazonProducts)
    
       await con.query('INSERT INTO amhead SET ?',amazonProducts,(error, result,fields) =>{
            if(error)
            {
    return res.send(error)
            }
        })
    
    }
    return res.send("amhead")
    }catch(error)
    {
    console.log(error)
    }
    
})

app.get('/:key',async(req,res)=>{
    const id=req.params.key
    keyenter=id
    console.log("main")
    con.query(`Select *from productdb where lower(searchKey) LIKE lower('%${id}%') OR lower(title) LIKE lower('%${id}%')
    ORDER BY total_reviews DESC LIMIT 30`,(error,result)=>{

        if(error)
        {   
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get('/leftPro/:key',async(req,res)=>{
    var id=req.params.key
    con.query(`Select *from leftproductdb where lower(searchKey) LIKE lower('%${id}%')
    OR lower(product_title) LIKE lower('%${id}%') OR lower(product_description) LIKE lower('%${id}%') ORDER BY 
    Case When store_name IN('Flipkart','Myntra','Amazon.in','Shopsy By Flipkart','Meesho','Hopscotch.in','FirstCry India','eBay','Croma','Reliance Digital','JioMart') THEN 1 ELSE 2 END
    LIMIT 30`,(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});








app.post('/',async(req,res)=>{

    try{
    const dataList = req.body
//       const datalistCount= dataList.length
//   console.log("count is ",datalistCount)
//       for (let i=0;i<datalistCount;i++)
//       {

     
//           const datalistitem=dataList[i]
    const datalistCount= dataList.result.length

    for (let i=0;i<datalistCount;i++)
   {
      const asin=dataList.result[i].asin
      const url=dataList.result[i].url
  const title=dataList.result[i].title
  const thumbnail=dataList.result[i].thumbnail
  let searchKey=keyenter
  let company="AMAZON"

  const collectProduct={asin,url,title,thumbnail,searchKey,company}

     const price=dataList.result[i].price
      const reviews=dataList.result[i].reviews
    
      const amazonProducts=Object.assign(collectProduct,price,reviews)
     console.log("datalist :",amazonProducts)

   await con.query('INSERT INTO productdb SET ?',amazonProducts,(error, result,fields) =>{
        if(error)
        {
return res.send(error)
        }
    })

}
return res.send("list of data")
}catch(error)
{
console.log(error)
}
}
)

app.post('/leftPro',(req,res)=>{
try{
    const mess=req.body
    
    const num=mess.data.length;

for(let i=0;i<num;i++)
{
const productRating=mess.data[i].product_rating
const productpageUrl=mess.data[i].product_page_url
const productOffpageUrl=mess.data[i].product_page_url
 const productSpecpageUrl=mess.data[i].product_specs_page_url
const productReviewcpageUrl=mess.data[i].product_reviews_page_url
const productNumReviewcpageUrl=mess.data[i].product_num_reviews
 const productPhoto= mess.data[i].product_photos[0];
 const product_title= mess.data[i].product_title;
  const product_description= mess.data[i].product_description;


  const store_name=mess.data[i].offer.store_name;
//  const store_rating=mess.data[i].offer.store_rating;
 const offer_page_url=mess.data[i].offer.offer_page_url;
 const price=mess.data[i].offer.price;

 searchKey=keyenter;


const productD={productRating,productpageUrl,productOffpageUrl
,productSpecpageUrl,productReviewcpageUrl,productNumReviewcpageUrl,productPhoto,product_title,
product_description,store_name,offer_page_url,price,searchKey}

// const productAttri=mess.data[i].product_attributes;



// const productTile= mess.data.product_title;
// const productDisc= mess.data.product_description;


// const productDetails=Object.assign(productD,productAttri,off
//     ,productTile,productDisc)

console.log("products are:",productD)
    
     con.query('INSERT INTO leftproductdb SET ?',productD,(error, result,fields) =>{
        if(error)
        {
return res.send(error)
        }
    })

}
return res.send("Left list of data")
}catch(error)
{
    console.log(error)
}
})
app.listen(4500)