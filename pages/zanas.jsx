export default function MyApp(){
    return (
        
        <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>DEVT - За нас</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css" />
        <link rel="stylesheet" href="css/animate.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        {/* Font Google */}
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style dangerouslySetInnerHTML={{__html: "\n* {\n\tpadding:0;\n\tmargin:0;\n}\nbody {\n\tfont-family: 'Poppins', sans-serif;\n\tfont-size: 14px;\n}\na {\n\tcolor:#5f0099;\n}\na:hover {\n\tcolor:#5f0099;\n}\nh1, h2, h3 {\n\tfont-weight: 700;\n}\nh4, h5 {\n\tfont-weight:600;\n}\nh6 {\n\tfont-weight:500;\n}\n.white {\n\tcolor:#ffffff !important;\n}\n.black {\n\tcolor:#000000;\n}\n.navbar {\n\tposition: fixed;\n\tright: 0;\n\tleft: 0;\n\twidth: 100%;\n\tpadding-left: 0;\n\tpadding-right: 0;\n\tmin-height: 50px;\n\tline-height: 50px;\n\tbackground: transparent;\n\tz-index: 1030;\n}\n.navbar .active {\n\tcolor: #5f0099 !important;\n}\n.navbar .navbar-brand {\n}\n.navbar .nav-item {\n\tmargin: 0 5px;\n\tpadding: 0;\n}\n.navbar .nav-item a {\n\tcolor: #fff;\n\ttext-transform: uppercase;\n\tfont-weight: 600;\n\tfont-size: 13px;\n}\n.navbar .nav-item a:hover {\n\tcolor: #5f0099;\n}\n.navbar .nav-link {\n\tposition: relative;\n\tpadding: 0;\n}\n.navbar .navbar-toggler {\n\tcursor: pointer;\n}\n.navbar .navbar-toggler span {\n\tcolor: #fff;\n}\n.navbar-style2 .active:after, .navbar-style2 .nav-link:after {\n\tdisplay: none;\n}\n.nav-scroll {\n\tbackground: #fff;\n\t-webkit-box-shadow: 0 1px 8px 3px rgba(0, 0, 0, 0.0509803922);\n\tbox-shadow: 0 1px 8px 3px rgba(0, 0, 0, 0.0509803922);\n\t-webkit-transition: all .4s ease;\n\ttransition: all .4s ease;\n}\n.nav-scroll .navbar-nav > li > a {\n\tcolor: #333;\n}\n.nav-scroll .navbar-brand img {\n\t-webkit-transform: scale(1.03) !important;\n\ttransform: scale(1.03) !important;\n}\n.nav-scroll .navbar-toggler {\n\tcursor: pointer;\n}\n.nav-scroll .navbar-toggler span {\n\tcolor: #333;\n}\n.nav-scroll .nav-link:hover:after {\n\tbackground-color: #2388ed;\n}\n.nav-scroll .active {\n\tposition: relative;\n}\n.banner {\n\tbackground: #7a60ff;\n\tbackground: linear-gradient(to left, #7a60ff, #cd9ffa);\n\tpadding:100px 0px;\n\tposition:relative;\n}\n.banner::before {\n\tcontent: \"\";\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url(images/pattern.png);\n}\n.banner a.weblink {\n\tcolor:#ffffff;\n\tborder-bottom:1px dotted #ffffff;\n}\n.banner a:hover {\n\ttext-decoration:none;\n}\n.svg-wave {\n\tposition: absolute;\n\tbottom: 0;\n\twidth: 200px;\n}\n.banner-text {\n\tpadding-right:80px;\n\tmargin:50px 0px 0px;\n}\n.banner-text p {\n\tmargin:40px 0px;\n}\n.banner-text ul {\n\tlist-style: none;\n}\n.banner-text ul li {\n\tdisplay: inline-block;\n\tmargin: 0px 10px 10px 0px;\n}\n.banner-text ul li a {\n\tdisplay: block;\n}\n.banner-text ul li a img {\n\twidth: 150px;\n\tborder-radius: 7px;\n}\n.prelative {\n\tposition:relative\n}\n.section-padding {\n\tpadding:80px 0px;\n}\n.sectioner-header {\n\twidth:69%;\n\tmargin:0 auto;\n}\n\n\n\n\n\n.line {\n\theight: 2px;\n\twidth: 50px;\n\tbackground: #8e1efc;\n\tdisplay: block;\n\tmargin: 20px auto 20px;\n}\n.line::after {\n\tcontent:\"\";\n\tposition: absolute;\n\tleft: 50%;\n\twidth: 150px;\n\theight: 2px;\n\tborder-bottom: 2px dashed #8e1efc;\n\tmargin-left: -75px;\n}\n.sectioner-header p {\n\tcolor:#818992;\n\tfont-size: 17px;\n}\n.section-content {\n\tmargin-top: 80px;\n}\n.icon-box {\n\tmargin-bottom:50px;\n}\n.icon-box i {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 135px;\n\theight: 135px;\n\tborder-radius: 100px;\n\tbackground: #7a60ff;\n\tbackground:  linear-gradient(to left, #7a60ff, #cd9ffa);\n\tcolor: #ffffff;\n\tfont-size: 50px;\n\tline-height: 135px;\n\tmargin: 0 auto;\n}\n.icon-box h5 {\n\tmargin-top:30px;\n}\n.icon-box p {\n\tcolor: #818992;\n\tfont-size: 14px;\n\twidth: 80%;\n\tmargin: 0 auto;\n}\n.about-btn {\n\tcolor: #8e1efc;\n\tpadding: 10px 40px;\n\tborder: 2px solid #8e1efc;\n\tborder-radius: 7px;\n\tmargin-top: 30px;\n\tdisplay: inline-block;\n\tfont-size: 18px;\n}\n.about-btn:hover {\n\tbackground:#8e1efc;\n\tcolor:#ffffff;\n\ttext-decoration:none;\n}\n.video-section {\n\tbackground: url(images/video-bg.jpg) no-repeat fixed center;\n\tbackground-size: cover;\n\toverflow: hidden;\n}\n.video-overlay {\n\tbackground: linear-gradient(to left, rgba(122, 96, 255, 0.90), rgba(205, 159, 250, 0.90));\n}\n.video-section h3 {\n\tfont-weight: 600;\n\tfont-size: 38px;\n}\n.video-section i {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 70px;\n\theight: 70px;\n\tborder-radius: 100px;\n\tbackground: #ffffff;\n\tcolor: #8e1efc;\n\tfont-size: 30px;\n\tline-height: 70px;\n\tmargin: 0 auto;\n\tcursor:pointer;\n}\n.video-popup {\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 99999;\n\tbackground: rgba(0, 0, 0, 0.5);\n\tdisplay: none;\n\talign-content: center !important;\n\t-ms-flex-line-pack: center !important;\n\t-ms-flex-align: center !important;\n\talign-items: center !important;\n\t-ms-flex-pack: center !important;\n\tjustify-content: center !important;\n}\n.video-popup .video-src {\n\tposition: relative;\n\twidth: 700px;\n\tmax-width: 80%;\n}\n.video-popup .iframe-src {\n\twidth: 100%;\n\theight: 0;\n\tpadding-top: 56.3%;\n\tposition: relative;\n\tdisplay: none;\n}\n.video-popup .iframe-src iframe {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n.single-feature {\n\tmargin-bottom: 80px;\n\tmargin-top: 40px;\n}\n.single-feature h5 {\n\tfont-size: 16px;\n}\n.media-right-margin {\n\tmargin-right:25px;\n}\n.single-feature p {\n\tfont-size: 13px;\n}\n\n\n\n\n\n.icon-border span {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 50px;\n\theight: 50px;\n\tborder-radius: 100px;\n\tcolor: rgb(142, 30, 252);\n\tfont-size: 18px;\n\tline-height: 50px;\n\tborder: 1px solid rgb(142, 30, 252);\n}\n.team {\n\tbackground: #fafafa;\n\tborder-top: 1px solid #e4e4e4;\n}\n.team-detail {\n\tmargin-top:40px;\n}\n.team-detail img {\n\tborder-radius: 50%;\n\twidth: 70%;\n}\n.team-detail h4 {\n\tcolor:rgb(142, 30, 252);\n\tmargin-top: 20px;\n\tfont-size: 17px;\n\tmargin-bottom: 0px;\n}\n.testimonial {\n\tbackground: #7a60ff;\n\tbackground: linear-gradient(to left, #7a60ff, #cd9ffa);\n\tpadding:100px 0px;\n\tposition:relative;\n}\n.testimonial::before {\n\tcontent: \"\";\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url(images/pattern.png);\n}\n.bx-prev {\n\tleft: -90px !important;\n\tbackground: url(images/arrow-left.png) no-repeat !important;\n\tbackground-size: auto auto !important;\n\tbackground-size: 100% 100% !important;\n}\n.bx-next {\n\tright: -90px !important;\n\tbackground: url(images/arrow-right.png) no-repeat !important;\n\tbackground-size: auto auto !important;\n\tbackground-size: 100% 100% !important;\n}\n.bx-wrapper {\n\tborder: none !important;\n\tbackground: rgba(255, 255, 255, 0.81) !important;\n\tborder-radius: 5px !important;\n\tbox-shadow:none !important;\n}\n.slider-item {\n\tpadding:20px;\n}\n.slider .test-img img {\n\tborder: 12px solid #fff;\n\tborder-radius: 50%;\n\twidth: 100%;\n\theight: auto;\n}\n.test-img {\n\tfloat: left;\n\twidth: 20%;\n\tmargin-right:5%;\n}\n.test-text {\n\tfloat: left;\n\twidth: 75%;\n}\n.slider .title {\n\tdisplay: block;\n\tposition: relative;\n\tmargin: 0 0 20px;\n\tfont-size: 1.125em;\n\tline-height: 1.25;\n}\n.slider .title span {\n\tdisplay: block;\n\tfont-size: 1.5em;\n\tfont-weight: 700;\n}\n.faq {\n\tbackground: #fafafa;\n\tborder-bottom: 1px solid #e4e4e4;\n}\n.faq-content {\n\tmargin: 20px 0px;\n}\n.faq-content h4 {\n\tfont-weight: 400;\n\tfont-size: 20px;\n}\n.faq-content p {\n\tcolor: #818992;\n\tfont-weight:300;\n\tmargin-top:15px;\n}\n#contact_form .form-input {\n\tborder: 1px solid #e4e4e4;\n}\ninput {\n\theight: 42px;\n\tpadding: 0 1rem;\n\tbackground: #fff;\n\tborder-radius: 30px;\n\tmargin-bottom: 1rem;\n\t-webkit-transition: all 0.3s ease-in-out;\n\t-moz-transition: all 0.3s ease-in-out;\n\t-o-transition: all 0.3s ease-in-out;\n\ttransition: all 0.3s ease-in-out;\n\tborder:0;\n}\n#contact_form textarea {\n\tresize: none;\n\tpadding: 1rem;\n\theight: 150px;\n\tbackground: #fff;\n\tborder: 0;\n\tborder-radius: 30px;\n\tmargin-bottom: 1rem;\n\t-webkit-transition: all 0.3s ease-in-out;\n\t-moz-transition: all 0.3s ease-in-out;\n\t-o-transition: all 0.3s ease-in-out;\n\ttransition: all 0.3s ease-in-out;\n}\n.btn-grad {\n padding: .7rem 2rem;\n\tdisplay: inline-block;\n\tcolor: #fff;\n\tborder-radius: 2rem;\n\tborder: 0;\n\tbackground: #7a60ff;\n\tbackground: linear-gradient(to left, #7a60ff, #cd9ffa);\n\tcursor:pointer;\n}\n\n\n\n\n\n.contact-info {\n\tpadding: 2rem 2rem 1rem;\n\tborder-radius: 8px;\n\tbackground: #7a60ff;\n\tbackground: linear-gradient(to left, #7a60ff, #cd9ffa);\n}\n.contact-item {\n\tmargin:23px 0px;\n}\n.contact-item i {\n\tfont-size: 20px;\n}\n.contact-item p {\n\tline-height: 20px;\n\tmargin: 0;\n}\n.download {\n\tbackground: #7a60ff;\n\tbackground: linear-gradient(to left, #7a60ff, #cd9ffa);\n\tpadding:100px 0px;\n\tposition:relative;\n}\n.download::before {\n\tcontent: \"\";\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url(images/pattern.png);\n}\n.download ul {\n\tlist-style: none;\n}\n.download ul li {\n\tdisplay: inline-block;\n\tmargin: 0px 10px 10px 0px;\n}\n.download ul li a {\n\tdisplay: block;\n}\n.download ul li a img {\n\twidth: 150px;\n\tborder-radius: 7px;\n}\n.footer-copy {\n\tbackground: #ffffff;\n\tcolor: #242424;\n\tfont-size: 13px;\n\ttext-align: center;\n\tpadding:15px 0px;\n}\n.footer-copy p {\n\tmargin-bottom:0px;\n}\n@media all and (max-width:991px) {\n.navbar .navbar-collapse {\n\toverflow: auto;\n\tbackground:  rgb(213, 198, 221);\n\tcolor: #fff !important;\n\ttext-align: center;\n\tpadding: 10px 0;\n}\n.nav-scroll .navbar-collapse {\n\tbackground: #fff !important;\n}\n#contact_form {\n\tmargin-bottom:20px;\n}\n}\n@media all and (max-width:768px) {\n.nav-scroll .navbar-brand img, .navbar-brand img {\n\ttransform: scale(0.75) !important;\n\t-webkit-transform: scale(0.75) !important;\n}\n.banner-text {\n\tpadding-right: 0px;\n\tmargin: 10px 0px 0px;\n}\nh2 {\n\tfont-size: 25px;\n}\nh3 {\n\tfont-size: 23px;\n}\n.section-padding {\n\tpadding: 40px 0px;\n}\n.banner-text p {\n\tmargin: 25px 0px;\n}\n.banner-text ul li a img {\n\twidth: 140px;\n\tborder-radius: 7px;\n}\n.sectioner-header {\n\twidth: 90%;\n}\n.sectioner-header p {\n\tfont-size: 14px;\n}\n.about-btn {\n\tpadding: 5px 30px;\n\tmargin-top: 0px;\n\tfont-size: 16px;\n}\n.single-feature {\n\tmargin-bottom: 20px;\n\tmargin-top: 20px;\n}\n.team-detail {\n\tmargin-top: 20px;\n}\n.team-detail img {\n\twidth: 50%;\n}\n.bx-controls\n{\n\tdisplay:none;\n}\n.bx-wrapper {\n\tmargin: 0px 20px !important;\n}\n.slider .test-img img {\n\tmargin: 0 auto;\n}\n.test-img {\n\tfloat:none;\n\twidth: 200px;\n\theight: 200px;\n\tmargin: 0 auto;\n}\n.test-text {\n\tfloat: none;\n\twidth: 100%;\n\ttext-align: center;\n}\n.section-content {\n\tmargin-top: 40px;\n}\n.faq-content {\n\tmargin: 10px 0px;\n}\n.faq-content h4 {\n\tfont-size: 16px;\n}\n.faq-content p {\n\tfont-size: 13px;\n}\n#contact_form {\n\tmargin-bottom:20px;\n}\n.contact-item {\n\tfont-size: 12px;\n}\n.download ul li a img {\n\twidth: 120px;\n}\n.footer-copy p {\n\tfont-size: 10px;\n}\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* buy */ \nbody {\n\tbackground-color: lavender;\n  }\n  \n  .feature {\n\t/* Add your styles here */\n  }\n  \n  .product-item {\n\tbackground-color: #f9f9f9;\n\tpadding: 20px;\n\tmargin: 10px;\n\tborder-radius: 5px;\n\ttransition: background-color 0.3s;\n\ttext-align: center;\n  }\n  \n  .product-item:hover {\n\tbackground-color: #d8b6ff;\n  }\n  \n  .product-image {\n\twidth: 200px;\n\theight: 200px;\n\tobject-fit: cover;\n\tborder-radius: 5px;\n  }\n  \n  .product-price {\n\tmargin-top: 10px;\n\tfont-weight: bold;\n  }\n  \n  /* Add more styles for your other elements */\n  \n\n" }} />
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="fas fa-bars" /> </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"> <a className="nav-link" href="index.html">Начало</a> </li>
              <li className="nav-item"> <a className="nav-link" href="kupi.html">Купи</a> </li>
              <li className="nav-item"> <a className="nav-link" href="#">Sell</a> </li>
              <li className="nav-item"> <a className="nav-link" href="zanas.html">За нас</a> </li>
              <li className="nav-item"> <a className="nav-link" href="#">Log in</a> </li>
              <li className="nav-item"> <a className="nav-link" href="forus.html"> <img src="images/uk.webp" alt="Login" style={{width: '30px', height: '20px'}} /> </a> </li>
            </ul>
          </div>
        </nav>
        {/* End Navbar */} 
        {/*-----Banner Start-----*/}
        <section className="banner" data-scroll-index={0}>
          <div className="banner-overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <div className="banner-text">
                    <h2 className="white">DEVT</h2>       
                    <p className="banner-text white">Добре дошли в нашия онлайн магазин, където качеството е на първо място. Ние предлагаме широка гама от най-добрите стоки на пазара, които са внимателно подбрани, за да задоволят вашите изисквания и предпочитания. От модни аксесоари и облекла до технологични устройства и аксесоари за дома, ние сме ангажирани да осигурим на нашите клиенти най-доброто изживяване на пазаруване. Нашата цел е да предоставим нашите клиенти удобство, качество и надеждност при всяка покупка. Разгледайте нашия магазин и открийте перфектния продукт за вас. </p>
                    <ul>
                      <li><a className="but" href="#"><img src="images/login-removebg-preview (2).png" className="wow fadeInUp" data-wow-delay="0.4s" /></a></li>
                      <li><a className="but" href="#"><img src="images/register-removebg-preview (1).png" className="wow fadeInUp" data-wow-delay="0.7s" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12"> <img src="images/iphone-screen.png" className="img-fluid wow fadeInUp" /> </div>
              </div>
            </div>
          </div>
          <span className="svg-wave"> <img className="svg-hero" src /> </span> </section>
        {/*-----Banner End-----*/} 
        <div className="header">
          <h1>За нас</h1>
        </div>
        <section className="feature section-padding" data-scroll-index={2}>
          <div className="container">
            <div className="row" id="product-row">
              <div className="col-md-6">
                <h2>Ние сме ученици от ПМГ "Васил Друмев" от Велико Търново, ние сме на 15 години в 9 клас и обичаме да програмираме и да разработваме уеб приложения. Страстта ни към технологиите и програмирането ни вдъхновява да се занимаваме с разработка на уеб приложения. Обменяме идеи, учим нови програмни езици и работим заедно върху проекти, които да подобрят нашите умения и да донесат ползи за обществото.</h2>
              </div>
              <div className="col-md-6">
                <img src alt="Нашата група" />
              </div>
            </div>
          </div>
        </section>
        <section className="feature section-padding" data-scroll-index={2}>
          <div className="container">
            <div className="row" id="product-row">
              {/* No products for this section */}
            </div>
          </div>
        </section>
        <footer className="footer" id="kraj" style={{backgroundColor: '#e6e6fa', padding: '40px 0'}}>
          <div className="container grid grid--footer" style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="logo-col col" style={{flex: 2}}>
              <a href="#" className="footer-logo">
                <img className="logo" alt=" logo" src="logo.png" />
              </a>
              <p className="copyright" style={{marginTop: '20px'}}>
                Copyright © <span className="year">2023</span> by DEVT, Inc.
                All rights reserved.
              </p>
            </div>
            <div className="address-col col" style={{flex: 2}}>
              <p className="footer-heading">Свържи се с нас</p>
              <address className="contacts">
                <p className="address">
                  град Велико Търново
                </p>
                <p>
                  <a className="footer-link" href="tel:415-201-6370" /><br />
                  <a className="footer-link" href>softunifest@gmail.com</a>
                </p>
              </address>
            </div>
            <div className="nav-col col" style={{flex: 1}}>
              <p className="footer-heading">Акаунт</p>
              <ul className="footer-nav">
                <li>Create account</li>
                <li>Sign in</li>
              </ul>
            </div>
            <div className="nav-col col" style={{flex: 1}}>
              <p className="footer-heading">Компанията</p>
              <ul className="footer-nav">
                <li><a className="footer-link" href="#">За "DEVT"</a></li>
                <li><a className="footer-link" href="#">За бизнеса</a></li>
                <li><a className="footer-link" href="#">Кариeра</a></li>
              </ul>
            </div>
            <div className="nav-col col" style={{flex: 1}}>
              <p className="footer-heading">Ресурси</p>
              <ul className="footer-nav">
                <li><a className="footer-link" href="#">Хранилище</a></li>
                <li><a className="footer-link" href="#">Помощ</a></li>
                <li><a className="footer-link" href="#">Privacy &amp; terms</a></li>
              </ul>
            </div>
            <div className="nav-col col" style={{flex: 1}}>
              <p className="footer-heading">Последвайте ни</p>
              <ul className="footer-nav">
                <li><a className="footer-link" href="https://www.facebook.com">Facebook</a></li>
                <li><a className="footer-link" href="https://www.twitter.com">Twitter</a></li>
                <li><a className="footer-link" href="https://www.instagram.com">Instagram</a></li>
              </ul>
            </div>
          </div>
        </footer>
        {/* scrollIt js */} 
      </div>
        ) 
    }