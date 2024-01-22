<template>

    <header :class="{ 'scrolled-nav': scrolledNav }" v-if="!isComponenteAAtivo">

        <nav>
            <div class="branding">
                <img  class="logo"  src="../../assets/img/logo.png">
            </div>    

            <ul  v-show="!mobile" class="navigation">
                <li><router-link  class="link" to="/">Inicio</router-link></li>
                <li><router-link  class="link" to="/dashboard">Minhas anotações</router-link></li>
            </ul>

            <div class="icon">
                <span  v-show="mobile" @click="toggleMobileNav" >
                    <i class="fa-solid fa-bars" :class="{ 'icon-active': mobileNav}"></i>
                </span> 
            </div>

            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <div class="responsive_branding">
                        <img  class="responsive_logo"  src="../../assets/img/logo.png">
                    </div>
                    <li><router-link class="link" to="/">Inicio</router-link></li>
                    <li><router-link class="link" to="/dashboard">Minhas anotações</router-link></li>
                </ul>    
            </transition>   
        </nav>
    </header>

</template>

<script>
import { defineComponent } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'

export default defineComponent({
    name: 'Menu',

    data(){
        return{
            scrolledNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
        }
    },

    created(){
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },

    mounted(){
        window.addEventListener("scroll", this.updateScroll);
    }, 

    methods:{

        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;
        },

        updateScroll(){
            const scrollPosition = window.scrollY;
            if(scrollPosition > 50){
                this.scrolledNav = true;
                return;
            }
            this.scrolledNav = false;
        },

        checkScreen() { 
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 750){
            this.mobile = true;
            return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
    }
})

</script>

<style src="./style.scss"  lang="scss" />