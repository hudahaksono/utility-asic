jQuery(document).ready(function ($) {
    // document start


    // Navbar
    $("<span class='clickD'></span>").insertAfter(".navbar-nav li.menu-item-has-children > a");
    $('.navbar-nav li .clickD').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.removeClass('toggled');
        }
        else {
            $this.parent().parent().find('.sub-menu').removeClass('show');
            $this.parent().parent().find('.toggled').removeClass('toggled');
            $this.next().toggleClass('show');
            $this.toggleClass('toggled');
        }
    });

    $(window).on('resize', function () {
        if ($(this).width() < 1025) {
            $('html').click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $(document).click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $('.navbar-nav').click(function (e) {
                e.stopPropagation();
            });
        }
    });
    // Navbar end



    /* ===== For menu animation === */
    $(".navbar-toggler").click(function () {
        $(".navbar-toggler").toggleClass("open");
        $(".navbar-toggler .stick").toggleClass("open");
        $('body,html').toggleClass("open-nav");
    });

    // Navbar end


    // Sticky Nav
    
    $(window).scroll(function() {     
        var scroll = $(window).scrollTop();     
        if (scroll > 150) { 
            $(".main-head").addClass("fixed"); 
        } 
        else {
        $(".main-head").removeClass("fixed"); 
        }
    })
    

    // back to top
    if ($("#scroll").length) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#scroll').fadeIn(200);
            } else {
                $('#scroll').fadeOut(200);
            }
        });
        $('#scroll').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
            return false;
        });
    }




    // $('.responsive').slick({
    //     dots: true,
    //     infinite: false,
    //     speed: 300,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: true,
    //                 dots: true
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // });



    $('.navbar-collapse a[href*="#"]').on('click', function(){
        $('.navbar-toggler').trigger('click')
    })

    // one page scroll section
    
    jQuery(function($){
        var topMenuHeight = $(".main-head").outerHeight();
        $(".navbar-collapse").menuScroll(topMenuHeight);
      });
      
      // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
      jQuery.fn.extend({
          menuScroll: function(offset) {
          // Declare all global variables
              var topMenu = this;
          var topOffset = offset ? offset : 0;
              var menuItems = $(topMenu).find('a[href*="#"]');
              var lastId;
        
          // Save all menu items into scrollItems array
              var scrollItems = $(menuItems).map(function() {
                  var item = $($(this).attr("href"));
                  if (item.length) {
                      return item;
                  }
              });
      
          // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
              $(topMenu).on("click", 'a[href*="#"]', function(e){
                  var href = $(this).attr("href");
                  
                  var offsetTop = href === "#" ? 0 : $(href).offset().top-topOffset;
      
                  $('html, body').stop().animate({ 
                      scrollTop: offsetTop
                  }, 300);
                  e.preventDefault();
      
              });
          
          // When page is scrolled
              $(window).scroll(function(){
                  var nm = $("html").scrollTop();
                  var nw = $("body").scrollTop();
                  var fromTop = (nm > nw ? nm : nw)+topOffset + 10;
      
            
            // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                  var current = $(scrollItems).map(function(){
                      if ($(this).offset().top <= fromTop && $(this).offset().top + (this).height() > fromTop)
                      return this;
                  });
            
            // Get the most recent passed section from current array
                  current = current[current.length-1];
                  var id = current && current.length ? current[0].id : "";
                  if (lastId !== id) {
                      lastId = id;
                      // Set/remove active class
                      $(menuItems)
                      .parent().removeClass("current-menu-item")
                      .end().filter("[href='#"+id+"']").parent().addClass("current-menu-item");
                  }      
      
              });
          }
      });
        
    
    
      gsap.registerPlugin(ScrollTrigger);
      if ($(".navbar-nav").length) {
          const myEl = document.querySelector(".navbar-nav").querySelectorAll('li');
          let navMaination = gsap.timeline();
          navMaination.from(myEl, {
              y: 10,
              stagger: 0.1,
              scale: 0.8,
              opacity: 0,
              ease: "bounce.out",
              duration: 0.8,
          })
      }
      if ($(".product-tab").length) {
          const myEl = document.querySelector(".resp-tabs-list").querySelectorAll('li');
          let navMaination = gsap.timeline();
          navMaination.from(myEl, {
              y: 20,
              stagger: 0.2,
              opacity: 0,
              ease: "none",
              duration: 0.5,
          })
          ScrollTrigger.create({
              trigger: '.product-tab',
              start: "top 90%",
              animation: navMaination,
          })
      }
  
      // Banner Animation
      if ($(".main-banner").length) {
          let bannerSec = document.querySelector('.main-banner');
          const moveUpElem = bannerSec.querySelectorAll("[data-move]");
          // const scaleUpElem = bannerSec.querySelectorAll("[data-move]");
          // console.log(moveUpElem);
          let moveUpTl = gsap.timeline();
          let scaleUpTl = gsap.timeline();
          moveUpElem.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTl.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              if (elem.dataset.move == "scale-up") {
                  gsap.set(elem, { y: 50, scale: 0 });
                  scaleUpTl.to(elem, {
                      //   stagger: 0.2,
                      ease: "Power3.easeOut",
                      duration: 1.4,
                      // delay: () => {
                      //     if (elem.dataset.delay) {
                      //         console.log(elem.dataset.delay);
                      //         return (elem.dataset.delay);
                      //     } else {
                      //         return 0;
                      //     }
                      // },
                      // delay: 1,
                      // repeatDelay: 0,
                      scale: 1,
                      y: 0,
                      // x: 0,
                      // scrollTrigger: {
                      //     trigger: elem,
                      //     start: "top 90%",
                      //     // delay: 5,
                      //     // toggleActions: "play none none none",
                      //     // end: "bottom bottom",
                      //     // scrub: 1.2,
                      //     // each: 0.5,
                      // },
                  }, "=-0.2")
              }
  
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: moveUpTl,
              })
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: scaleUpTl,
              })
          });
      }
  
  
      gsap.from('.brand-icon', {
          ease: "Power3.easeOut",
          duration: 1.2,
          scale: 0,
          y: 50,
          opacity: 0,
          scrollTrigger: {
              trigger: '.brand-icon',
              start: "top 90%",
          },
      })
  
      // Product Sec Animation
      if ($(".product-sec").length) {
          const productSec = document.querySelector('.product-sec');
          const moveUpElem2_productSec = productSec.querySelectorAll("[data-move]");
          const slideElem2_productSec = productSec.querySelectorAll("[data-slide]");
          // console.log(moveUpElem);
          let moveUpTl2_productSec = gsap.timeline();
          let slideRightTl2_productSec = gsap.timeline();
          moveUpElem2_productSec.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTl2_productSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 80%",
                  animation: moveUpTl2_productSec,
              })
          });
          slideElem2_productSec.forEach(function (elem, index) {
              if (elem.dataset.slide == "right") {
                  gsap.set(elem, { x: -100, opacity: 0, });
                  slideRightTl2_productSec.to(elem, {
                      //   stagger: 0.2,
                      ease: "Power3.easeOut",
                      duration: 1.4,
                      opacity: 1,
                      x: 0,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 70%",
                  animation: slideRightTl2_productSec,
              })
          });
      }
  
  
      // About Sec Animation
      if ($(".about-sec").length) {
          const aboutSec = document.querySelector('.about-sec');
          let aboutTl = gsap.timeline();
          let abouttitle = aboutSec.querySelector('.about-cntnt-title'),
              chatCard = aboutSec.querySelector('.chatbox-card'),
              abotBtnWpr = aboutSec.querySelector('.about-btn-wpr'),
              hdrIcon = aboutSec.querySelector('.chatbox-icon'),
              chatboxBodyTop = aboutSec.querySelector('.chatbox-body-top'),
              chatboxmsgTop = aboutSec.querySelector('.chat-msg-top'),
              chatboxMsgIcon = aboutSec.querySelector('.chat-msg-icon'),
              chatboxMsgDot = aboutSec.querySelector('.active-dot'),
              chatboxmsgBtm = aboutSec.querySelector('.chat-msg-btm'),
              msgBox = aboutSec.querySelector('.msg-box'),
              msgBtn = aboutSec.querySelector('.chat-send-icon');
          // let slideRightTl2_productSec = gsap.timeline();
          aboutTl.from(abouttitle, {
              ease: "none",
              duration: 0.3,
              y: 50,
              opacity: 0,
          })
              .from('.about-para', {
                  ease: "none",
                  duration: 0.3,
                  y: 50,
                  opacity: 0,
              }, "-=0.15")
              .from(chatCard, {
                  ease: "none",
                  duration: 0.3,
                  y: 50,
                  opacity: 0,
              }, "-=0.15")
              .from(abotBtnWpr, {
                  ease: "none",
                  duration: 0.3,
                  y: 50,
                  opacity: 0,
              }, "-=0.3")
              .from(hdrIcon, {
                  ease: "none",
                  duration: 0.25,
                  scale: 0,
              })
              .from(chatboxBodyTop, {
                  ease: "none",
                  duration: 0.25,
                  y: 60,
                  opacity: 0,
              }, "-=0.1")
              .from(chatboxmsgTop, {
                  ease: "none",
                  duration: 0.3,
                  x: 70,
                  opacity: 0,
              }, "-=0.2")
              .from(chatboxMsgIcon, {
                  ease: "none",
                  duration: 0.25,
                  scale: 0,
              })
              .from(chatboxMsgDot, {
                  ease: "none",
                  duration: 0.2,
                  opacity: 0,
              })
              .from(chatboxmsgBtm, {
                  ease: "none",
                  duration: 0.3,
                  x: 70,
                  opacity: 0,
              })
              .from(msgBox, {
                  ease: "none",
                  duration: 0.25,
                  y: 50,
                  opacity: 0,
              })
              .from(msgBtn, {
                  ease: "none",
                  duration: 0.25,
                  scale: 0,
              })
  
          ScrollTrigger.create({
              trigger: aboutSec,
              start: "top 70%",
              animation: aboutTl,
          })
      }
  
      // Benefit Animation
      if ($(".benefits-block").length) {
          let benifitSec = document.querySelector('.benefits-block');
          const moveUpElem_benifitSec = benifitSec.querySelectorAll("[data-move]");
          const slideElem_benifitSec = benifitSec.querySelectorAll("[data-slide]");
          let moveUpTl_benifitSec = gsap.timeline();
          let slideTl_benifitSec = gsap.timeline();
          moveUpElem_benifitSec.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTl_benifitSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: moveUpTl_benifitSec,
              })
          });
          slideElem_benifitSec.forEach(function (elem, index) {
              if (elem.dataset.slide == "left") {
                  gsap.set(elem, { x: 150, opacity: 0 });
                  slideTl_benifitSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      x: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: slideTl_benifitSec,
              })
          });
  
          let benifitSec_data = document.querySelector('.benefits-data');
          let benifitSec_data_item = benifitSec_data.querySelectorAll('.benefits-data-item');
          let benefitItemTl = gsap.timeline();
          benifitSec_data_item.forEach(function (elem, index) {
              let dataIcon = elem.querySelector('.benefits-data-icon'),
                  itemHdng = elem.querySelector('.benefits-data-content h3'),
                  itemPara = elem.querySelector('.benefits-data-content p');
              gsap.set(dataIcon, { scale: 0, });
              gsap.set(itemHdng, { y: 50, opacity: 0 });
              gsap.set(itemPara, { y: 50, opacity: 0 });
              benefitItemTl.to(dataIcon, {
                  ease: "none",
                  duration: 0.5,
                  scale: 1,
              })
                  .to(itemHdng, {
                      ease: "none",
                      duration: 0.3,
                      y: 0,
                      opacity: 1,
                  }, "-=0.1")
                  .to(itemPara, {
                      ease: "none",
                      duration: 0.3,
                      y: 0,
                      opacity: 1,
                  }, "-=0.1")
          });
          ScrollTrigger.create({
              trigger: benifitSec_data,
              start: "top 90%",
              animation: benefitItemTl,
          })
  
      }
  
      // Tokennomics Animation
      if ($(".token-block").length) {
          let tokenSec = document.querySelector('.token-block');
          const moveUpElem_tokenSec = tokenSec.querySelectorAll("[data-move]");
          let moveUpTl_tokenSec = gsap.timeline();
          moveUpElem_tokenSec.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTl_tokenSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: moveUpTl_tokenSec,
              })
          });
  
          let tokenSec_animBlock = document.querySelector('.token-block-anim');
          let tokenSec_circle1 = tokenSec_animBlock.querySelector('.graphics-inner'),
              tokenSec_circle2 = tokenSec_animBlock.querySelector('.graphics-outer'),
              tokenSec_logo = tokenSec_animBlock.querySelector('.graphics-inner-logo'),
              tokenSec_leftPoint = tokenSec_animBlock.querySelector('.token-block-anim-left-list'),
              tokenSec_leftPoint_each = tokenSec_leftPoint.querySelectorAll('.token-list-item'),
              benifitSec_right_box = tokenSec_animBlock.querySelector('.token-block-anim-right-box'),
              benifitSec_right_box_each = benifitSec_right_box.querySelectorAll('.token-block-anim-right-box-item'),
              btnWpr = tokenSec.querySelector('.token-block-btn');
          let tokenSecTl = gsap.timeline();
  
          tokenSecTl.from(tokenSec_circle1, {
            //   delay: 1,
              ease: "none",
              duration: 0.3,
              opacity: 0,
          })
              .from(tokenSec_circle2, {
                  ease: "none",
                  duration: 0.3,
                  opacity: 0,
              })
              .from(tokenSec_logo, {
                  ease: "none",
                  duration: 0.3,
                  scale: 0,
              }, "-=0.1")
              // .fromTo(".box", { opacity: 0 }, { opacity: 0.5, duration: 1 })
              .to(tokenSec_leftPoint_each, {
                  ease: "none",
                  duration: 0.15,
                  y: 0,
                  stagger: {
                      each: 0.3,
                      onComplete() {
                          //console.log(this.targets()[0]); // <= the current target
                          this.targets()[0].classList.add("show")
                      }
                  }
  
              }, "-=0.1")
              .to(benifitSec_right_box_each, {
                  ease: "none",
                  duration: 0.05,
                  y: 0,
                  stagger: {
                      each: 0.3,
                      onComplete() {
                          //console.log(this.targets()[0]); // <= the current target
                          this.targets()[0].classList.add("show")
                      }
                  }
  
              }, "<")
              .from(btnWpr, {
                  ease: "none",
                  duration: 0.3,
                  y: 0,
                  opacity: 0,
              })
  
          ScrollTrigger.create({
              trigger: tokenSec_animBlock,
              start: "top 90%",
              animation: tokenSecTl,
          })
  
      }
  
  
      // Roadmap Animation
      if ($(".roadmap").length) {
          let tokenSec = document.querySelector('.roadmap');
          const moveUpElemvideoSec = tokenSec.querySelectorAll("[data-move]");
          let moveUpTlvideoSec = gsap.timeline();
          moveUpElemvideoSec.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTlvideoSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: moveUpTlvideoSec,
              })
          });
  
  
          let roadmap_all = document.querySelector('.roadmap-all'),
              roadmap_box = roadmap_all.querySelectorAll('.roadmap-box');
          let roadmap_allTl = gsap.timeline();
          roadmap_box.forEach(function (elem, index) {
              let dataIcon = elem.querySelector('.roadmap-icon'),
                  itemHdng = elem.querySelector('.roadmap-box-heading'),
                  itemLine = elem.querySelector('.roadmap-brdr-icon'),
                  itemBox = elem.querySelector('.roadmap-box-cont');
              gsap.set(itemHdng, { y: 50, opacity: 0 });
              gsap.set(dataIcon, { scale: 0, });
              gsap.set(itemLine, { opacity: 0 });
              gsap.set(itemBox, { y: 50, opacity: 0 });
              roadmap_allTl.to(itemHdng, {
                  ease: "none",
                  duration: 0.3,
                  y: 0,
                  opacity: 1,
              })
              .to(dataIcon, {
                  ease: "none",
                  duration: 0.3,
                  scale: 1,
              })
                  .to(itemLine, {
                      ease: "none",
                      opacity: 1,
                  }, "-=0.1")
                  .to(itemBox, {
                      ease: "none",
                      duration: 0.3,
                      y: 0,
                      opacity: 1,
                  }, "-=0.1")
          });
          ScrollTrigger.create({
              trigger: roadmap_all,
              start: "top 90%",
              animation: roadmap_allTl,
          })
  
      }
  
      // Video Sec Animation
      if ($(".watch-video").length) {
          let videoSec = document.querySelector('.watch-video');
          const moveUpElem_videoSec = videoSec.querySelectorAll("[data-move]");
          let moveUpTl_videoSec = gsap.timeline();
          moveUpElem_videoSec.forEach(function (elem, index) {
              if (elem.dataset.move == "up") {
                  gsap.set(elem, { y: 50, opacity: 0 });
                  moveUpTl_videoSec.to(elem, {
                      ease: "none",
                      duration: 0.5,
                      y: 0,
                      // x: 0,
                      opacity: 1,
                  })
              }
              ScrollTrigger.create({
                  trigger: elem,
                  start: "top 90%",
                  animation: moveUpTl_videoSec,
              })
          });
  
  
          let roadmap_all = document.querySelector('.roadmap-all'),
              roadmap_box = roadmap_all.querySelectorAll('.roadmap-box');
          let roadmap_allTl = gsap.timeline();
          roadmap_box.forEach(function (elem, index) {
              let dataIcon = elem.querySelector('.roadmap-icon'),
                  itemLine = elem.querySelector('.roadmap-brdr-icon'),
                  itemBox = elem.querySelector('.roadmap-box-cont');
              gsap.set(dataIcon, { scale: 0, });
              gsap.set(itemLine, { opacity: 0 });
              gsap.set(itemBox, { y: 50, opacity: 0 });
              roadmap_allTl.to(dataIcon, {
                  ease: "none",
                  duration: 0.3,
                  scale: 1,
              })
                  .to(itemLine, {
                      ease: "none",
                      opacity: 1,
                  }, "-=0.1")
                  .to(itemBox, {
                      ease: "none",
                      duration: 0.3,
                      y: 0,
                      opacity: 1,
                  }, "-=0.1")
          });
          ScrollTrigger.create({
              trigger: roadmap_all,
              start: "top 90%",
              animation: roadmap_allTl,
          })
  
      }

      
    // equal height
    function equal_height() {
        $('.roadmap-box-heading').matchHeight({ property: 'min-height' });
    }
    equal_height();
    $(window).on('load', function (event) {
        equal_height();
    });
    $(window).resize(function (event) {
        equal_height();
    });

    //Horizontal Tab
    if ($('#product-tab').length) {
        $('#product-tab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'product-tab-identyfire', // The tab groups identifier
            activate: function (event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }

    // smooth scroll to any section
    if($('a.scroll').length){
        $("a.scroll").on('click', function(event) {
          if (this.hash !== "") {
            event.preventDefault();
            var target = this.hash, $target = $(target);
            $('html, body').animate({
              scrollTop: $target.offset().top - 90
            }, 800, function(){
            });
            setTimeout(() => {
                window.location.href.substr(0, window.location.href.indexOf('#'));
            }, 200);
          } 
        });
    }





    // document end

})

window.addEventListener('load', () => {
    setTimeout(() => {
        if ($('[data-anim="parent-anim-sec"]').length) {
            const parentAnimation = document.querySelectorAll('[data-anim="parent-anim-sec"]');
            parentAnimation.forEach((elem, index) => {
                let moveUpElem = elem.querySelectorAll("[data-move]");
                let slideElem = elem.querySelectorAll("[data-slide]");
                let moveTl = gsap.timeline();
                let slideTl = gsap.timeline();
                moveUpElem.forEach(function (elem2, index2) {
                    if (elem2.dataset.move == "up") {
                        gsap.set(elem2, { y: 50, opacity: 0 });
                        moveTl.to(elem2, {
                            ease: "none",
                            duration: 0.3,
                            y: 0,
                            opacity: 1,
                        })
                    }

                    if (elem2.dataset.move == "scale-up") {
                        gsap.set(elem2, { y: 50, scale: 0 });
                        slideTl.to(elem2, {
                            ease: "Power3.easeOut",
                            duration: 1.4,
                            scale: 1,
                            y: 0,
                        }, "=-0.2")
                    }
                    ScrollTrigger.create({
                        trigger: elem2,
                        start: "top bottom",
                        animation: moveTl,
                    })
                });

                slideElem.forEach(function (elem2, index2) {
                    if (elem2.dataset.slide == "right") {
                        gsap.set(elem2, { x: -100, opacity: 0, });
                        slideTl.to(elem2, {
                            //   stagger: 0.2,
                            ease: "Power3.easeOut",
                            duration: 1.6,
                            opacity: 1,
                            x: 0,
                        })
                    }
                    if (elem2.dataset.slide == "left") {
                        gsap.set(elem2, { x: 100, opacity: 0, });
                        slideTl.to(elem2, {
                            //   stagger: 0.2,
                            ease: "Power3.easeOut",
                            duration: 1.6,
                            opacity: 1,
                            x: 0,
                        })
                    }
                    ScrollTrigger.create({
                        trigger: elem2,
                        start: "top 85%",
                        animation: slideTl,
                    })
                });

            })
        }
    }, 0);
})


