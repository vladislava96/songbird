class BurgerMenu {
    constructor (menuBurger, menuListBurger, openMenuButton) {
        this.menuBurger = menuBurger
        this.menuListBurger = menuListBurger
        this.openMenuButton = openMenuButton

       
        openMenuButton.addEventListener('click', (event) => {
            event.stopPropagation()
            this.openMenu()
        
        })
        document.addEventListener('click', (event) => {
            if (event.target === this.menuBurger || event.target === this.openMenuButton || event.target === this.menuListBurger) {
                return
            }
            this.closeMenu()
        })
    }
    openMenu() {
        console.log(this.menuBurger)
        this.menuBurger.style.transform = 'translateX(0px)'
    }
    closeMenu() {
        console.log('3')
        this.menuBurger.style.transform = 'translateX(640px)'
    }
}

export default BurgerMenu