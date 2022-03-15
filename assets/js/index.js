

const WindowState  = {
    y: 0,
    screenWidth : 0,
    setY: (y) => {
        WindowState.y = y + (window.screen.height / 2)
    },
    setScreenWidth: (width) => {
        WindowState.screenWidth = width
    }
}
// window width
// div / img width
// height
// % start && % end
// column gap
// top start
const BannerState = {
    loaded: false,
    sectionHeight : 0,
    sectionTopY: 0 , 
    sectionBottomY : 0,
    startTitle: 0,
    setHeight : (height) => {
        BannerState.sectionHeight = height
    },
    setLoaded: (arg)=>{
        BannerState.loaded = arg
    },
    setCords: (arg1)=>{
        BannerState.sectionTopY = arg1
        BannerState.sectionBottomY = arg1 + BannerState.sectionHeight
    },
    setStartTitle: (arg)=>{
        BannerState.startTitle = arg
    },
    startScript: (arg1,arg2,arg3,arg4) =>{
        BannerState.setStartTitle(arg1)
        BannerState.setHeight(arg2)
        BannerState.setCords(arg3)
        BannerState.setLoaded(arg4)
    },

    check: async (y) =>{
        if(y){
            if(y >= BannerState.sectionTopY){
                title.style.transform = `translate3d(0, -${BannerState.startTitle}px,0)`
                titleRight.style.transform = `translate3d(-100vw,0,0)`
               
                setTimeout(()=>{
                    title.style.transition = `transform 1s ease-out `
                    titleRight.style.transition = `transform 1000ms linear, font-size 1000ms ease-out`
                    titleLeft.style.transition = `font-size 1000ms ease-out`
                    titleRight.style.transform = `translate3d(0,0,0)`
                    setTimeout(()=>{
                        title.style.transform = `translate3d(0px,-${bannerSection.offsetTop + title.offsetTop + bannerContent.scrollHeight +titleRight.offsetParent.scrollHeight  + 75 - (window.screen.height/1.5 )}px,0)`
                        titleRight.style.fontSize = `66px`
                        titleLeft.style.fontSize = `66px`
                        setTimeout(()=>{
                            title.style.transform = `translate3d(0,0px,0)`
                            titleRight.style.transition = `transform 50ms linear, font-size 1000ms ease-out`
                            titleRight.style.fontSize = `47px`
                            titleLeft.style.fontSize = `47px`
                            BannerState.setLoaded(true)
                            TitleObj.startScript(container.scrollHeight + 354, container.offsetWidth, container.offsetParent.offsetTop)
                            TitleObj.setProgress()
                            TitleObj.check()
                            setTimeout(()=>{
                                document.querySelector(".phone__sticky-title-line").style.transition = `opacity 0.3s linear`
                                document.querySelector(".phone__sticky-title-line").style.opacity = 0
                            },200)
                            
                        },2000)
                    },2000)
                    
                },300)

            }
        }
    }
}
const TitleObj = {
    startPoint: 0,
    height: 0,
    width: 0,
    progress: 0,
    left: 0,
    right: 0,
    setHeight : (height) => {
        TitleObj.height = height 
    },
    setStartPoint: (start) =>{
        TitleObj.startPoint = start
    },
    setWidth: (width) => {
        TitleObj.width = width
    },
    startScript: (arg1, arg2, arg3)=>{
        // arg1 = arg1 + 354
        TitleObj.setHeight(arg1)
        TitleObj.setWidth(arg2)
        TitleObj.setStartPoint(arg3)
    },
    setW: function (h , pr) {
        let allWidth = TitleObj.width / 2
        let allHeight = h
        let secondHeight = TitleObj.height  * pr / 100
        let angle  = secondHeight  / allWidth
        return allHeight / angle
    },
    setProgress:function () {
        TitleObj.progress = ((WindowState.y - TitleObj.startPoint) * 100) / (TitleObj.height)
    },
    check : function (y = WindowState.y ,start= TitleObj.startPoint, end = TitleObj.startPoint + TitleObj.height)  {
        if (y < start) {
            // titleLeft.style.transform =    `translate3d(,0,0)`
            // titleRight.style.transform =    `translate3d(,0,0)`
        }
        if(y >= start && y <= end){
            if(TitleObj.progress >= (100 * (TitleObj.height - 354 ) / TitleObj.height )){
                titleLeft.style.transform =    `translate3d(-${TitleObj.setW(TitleObj.height * (100 - TitleObj.progress) / 100 , 100 - (100 * (TitleObj.height - 354 ) / TitleObj.height ))}px,0,0)`
                titleRight.style.transform =    `translate3d(${TitleObj.setW(TitleObj.height * (100 - TitleObj.progress) / 100 , 100 - (100 * (TitleObj.height - 354 ) / TitleObj.height ))}px,0,0)`
            }else if (TitleObj.progress > 20 && TitleObj.progress < (100 * (TitleObj.height - 354 ) / TitleObj.height )){
                titleLeft.style.transform =    `translate3d(-${TitleObj.width/2}px,0,0)`
                titleRight.style.transform =    `translate3d(${TitleObj.width/2}px,0,0)`
            }else if (TitleObj.progress <= 20){
                titleLeft.style.transform =    `translate3d(-${ TitleObj.setW(TitleObj.height * (TitleObj.progress) / 100  , 20)}px,0,0)`
                titleRight.style.transform =    `translate3d(${TitleObj.setW(TitleObj.height * (TitleObj.progress) / 100 , 20)}px,0,0)`
            }
        }
        if (y > end) {
            titleLeft.style.transform =    `translate3d(0,0,0)`
            titleRight.style.transform =    `translate3d(0,0,0)`
        }
    }
}
const bannerSection = document.querySelector('.banner')
const bannerContent = document.querySelector('.banner__content')
let container = document.querySelector('[phone-container]')
let title = document.querySelector('[phone-title]')
let phone = document.querySelector('[phone]')
let titleLeft = document.querySelector('[title-left]')
let titleRight = document.querySelector('[title-right]')
window.onload = () => {
    // 1: height, 2: cord Y1 3: loaded(true/false)
    BannerState.startScript(bannerSection.offsetTop + title.offsetTop + bannerContent.scrollHeight +titleRight.offsetParent.scrollHeight  + 75 - (window.screen.height / 2 ) ,bannerSection.offsetHeight,bannerSection.offsetTop, false )
    if (title &&  phone &&  container && titleLeft && titleRight) {
        WindowState.setY(window.pageYOffset)
        BannerState.check(WindowState.y)
        // TitleObj.startScript(container.scrollHeight + 354, container.offsetWidth, container.offsetParent.offsetTop)
        // TitleObj.setProgress()
        // TitleObj.check()

    }
   

   
    
}
window.onscroll = () => { 
    if (title &&  phone &&  container && titleLeft && titleRight) {
        WindowState.setY(window.pageYOffset)
        if(BannerState.loaded){
            // TitleObj.startScript(container.scrollHeight + 354, container.offsetWidth, container.offsetParent.offsetTop)
            TitleObj.setProgress()
            TitleObj.check()
        }
    }
    // BannerState.check(WindowState.y)
    
}
window.onresize = () =>{
    WindowState.setScreenWidth(document.body.clientWidth)
    if (WindowState.screenWidth == 767 || WindowState.screenWidth == 990) {
        window.location.reload()
    }
    if (title &&  phone &&  container && titleLeft && titleRight) {
        WindowState.setY(window.pageYOffset)
        TitleObj.startScript(container.scrollHeight + 354, container.offsetWidth, container.offsetParent.offsetTop)
        if(BannerState.loaded){
            BannerState.startScript(bannerSection.offsetTop + title.offsetTop + bannerContent.scrollHeight - (window.screen.height / 2)  , bannerSection.offsetHeight,bannerSection.offsetTop, true )
            // console.log(container.scrollHeight + 354, container.offsetWidth)
            
            
            TitleObj.setProgress()
            TitleObj.check()
        }
    }
    
}

// ------------------------------------------------------------------------------------------------

