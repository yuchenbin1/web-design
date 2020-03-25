const headerEl=document.querySelector("header");
const scrollTOTop=document.querySelector(".scrollToTop");

window.addEventListener("scroll",()=>{//滚动事件
	let height=headerEl.getBoundingClientRect().height;
	
	if(window.pageYOffset-height>800){//设置顶部导航出现的位置
		if(!headerEl.classList.contains("sticky")){
			headerEl.classList.add("sticky");
		}
	}
		else{
			headerEl.classList.remove("sticky");
	}
	
	if(window.pageYOffset>2000){//设置返回顶部的按钮出现的位置
		scrollTOTop.style.display="block";
	}else{
		scrollTOTop.style.display="none";
	}
})

const glide=new Glide(".glide");  //捕获轮播组件
const captionsEl=document.querySelectorAll(".slide-caption");  //获取标题的容器

glide.on(["mount.after","run.after"],()=>{  //监听函数 mount.after是加载后，run.after是轮播后
	const caption=captionsEl[glide.index];  //获取到能看见的元素的下标
	anime({
		targets:caption.children,  //caption下的直接子元素块依次出现
		opacity:[0,1],  //透明度0到1
		duration:400,  //动画执行时间400毫秒
		easing:"linear",  //动画执行函数，线性的
		delay:anime.stagger(400,{start:300}),  //第一个300毫秒后出现，对caption下的children，第一个出现后等400毫秒出现
		tranlateY:[anime.stagger([40,10]),0]  //h1移动40到0，h3移动中间数到0，按钮移动10到0
	})
})

glide.on("run.before",()=>{  //坚听到run.before轮播前
	document.querySelectorAll(".slide-caption>*").forEach(el=>{  //选取到caption下面的每个元素
		el.style.opacity=0;  //每次切换都把有透明度重置为0
	})
})

glide.mount();  //下载轮播组件

const isotope=new Isotope(".cases",{  //捕获成功案例的容器
	layoutMode:"fitRows",  //根据行模式布局
	itemSelector:".case-item"  //各个子元素图片
})

const filterBtns=document.querySelector(".filter-btns");  //获取筛选按钮父元素

filterBtns.addEventListener("click",e=>{  //监听事件
	let{target}=e;
	const filterOption=target.getAttribute("data-filter");
	if(filterOption){
		document
			.querySelectorAll(".filter-btn.active")
			.forEach(btn=>btn.classList.remove("active"));  //取消所有active
		target.classList.add("active");  //当前点击的按钮增加active
		
		isotope.arrange({filter:filterOption});
	}
})

const staggeringOption={
	delay:300,  //延迟300毫秒
	distance:"50px",  //移动50像素
	duration:500,  //动画执行500毫秒
	easing:"ease-in-out",
	origin:"bottom"  //从下到上
}

ScrollReveal().reveal(".feature",{...staggeringOption,interval:350});//三个点的意思是把staggeringOption中的属性拿出来和后面interval拼成一个新的对象并返回
ScrollReveal().reveal(".service-item",{...staggeringOption,interval:350});

const dataSectionEl=document.querySelector(".data-section");//捕获数据的部分，数字增长动画
ScrollReveal().reveal(".data-section",{
	beforeReveal:()=>{
		anime({
			targets:".data-piece .num",//捕获数字区域
			innerHTML:el=>{
				return [0,el.innerHTML];
			},
			duration:2000,//执行时间
			round:1,//数字按1增长，去掉那么按小数增长
			easing:"easeInExpo"//越来越快的动画效果
		});
		dataSectionEl.style.backgroundPosition=`center cale(50%-${dataSectionEl.getBoundingClientRect().bottom/5}px)`;//在出现之前更新背景位置，防止在页面中心是重新加载导致被设为默认
	},
});


window.addEventListener("scroll",()=>{//监听滚动事件，用于数据部分背景图的视差效果
	const bottom=dataSectionEl.getBoundingClientRect().bottom;//当前底部距离浏览器距离
	const top=dataSectionEl.getBoundingClientRect().top;//当前顶部距离浏览器距离
	
	if(bottom>=0&&top<=window.innerHeight){//是否在可见区域
		dataSectionEl.style.backgroundPosition=`center cale(50%-${bottom/5}px)`;//水平居中不动，但是垂直方向上随滚动移动
	}
});

const scroll=new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]',{
	header:"header",
	offset:80
})  //对跳转的按钮进行监听

document.addEventListener("scrollStart",()=>{
	if(headerEl.classList.contains("open")){
		headerEl.classList.remove("open");
	}
})

const exploreBtnEl=document.querySelectorAll(".explore-btn");//探索更多跳转到关于我们
exploreBtnEl.forEach(exploreBtnEl=>{
	exploreBtnEl.addEventListener("click",()=>{
		scroll.animateScroll(document.querySelector("#about-us"));
	});	
})

//折叠按钮
const burgerEl=document.querySelector(".burger");
burgerEl.addEventListener("click",()=>{
	headerEl.classList.toggle("open");
})