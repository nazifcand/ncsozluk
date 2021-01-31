<template>
  <header>
    <div class="container">
      <router-link id="logo" :to="{ name: 'Index' }"> ncsözlük </router-link>

      <form action="/search" method="get">
        <input
          type="text"
          name="s"
          placeholder="bir şeyler arayınn.."
          autocomplete="off"
        />
      </form>

      <div id="notLoggedIn">
        <router-link tag="a" to="/register" v-if="!$store.state.isLoggedIn"
          >Register</router-link
        >
        <router-link tag="a" to="/login" v-if="!$store.state.isLoggedIn"
          >Login</router-link
        >
      </div>

      <div
        id="loggedIn"
        v-if="$store.state.isLoggedIn && $store.state.loginUser"
      >
        <img :src="profileImage($store.state.loginUser.username)" alt="" />
        <section>
          <span>{{ $store.state.loginUser.username }}</span>
        </section>
        <div @click="logOut"><i class="fas fa-sign-out-alt"></i></div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  background-color: #ff9469;
  margin-bottom: 25px;
  box-shadow: 0 0 10px rgba(#ddd, 1);

  .container {
    display: flex;
    align-items: center;
  }

  #logo {
    font-weight: bold;
    font-size: 22px;
    text-decoration: none;
    color: #fff;
    margin-right: 50px;
  }

  form {
    input {
      width: 300px;
      border: none;
      padding: 0 10px;
      border-radius: 3px;
      background-color: #fff;
      font-family: "Fira Code";
      height: 30px;
      font-size: 10px;
    }
  }

  #notLoggedIn {
    margin-left: auto;

    a {
      margin: 0 5px;
      padding: 10px 15px;
      border: 1px solid rgba(#fff, 0.5);
      border-radius: 3px;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: 300ms all ease;

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  #loggedIn {
    display: flex;
    align-items: center;
    font-size: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    section {
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      font-weight: 500;
    }

    div {
      cursor: pointer;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>

<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem('fakeToken');
      this.$store.dispatch('logOut');
      this.$router.go();
    },

    profileImage(username) {
      return 'https://ui-avatars.com/api/?background=random&name=' + username;
    }
  }
}
</script>