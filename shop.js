var exp=require("express");
var mysql=require("mysql");
var bodyparser=require("body-parser");
var session=require("express-session");
var multer=require("multer");
con=exp();
con.use(bodyparser.json());
con.use(bodyparser.urlencoded({extended: true}));
con.use(exp.static("public"));
var ii=0,det=[],adv=[],pro=[],i=0,com=[],n=0,cart=[],na,addr,ur;
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
con.use(session({
	secret:'secret',
	resave: true,
	saveUninitialized: true

}))

sql.query("USE web");
sql.query("SELECT * FROM myref",function(err,res,fields){
	a1=res[0].Name;
	a2=res[0].Contact_no;
	a3=res[0].Details;
	a4=res[0].Pic;
	ur={
		name:a1,
		cno:a2,
		det:a3,
		pic:a4
	}

})
sql.query("SELECT * FROM Initial",function(err,res,fields){
	var a1=res[0].Organization_Name;
	var a2=res[0].Tagline;
	var a3=res[0].Product_Types;
	var a4=res[0].Advertisement;
	var a5=res[0].Combo;
	var a6=res[0].Combo_items;
	var a7=res[0].Logo;

	ii={
		org:a1,
		tag:a2,
		ptype: a3,
		adv: a4,
		c: a5,
		citems: a6,
		logo: a7

	}
	sql.query("SELECT * FROM Combo",function(err,res,fields){
		for(i=0;i<ii.c;i++){
			
				if(res[i].itempic0)
				var mm=res[i].itempic0;
				if(res[i].itempic1)
				var nn=res[i].itempic1;
				if(res[i].itempic2)
				var oo=res[i].itempic2;
				if(res[i].itempic3)
				var pp=res[i].itempic3;
				pic=[mm,nn,oo,pp]

				com.push({
					cname:res[i].comboname,
					cprice: res[i].combo_price,
					pic:pic
				})
			
			console.log(com);
		}
	})
	sql.query("SELECT * FROM Advertisement",function(err,res,fields){
		for(i=0;i<ii.adv;i++){
			adv.push({
				img:res[i].Advertisement_img
			})
		}
	})
	sql.query("SELECT * FROM Details",function(err,res,fields){
		for(i=0;i<ii.ptype;i++){
			det.push({
				pname: res[i].Product_name,
				pno: res[i].Productno
			});
		
		}	
		var m=0;
		sql.query("SELECT * FROM "+ det[0].pname,function(err,res,fields){
			
			if(err){
				console.log("error man");
			}
			for(j=0;j<det[0].pno;j++){
				pro.push({
					pname:res[j].Product_name,
					pprice:res[j].Product_Price,
					det:res[j].Product_sdetails,
					des:res[j].Product_detail,
					pic1:res[j].Product_img1,
					pic2:res[j].Product_img2,
					pic3:res[j].Product_img3

				})
					
					
			}
			
		})


		if(ii.ptype>1){
			sql.query("SELECT * FROM "+ det[1].pname,function(err,res,fields){
				if(err){
					console.log("error man");
				}
				for(j=0;j<det[1].pno;j++){
					pro.push({
						pname:res[j].Product_name,
						pprice:res[j].Product_Price,
						det:res[j].Product_sdetails,
						des:res[j].Product_detail,
						pic1:res[j].Product_img1,
						pic2:res[j].Product_img2,
						pic3:res[j].Product_img3

					})
						
						
				}
			})
		}
		if(ii.ptype>2){
			sql.query("SELECT * FROM "+ det[2].pname,function(err,res,fields){
				if(err){
					console.log("error man");
				}
				for(j=0;j<det[2].pno;j++){
					pro.push({
						pname:res[j].Product_name,
						pprice:res[j].Product_Price,
						det:res[j].Product_sdetails,
						des:res[j].Product_detail,
						pic1:res[j].Product_img1,
						pic2:res[j].Product_img2,
						pic3:res[j].Product_img3

					})
						
						
				}
			})
		}
		if(ii.ptype>3){
			sql.query("SELECT * FROM "+ det[3].pname,function(err,res,fields){
				console.log(m);
				if(err){
					console.log("error man");
				}
				for(j=0;j<det[3].pno;j++){
					pro.push({
						pname:res[j].Product_name,
						pprice:res[j].Product_Price,
						det:res[j].Product_sdetails,
						des:res[j].Product_detail,
						pic1:res[j].Product_img1,
						pic2:res[j].Product_img2,
						pic3:res[j].Product_img3

					})
						
						
				}
			})
		}
		if(ii.ptype>4){
			sql.query("SELECT * FROM "+ det[4].pname,function(err,res,fields){
				if(err){
					console.log("error man");
				}
				for(j=0;j<det[4].pno;j++){
					pro.push({
						pname:res[j].Product_name,
						pprice:res[j].Product_Price,
						det:res[j].Product_sdetails,
						des:res[j].Product_detail,
						pic1:res[j].Product_img1,
						pic2:res[j].Product_img2,
						pic3:res[j].Product_img3

					})
						
						
				}
			})
		}
		

		

	})
	
})



con.get("/",function(req,res){
	
	var logi={
		name:na,
		address:addr
	}
	console.log(logi);
	var log={
		ii:ii,
		det:det,
		adv:adv,
		pro:pro,
		n:n,
		cart:cart,
		logi:logi,
		com:com
	}
	res.render("home.ejs",log);
	sql.query("CREATE DATABASE IF NOT EXISTS "+ii.org);
	sql.query("USE "+ii.org);
	res.end();
	
})
con.get("/signup",function(req,res){
	res.render("signup.ejs");
	res.end();
})
con.post("/signed",function(req,res){
	var a1=req.body.name;
	var a2=req.body.no;
	var a3=req.body.email;
	var a4=req.body.adr;
	var a5=req.body.pwd;
	sql.query("CREATE TABLE IF NOT EXISTS Details(Name varchar(30) not null,Phone_no varchar(10) not null,Email varchar(40) not null,Address varchar(500),Password varchar(20))");
	sql.query("INSERT INTO Details(Name,Phone_no,Email,Address,Password) VALUES (?,?,?,?,?)",[a1,a2,a3,a4,a5]);
	req.session.loggedin=true;
	req.session.name=a1;
	req.session.adr=a4;
	na=a1;
	addr=a4;
	res.redirect("/");
	res.end();
})
con.post("/add",function(req,res){

	if(req.session.loggedin){
	var a1=req.body.title;
	console.log(a1);
	var a2,a3,a4,a5,a6,a7;
	var n1=0;
	for(i=0;i<ii.ptype;i++){
		n1=n1+det[i].pno;
	}
	for(j=0;j<n1;j++){
		if(pro[j].pname==a1){
			a3=pro[j].det;
			a4=pro[j].des;
			a5=pro[j].pic1;
			a2=pro[j].pprice;
		}
	}
	cart.push({
		pname:a1,
		pprice:a2,
		det: a3,
		des: a4,
		pic:a5
	})
	sql.query("CREATE TABLE IF NOT EXISTS Orders(Name varchar(30) not null,Address varchar(500),Order_item varchar(30),Price int not null)",function(err,res,fields){
		if(err) throw err;
	});
	console.log(cart);
	res.redirect("/");
	res.end();
	}
	else{
		res.redirect("/");
		res.end();
	}

})
con.post("/addc",function(req,res){

	if(req.session.loggedin){
	var a1=req.body.title;
	console.log(a1);
	var a2,a3,a4,a5,a6,a7;
	var n1=0;
	
	for(j=0;j<ii.c;j++){
		if(com[j].cname==a1){
			a5=com[j].pic[0];
			a2=com[j].cprice;
		}
	}
	cart.push({
		pname:a1,
		pprice:a2,
		det: a3,
		des: a4,
		pic:a5
	})
	console.log(cart);
	res.redirect("/");
	res.end();
	}
	else{		
		res.redirect("/");
		res.end();
	}

})
con.post("/auth",function(request,response){
	na = request.body.userid;
	console.log('logged');
	var password = request.body.password;
	
	if (na && password) {
		sql.query('SELECT * FROM Details WHERE Name = ? AND Password = ?', [na, password], function(error, results, fields) {
			if (results.length > 0) {
				addr=results[0].Address;
				request.session.loggedin=true;
				response.redirect("/");
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
})

con.post("/logout",function(req,res){
	na=null;
	addr=null;
	req.session.loggedin=false;
	res.redirect("/");
	res.end();
})
con.post("/remove",function(req,res){
	var a1=req.body.pos;
	console.log(a1);
	cart.splice(a1,1);
	console.log(cart);
	res.redirect("/");
	res.end();
})
con.post("/check",function(req,res){
	console.log(cart.length);
	for(i=0;i<cart.length;i++){
		sql.query("INSERT INTO Orders(Name,Address,Order_item,Price) VALUES (?,?,?,?)",[na,addr,cart[i].pname,cart[i].pprice],function(err,res,fields){
			if(err) throw err;
		});
	}
	cart.splice(0);
	res.redirect("/");
	res.end();
})
con.get("/info",function(req,res){
	res.render("info.ejs",ur);
	res.end();
})




con.listen(2000)