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


app.post("/",(req,res)=>{

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
  let searchKey="yogen"
  let company="AMAZON"

  const collectProduct={asin,url,title,thumbnail,searchKey,company}

     const price=dataList.result[i].price
      const reviews=dataList.result[i].reviews
    
      const amazonProducts=Object.assign(collectProduct,price,reviews)
     console.log("datalist :",amazonProducts)

    con.query('INSERT INTO productdb SET ?',amazonProducts,(error, result,fields) =>{
        if(error)
        {
return res.send(error)
        }
    })

}
return res.send("list of data")
})
app.listen(5000)