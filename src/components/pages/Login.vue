<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <div class="group">
      <span>Mail</span>
      <input
        type="text"
        placeholder="örn: admin@admin.com"
        autocomplete="off"
        spellcheck="false"
        required
        v-model="mail"
      />
    </div>
    <div class="group">
      <span>Password</span>
      <input
        type="password"
        placeholder="örn: 123456789"
        autocomplete="off"
        spellcheck="false"
        required
        v-model="pass"
      />
    </div>
    <div class="group">
      <button type="submit">Login</button>
      <p v-if="notFoundUser">Böyle bir kullanıcı bulunamadı!</p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 500;
}

form {
  width: 100%;

  .group {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  input {
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0 10px;
    font-family: "Fira Code";
    box-sizing: border-box;
    font-size: 12px;
  }

  button[type="submit"] {
    margin-right: auto;
    padding: 10px 15px;
    border-radius: 3px;
    font-family: "Fira Code";
    border: none;
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    background-color: #ff9469;
    cursor: pointer;
    transition: 300ms all ease;

    &:hover {
      background-color: darken(#ff9469, 4);
    }
  }
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mail: '',
      pass: '',
      notFoundUser: false
    }
  },
  methods: {
    login() {
      axios.get(`/users?mail=${this.mail}&pass=${this.pass}`)
        .then(result => {
          result = result.data[0];
          if (result) {
            localStorage.setItem('fakeToken', result.fakeToken);
            this.$store.dispatch('logIn');
            this.$router.go(-1);
          } else {
            this.notFoundUser = true;
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>