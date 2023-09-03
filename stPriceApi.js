const express= require('express')
const con=require("./storedb")
const app= express()
const cors= require('cors')

app.use(express.json({
    limit:'10mb', extended:true
}))
app.use(express.urlencoded({extended:true, parameterLimit:1000000,limit:"10mb"}))
app.use(cors())

let keyenter;

app.get("/:key",(req,res)=>{
    var id=req.params.key
    
    con.query(`Select *from productdb where searchKey LIKE '%${id}%'`,(error,result)=>{

        if(error)
        {   
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get("/leftproductdb/:key",(req,res)=>{
    var id=req.params.key
    con.query(`Select *from leftproductdb where searchKey LIKE '%${id}%'`,(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get("/amhead",(req,res)=>{
    con.query("Select *from amhead",(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get("/amleft",(req,res)=>{
    con.query("Select *from amleft",(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});
app.get("/amcenterproduct",(req,res)=>{
    con.query("Select *from amcenterproduct",(error,result)=>{

        if(error)
        {
res.send("error")
        }else{
res.send(result)
        }
        console.log(result)
    })

    
});


app.post("/",async(req,res)=>{

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
  let searchKey=""+keyenter
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
})

app.post('/leftPro',(req,res)=>{

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

 searchKey=""+keyenter;


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
})
app.listen(5000)