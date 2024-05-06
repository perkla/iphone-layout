const modalManager = () => {
    const modal = document.querySelector('.modal')
    const modalClose = document.querySelector('.modal__close')
    const buttonBuy = document.querySelectorAll('.button_buy')

    buttonBuy.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex'
            document.body.style.overflow = 'hidden'
        })
    })
    modalClose.addEventListener('click', (event) => {
        if (event.target == modal || event.target == modalClose) {
            modal.style.display = 'none'
            document.body.style.overflow = ''
        }
    })
}

const tabs = () => {
    const cardDetailChange = document.querySelectorAll('.card-detail__change')
    const cardDetailTitle = document.querySelectorAll('.card-detail__title')
    const cardImage = document.querySelector('.card__image')

    const hideAll = () => {
        cardDetailChange.forEach(item => item.classList.remove('active'))
        cardDetailTitle.forEach(item => item.classList.remove('active'))
        cardImage.forEach(item => item.classList.remove('active'))
    }

    for (let i = 0; i < cardDetailChange.length; i += 1) {
        cardDetailChange[i].addEventListener('click', () => {
            hideAll()
            cardDetailChange[i].classList.add('active')
            cardDetailTitle[i].classList.add('active')
            cardImage[i].classList.add('active')
        })
    }
}

const accordion = () => {
    const characteristicsTitle = document.querySelectorAll('.characteristics__title')
    const characteristicsDescription = document.querySelectorAll('.characteristics__description')

    const hideAll = () => {
        characteristicsTitle.forEach(item => item.classList.remove('active'))    // описание каждого элемента делаем неактивным
        characteristicsDescription.forEach(item => item.style.height = '')    // каждому элементу возвращаем исходную высоту
    }

    const open = (index) => {
        hideAll()  // cкрываем все характеристики
        characteristicsDescription[index].style.height = `${characteristicsDescription[index].scrollHeight}px`   // выставляем нужную высоту описанию нужного элемента
        characteristicsTitle[index].classList.add('active')    // делаем характеристику активной
    }

    for (let i = 0; i < characteristicsTitle.length; i++) {
        characteristicsTitle[i].addEventListener("click", () => {
            // if (characteristicsTitle[i].classList.contains('active')) { //     если i элемент уже активен:
            //     hideAll()                                               //               закрыть все
            // } else {                                                    //       иначе:
            //     open(i)                                                 //               открыть(i) 
            // }

            characteristicsTitle[i].classList.contains('active') ? hideAll() : open(i)   // то же, что и закомментированный код, но удобнее
        })
    }

    console.dir(characteristicsDescription[0])
    console.dir(characteristicsDescription[6])

}

const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу url`);
    } else {
        return await response.json()
    }
}

const renderCrossSell = () => {
    const crossSellList = document.querySelector('.cross-sell__list')
    const createCardGood = (good) => {
        const cardGood = document.createElement('li')
        cardGood.innerHTML = `
            <article class="cross-sell__item">
                <img class="cross-sell__image" src=${good.photo} alt="">
                <h3 class="cross-sell__title">${good.name}</h3>
                <p class="cross-sell__price">${good.price}</p>
                <div class="button button_buy cross-sell__button">Купить</div>
            </article>
        `
        crossSellList.append(cardGood)
    }

    getData('../cross-sell-dbase/dbase.json')
    .then((goods) => {
        goods.forEach((good) => {
            console.log(good)
            createCardGood(good)
        })
    })
}

modalManager()
tabs()
accordion()
renderCrossSell()