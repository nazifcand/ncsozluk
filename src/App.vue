<template>
  <Header />
  <!-- #main start -->
  <div id="main">
    <div class="container">
      <Entries />

      <!-- #main-middle start -->
      <div id="main-middle">
        <router-view />
      </div>
      <!-- #main-middle end -->

      <!-- #main-right start -->
      <div id="main-right" v-if="!$store.state.isLoggedIn">
        <div class="register-box">
          <h3>Neyi bekliyorsun?</h3>
          <p>
            ncsözlük, bilgiyi zaman ve mekan ayırt etmeden, bilenden bilmek
            isteyene taşıyan bir zaman makinasıdır.
          </p>
          <router-link to="/register">Üye ol</router-link>
        </div>
      </div>
      <!-- #main-right end -->
    </div>
  </div>
  <!-- #main end -->

  <Footer />
</template>

<style lang="scss">
@import url("./assets/css/reset.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css");
*:focus {
  outline: none;
}

html,
body {
  width: 100%;
  min-height: 100%;
  font-family: "Fira Code";
  font-size: 12px;
  line-height: 1.4;
  color: #091921;
  background-color: #f5f5f5;
  padding-bottom: 100px;
}

.container {
  width: 1140px;
  height: 100%;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
}

#main {
  display: flex;

  #main-left {
    width: 250px;
    min-width: 250px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(#eee, 0.1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
  }

  #main-right {
    width: 300px;
    min-width: 300px;
  }

  #main-middle {
    flex: 1;
    margin: 0 10px;
  }
}

.register-box {
  width: 300px;
  height: 300px;
  border-radius: 3px;
  padding: 25px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-weight: bold;
    font-size: 24px;
  }

  p {
    color: #777;
    margin: 20px 0px;
  }

  a {
    color: #091921;
    border: 1px solid #091921;
    text-decoration: none;
    padding: 10px 25px;
    border-radius: 3px;
    font-weight: bold;
    box-sizing: border-box;
    transition: 300ms all ease;

    &:hover {
      color: #fff;
      background-color: #091921;
    }
  }
}
</style>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Entries from '@/components/Entries.vue';

export default {
  components: { Header, Footer, Entries }
}
</script>