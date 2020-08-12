var exp=require("express");
var mysql=require("mysql");
var bodyparser=require("body-parser");
var multer=require("multer");
var i=0;
var j=0;
s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
p=["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
var l,p,q=0,r,s,t,u,na;
con=exp();
con.use(bodyparser.json());
con.use(bodyparser.urlencoded({extended: true}));
con.use(exp.static("public"));

var sql=mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Arizona"
})
sql.connect(function(err) {
  if (err) {
  	console.log(err);
  }
  console.log("Connected!");
});
con.get("/",function(req,res){
	res.render("myweb.ejs");
	res.end();
})
con.post("/det",function(req,res){
	res.render("initiali.ejs");
	res.end();
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
sql.query("CREATE DATABASE IF NOT EXISTS web");
sql.query("USE web");
con.post("/reg",upload.single("pro"),function(req,res){
	var a1,a2,a3,a4;
	a1=req.body.name;
	na=a1;
	a2=req.body.cono;
	a3=req.body.details;
	a4=req.file.originalname;
	sql.query("CREATE TABLE IF NOT EXISTS myref(Name varchar(20) not null, Details varchar(500) not null, Contact_no varchar(10) not null,Pic varchar(20))");
	sql.query("INSERT INTO myref(Name,Details,Contact_no,Pic) VALUES (?,?,?,?)",[a1,a3,a2,a4],function(err,res,fields){if(err) throw err});

	res.render("sample1.ejs");
	res.end();
})
con.post("/details",upload.single("pro"),function(req,res){
	var logo=req.file.originalname;
	var org=req.body.organization;
	u=org;
	var pro=req.body.prono;
	var adv=req.body.advno;
	i=adv;
	j=pro
	var combo=req.body.combono;
	alp=combo;
	var comboino=req.body.comboino;
	t=comboino;
	var tag=req.body.tagline;
	var info={
		pro: pro,
		adv: adv,
		combo: combo,
	};
	console.log(info);
	sql.query("CREATE TABLE IF NOT EXISTS Initial(Name varchar(30) not null,Organization_Name varchar(50) not null,Tagline varchar(100),Product_Types int not null default 0,Advertisement int not null default 0, Combo int not null default 0,Combo_items int not null default 0,Logo varchar(50))");
	sql.query("INSERT INTO Initial(Organization_Name,Tagline,Product_Types,Advertisement,Combo,Combo_items,Logo,Name) VALUES (?,?,?,?,?,?,?,?)",[org,tag,pro,adv,combo,comboino,logo,na],function(err,res,fields){if(err) throw err;});
	res.render("sample1-cont.ejs",info);
	res.end();


})
con.post("/furdet",upload.array("adv",3),function(req,res){
	var n;
	var filename=["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
	console.log(i);
	for(n=0;n<i;n++){
		filename[n]=req.files[n].originalname;
	}
	console.log(req.body);
	sql.query("CREATE TABLE IF NOT EXISTS details(Product_name varchar(20) not null, Productno int not null default 0, Organization_Name varchar(20) not null)");
	for(n=0;n<j;n++){
		var m=req.body.product[n];
		p[n]=m
		var k=req.body.Prono[n];
		s[n]=k;
		sql.query("INSERT INTO details(Product_name,Productno,Organization_Name) VALUES (?,?,?)",[m,k,u],function(err,res,fields){if(err) throw err});
	}
	sql.query("CREATE TABLE IF NOT EXISTS Advertisement(Advertisement_img varchar(20) not null,Organization_Name varchar(20) not null)");
	for(n=0;n<i;n++){
		var g=filename[n];
		sql.query("INSERT INTO Advertisement(Advertisement_img,Organization_Name) VALUES (?,?)",[g,u],function(err,res,fields){if(err) throw err});
	}
	for(l=0;l<j;l++){
	var aa=p[l]
	sql.query("CREATE TABLE IF NOT EXISTS "+aa+ "(Product_name varchar(20) not null,Product_Price int not null default 0,Product_sdetails varchar(100), Product_detail varchar(500),Product_img1 varchar(50),Product_img2 varchar(50),Product_img3 varchar(50),Organization_Name varchar(20) not null)",function
		(err,res,fields){if(err) throw err;});
	}
	var cc={
		nc: alp
	};

	res.render("combo.ejs",cc);
	res.end();


})
sql.query("CREATE TABLE IF NOT EXISTS Combo(comboname varchar(20), combo_price int not null default 0,Organization_Name varchar(20) not null)");

con.post("/prod",upload.array("pro"),function(req,res){
	n=0;
	for(r=0;r<t;r++){
		sql.query("ALTER TABLE Combo ADD COLUMN itempic"+r+" varchar(50)");
	}
	for(r=0;r<alp;r++){
		var oo=req.body.cname[r];
		var ll=req.body.cprice[r];
		sql.query("INSERT INTO Combo(comboname,combo_price,Organization_Name) VALUES (?,?,?)",[oo,ll,u]);
		var gg=(r+1)*t;
		for (;n<gg;n++)
		{
			var al=n%t;
			var tt=req.files[n].originalname;
			sql.query("UPDATE Combo SET itempic"+al+"=? WHERE comboname = ?",[tt,oo]);
		}
	}


	q++;
	var po={
		proname:p[0],
		prono:s[0]
	};
	if(q<=j){
		res.render("sample1-prod1.ejs",po);
	}
	res.end();

})
con.post("/prod1",upload.array("pro"),function(req,res){
	var bb=p[0];
	for(g=0;g<s[0];g++){
		var a1=req.body.product[g];
		var a2=req.body.description[g];
		var a3=req.body.details[g];
		var a4=req.body.price[g];
		var kk=3*g;
		var a5=req.files[kk].originalname;
		var a6=req.files[kk+1].originalname;
		var a7=req.files[kk+2].originalname;


		sql.query("INSERT INTO "+bb+ "(Product_name,Product_Price,Product_sdetails, Product_detail,Product_img1,Product_img2,Product_img3,Organization_Name) VALUES (?,?,?,?,?,?,?,?)",[a1,a4,a2,a3,a5,a6,a7,u],function(err,res,fields){
			if(err) throw err;
		})
	}
	q++;
	if(p[1]){
	var po={
		proname:p[1],
		prono:s[1]
	};
	}
	if(q<=j){
		res.render("sample1-prod2.ejs",po);
	}
	else{
		res.render("done.ejs");
	}

	
})
con.post("/prod2",upload.array("pro"),function(req,res){
	var bb=p[1];

	for(g=0;g<s[1];g++){
		var a1=req.body.product[g];
		var a2=req.body.description[g];
		var a3=req.body.details[g];
		var a4=req.body.price[g];
		var n1=3*g;
		var a5=req.files[n1].originalname;
		var a6=req.files[n1+1].originalname;
		var a7=req.files[n1+2].originalname;


		sql.query("INSERT INTO "+bb+ "(Product_name,Product_Price,Product_sdetails, Product_detail,Product_img1,Product_img2,Product_img3,Organization_Name) VALUES (?,?,?,?,?,?,?,?)",[a1,a4,a2,a3,a5,a6,a7,u],function(err,res,fields){
			if(err) throw err;
		})
	}
	q++;
	if(p[2]){
	var po={
		proname:p[2],
		prono:s[2]
	};
	}
	if(q<=j){
		res.render("sample1-prod3.ejs",po);
	}
	else{
		res.render("done.ejs");
	}

	
})
con.post("/prod3",upload.array("pro"),function(req,res){
	var bb=p[2];

	for(g=0;g<s[2];g++){
		var a1=req.body.product[g];
		var a2=req.body.description[g];
		var a3=req.body.details[g];
		var a4=req.body.price[g];
		var n1=3*g;
		var a5=req.files[n1].originalname;
		var a6=req.files[n1+1].originalname;
		var a7=req.files[n1+2].originalname;


		sql.query("INSERT INTO "+bb+ "(Product_name,Product_Price,Product_sdetails, Product_detail,Product_img1,Product_img2,Product_img3,Organization_Name) VALUES (?,?,?,?,?,?,?,?)",[a1,a4,a2,a3,a5,a6,a7,u],function(err,res,fields){
			if(err) throw err;
		})
	}
	q++;
	if(p[3]){
	var po={
		proname:p[3],
		prono:s[3]
	};
	}
	if(q<=j){
		res.render("sample1-prod4.ejs",po);
	}
	else{
		res.render("done.ejs");
	}

	
})
con.post("/prod4",upload.array("pro"),function(req,res){
	var bb=p[3];

	for(g=0;g<s[3];g++){
		var a1=req.body.product[g];
		var a2=req.body.description[g];
		var a3=req.body.details[g];
		var a4=req.body.price[g];
		var n1=3*g;
		var a5=req.files[n1].originalname;
		var a6=req.files[n1+1].originalname;
		var a7=req.files[n1+2].originalname;


		sql.query("INSERT INTO "+bb+ "(Product_name,Product_Price,Product_sdetails, Product_detail,Product_img1,Product_img2,Product_img3,Organization_Name) VALUES (?,?,?,?,?,?,?,?)",[a1,a4,a2,a3,a5,a6,a7,u],function(err,res,fields){
			if(err) throw err;
		})
	}
	q++;
	if(p[4]){
	var po={
		proname:p[4],
		prono:s[4]
	}
	};
	if(q<=j){
		res.render("sample1-prod5.ejs",po);
	}
	else{
		res.render("done.ejs");
	}

	
})
con.post("/prod5",upload.array("pro"),function(req,res){
	var bb=p[4];

	for(g=0;g<s[4];g++){
		var a1=req.body.product[g];
		var a2=req.body.description[g];
		var a3=req.body.details[g];
		var a4=req.body.price[g];
		var n1=3*g;
		var a5=req.files[n1].originalname;
		var a6=req.files[n1+1].originalname;
		var a7=req.files[n1+2].originalname;


		sql.query("INSERT INTO "+bb+ "(Product_name,Product_Price,Product_sdetails, Product_detail,Product_img1,Product_img2,Product_img3,Organization_Name) VALUES (?,?,?,?,?,?,?,?)",[a1,a4,a2,a3,a5,a6,a7,u],function(err,res,fields){
			if(err) throw err;
		})
	}
	q++;
	if(p[5]){
	var po={
		proname:p[5],
		prono:s[5]
	};
	}
	if(q<=j){
		res.render("sample1-prod6.ejs",po);
	}
	else{
		res.render("done.ejs");
	}

	
})





























con.listen(3000);

