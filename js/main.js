document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header"),
          headerBack = document.querySelector(".header__back"),
          headerBackTitle = document.querySelector(".header__back-title");
          menu = document.querySelector(".header__menu"),
          logo = document.querySelector(".header__logo"),
          menuItem1 = document.querySelector(".menu-item1"),
          menuItem2 = document.querySelector(".menu-item2"),
          mainPage = document.querySelector(".main__categories-list"),
          mainMenu = document.querySelector(".main__menu"),
          menuTitleItem = document.querySelectorAll(".menu__title-item"),
          categoryItem = document.querySelectorAll(".category__list-item"),
          categoryPages = document.querySelectorAll(".categories__page"),
          productsPages = document.querySelectorAll(".product__page"),
          categoriesRowItems = document.querySelectorAll(".categories__row-item"),
          productsItem = document.querySelectorAll(".product__item"),
          modalWindow = document.querySelector(".modal__window"),
          modalOpacity = document.querySelector(".modal__opacity"),
          modalWindowImg = document.querySelector(".modal__window-img"),
          modalWindowTitle = document.querySelector(".modal__window-title"),
          modalWindowNewprice = document.querySelector(".window__newprice-price"),
          modalWindowdDuration = document.querySelector(".window__newprice-duration"),
          modalWindowOldprice = document.querySelector(".window__price-oldprice"),
          modalWindowDesc = document.querySelector(".modal__window-desc");
    let activePage, imgBlock, modalImgSrc, modalTitle, modalNewPrice, modalDuration, modalOldPrice, modalDesc, step, stepPage, stepTitle;
    function showContent(elem) {
        elem.classList.remove("hide");
        elem.classList.add("active");
    }
    function hideContent(elem) {
        elem.classList.remove("active");
        elem.classList.add("hide");
    }
    menu.addEventListener("click", function () {
        if (!menuItem1.classList.contains("active")) {
            menuItem1.classList.add("active");
            menuItem2.classList.add("active");
            header.classList.add("active");
            logo.classList.add("active");
            showContent(mainMenu);
            hideContent(mainPage);
            hideContent(headerBack);
            for (let n = 0; n < categoryPages.length; n++) {
                if (categoryPages[n].classList.contains("active")) {
                    hideContent(categoryPages[n]);
                    activePage = categoryPages[n];
                } 
            }
            for (let m = 0; m < productsPages.length; m++) {
                if (productsPages[m].classList.contains("active")) {
                    hideContent(productsPages[m]);
                    activePage = productsPages[m];
                }
            }
        } else {
            menuItem1.classList.remove("active");
            menuItem2.classList.remove("active");
            header.classList.remove("active");
            logo.classList.remove("active");
            hideContent(mainMenu);
            if (activePage) {
                showContent(activePage);
                showContent(headerBack);
            } else {
                showContent(mainPage);
            }
        }
    });
    headerBack.addEventListener("click", function () {
        if (step == 1) {
            hideContent(headerBack);
            showContent(mainPage);
            for (let x = 0; x < categoryPages.length; x++){
                hideContent(categoryPages[x]);
            }
        } else if (step == 2) {
            for (let x = 0; x < productsPages.length; x++){
                hideContent(productsPages[x]);
            }
            headerBackTitle.innerHTML = stepTitle;
            showContent(stepPage);
            step -= 1;
        }
    });
    for (let i = 0; i < menuTitleItem.length; i++) {
        menuTitleItem[i].addEventListener("click", function () {
            hideContent(mainMenu);
            showContent(categoryPages[i]);
            header.classList.remove("active");
            logo.classList.remove("active");
            menuItem1.classList.remove("active");
            menuItem2.classList.remove("active");
            headerBackTitle.innerHTML = menuTitleItem[i].textContent;
            showContent(headerBack);
            step = 1;
            stepPage = categoryPages[i];
            stepTitle = menuTitleItem[i].textContent;
        });
    }
    for (let j = 0; j < categoryItem.length; j++) {
        categoryItem[j].addEventListener("click", function () {
            hideContent(mainPage);
            showContent(categoryPages[j]);
            headerBackTitle.innerHTML = categoryItem[j].children[1].textContent;
            showContent(headerBack);
            step = 1;
            stepPage = categoryPages[j];
            stepTitle = categoryItem[j].children[1].textContent;
        });
    }
    for (let b = 0; b < categoriesRowItems.length; b++) {
        categoriesRowItems[b].addEventListener("click", function () {
            for (let c = 0; c < categoryPages.length; c++) {
                hideContent(categoryPages[c]);
            }
            showContent(productsPages[b]);
            headerBackTitle.innerHTML = categoriesRowItems[b].children[1].textContent;
            step = 2;
        });
    }
    for (let k = 0; k < productsItem.length; k++) {
        productsItem[k].addEventListener("click", function () {
            modalWindow.style.top = (window.pageYOffset - 20) + "px";
            document.body.style.overflow = "hidden";
            showContent(modalWindow);
            imgBlock = productsItem[k].querySelector(".product__item-img");
            modalImgSrc = imgBlock.children[0].getAttribute("src");
            modalTitle = productsItem[k].querySelector(".product__item-title").textContent;
            modalNewPrice = productsItem[k].querySelector(".newprice__price").textContent;
            if (productsItem[k].children[1].children[0].children[0].children[1]) {
                modalDuration = productsItem[k].children[1].children[0].children[0].children[1].textContent;
                modalOldPrice = productsItem[k].children[1].children[0].children[1].textContent;
            } else {
                modalDuration = "";
                modalOldPrice = "";
            }
            modalDesc = productsItem[k].querySelector(".product__item-descr").textContent;
            modalWindowImg.innerHTML = `<img src=\"${modalImgSrc}\" alt=\"modal-img\">`;
            modalWindowTitle.innerHTML = modalTitle;
            modalWindowNewprice.innerHTML = modalNewPrice;
            if (modalDuration) {
                modalWindowdDuration.innerHTML = modalDuration;
                modalWindowOldprice.innerHTML = modalOldPrice;
            } else {
                modalWindowdDuration.innerHTML = "";
                modalWindowOldprice.innerHTML = "";
            }
            modalWindowDesc.innerHTML = modalDesc;
            showContent(modalOpacity);
        });
    }
    modalOpacity.addEventListener("click", function () {
        document.body.style.overflow = "";
        hideContent(modalWindow);
        hideContent(modalOpacity);
    });
});