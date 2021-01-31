<template>
  <div id="add-new">
    <form method="POST" @submit.prevent="addEntry">
      <textarea
        placeholder="entry..."
        v-model="entry"
        required
        spellcheck="false"
      ></textarea>
      <button type="submit">Add Entry</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#add-new {
  margin-top: 25px;

  form {
    display: flex;
    flex-direction: column;

    textarea {
      padding: 20px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      min-height: 100px;
      resize: none;
      border-radius: 3px;
      margin-bottom: 10px;
    }

    button[type="submit"] {
      margin-right: auto;
      padding: 10px 15px;
      border-radius: 3px;
      font-family: "Fira Code";
      border: none;
      color: #fff;
      font-weight: 500;
      background-color: #ff9469;
      cursor: pointer;
      transition: 300ms all ease;

      &:hover {
        background-color: darken(#ff9469, 4);
      }
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      entry: ''
    }
  },
  methods: {
    addEntry() {
      const newEntry = {
        date: Date.now(),
        author: this.$store.state.loginUser.id,
        entry: this.entry,
        parentEntry: this.$store.state.singleEntry.id,
        like: 0,
        dislike: 0
      };
      this.$store.dispatch('addEntry', newEntry);
      this.entry = '';
    }
  }
}
</script>