const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// _.throttle(함수, 시간) 시간은 밀리세컨즈로 300은 0.3초
window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if (window.scrollY > 500){
        //배지 숨기기
        // badgeEl.style.display = 'none';
        //gsap.to(요소, 지속시간 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display : 'none'
        });
        //버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        });
    }else{
        //배지 보이기
        // badgeEl.style.display = 'block';
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // 버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300));


toTopEl.addEventListener('click', function(){
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    gsap.to(fadeEl, 1, {
        //index는 0부터 시작인데 0*0.7은 0이니까 +1을 해줌
        delay: (index + 1) * .7, //0.7, 1.4, 2.1, 2.7
        opacity: 1
    });
});

// 생성자(클래스)
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper',{
    direction: 'vertical',
    //자동으로 넘어가게 함
    autoplay: true,
    //반복재생
    loop: true
});

new Swiper('.promotion .swiper',{
    //기본이 수평이라 표시해줄 필요없음
    direction: 'horizontal',
    slidesPerView: 3, //한번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    // autoplay: {
    //     delay: 3000 //3초
    // },
    loop: true,
    pagination:{
        el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable: true //사용자의 페이지 번호 요소 제어 가능여부
    },
    navigation:{
        prevEl:'.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next'
    }
});

new Swiper('.awards .swiper',{
    autoplay: true,
    loop : true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation:{
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; //다른 값으로 할당할 수 있도록 let 사용
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion //isHidePromotion이 false라면 true로, true라면 false로 지속적으로 반대값으로 바꿔주는 역할
    if(isHidePromotion){
        promotionEl.classList.add('hide');
    } else{
        promotionEl.classList.remove('hide');
    }
});

//범위 랜덤 함수(소수점 2자리까지)
function random(min, max){
    //.toFixed()를 통해 변환된 문자 데이터를,
    //parseFloat()을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) +min).toFixed(2))
}
//gsap.to(요소, 시간, 옵션);, size는 범위 픽셀
function floatingObject(selector, delay, size){
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1, //무한 반복(자바에서 지원하는 기능)
        yoyo: true, //한번 재생된 애니메이션을 다시 뒤로 재생하도록 함
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    //set 무언가 지정할건데 html클래스 속성. 토글이라는 다어가 있으니 어떤 클래스 넣었다 뺐다 하는거
    //add.To는 컨트롤러라는 개념의 내용 추가하기위해 이 메소드 사용
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
            triggerHook: .8 //뷰포트가 시작하는 0부터 1 사이 중 0.8 부분에 훅이 걸려서 내용이 트리거 된다   
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller()); //scrollMagic에서 기본적으로 우리가 추가한 옵션들을 내부 컨트롤러 내용 할당해서 실제로 동작할 수 있는 구조 만들어주는 용도로 사용
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 